<?php
/**
 * Plugin manifest class.
 *
 * @package souptik2001
 */

namespace Souptik2001\Features\Inc;

use \Souptik2001\Features\Inc\Traits\Singleton;
use \Souptik2001\Features\Inc\Settings\Souptik2001_Settings;
use \Souptik2001\Features\Inc\Graphql_Fields\Extra_User_Fields;
/**
 * Class Plugin
 */
class Plugin {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		$this->hooks();
		Souptik2001_Settings::get_instance();
		Extra_User_Fields::get_instance();
		$this->register_build_frontend_admin_bar_button();

	}

	/**
	 * Creates build hook button in admin bar.
	 */
	public function register_build_frontend_admin_bar_button() {

		add_action(
			'admin_bar_menu',
			function ( $wp_admin_bar ) {
				$args = array(
					'id'    => 'build-frontend',
					'title' => __( 'Build Frontend', 'souptik2001' ),
					'href'  => wp_nonce_url( admin_url( 'admin.php?page=souptik2001&publish=1' ), 'revalidate_frontend_nonce' ),
				);
				$wp_admin_bar->add_node( $args );
			},
			1000
		);

	}

	/**
	 * Adds hooks.
	 *
	 * @return void
	 */
	public function hooks() {

		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );

		add_action( 'transition_post_status', [ $this, 'handle_post_status_change' ], 10, 3 );

		add_action( 'trashed_post', [ $this, 'trigger_build_hook_deleted_post' ] );

		add_filter( 'graphql_connection_query_args', [ $this, 'change_graphql_query_args' ], 10, 2 );

		add_filter( 'graphql_object_visibility', [ $this, 'change_object_visibilities' ], 10, 5 );

		add_action( 'profile_update', [ $this, 'trigger_build_hook_for_user' ], 10, 3 );

		add_filter( 'mailpoet_get_permalink', [ $this, 'change_mailpoet_posts_link' ], 10, 3 );

		add_filter( 'template_redirect', [ $this, 'redirect_if_non_logged_in' ] );

		add_filter( 'allowed_redirect_hosts', [ $this, 'allowed_redirect_hosts' ] );

	}

	/**
	 * Redirects to frontend site if user not logged in.
	 */
	public function redirect_if_non_logged_in() {
		global $wp;

		if ( is_user_logged_in() ) {
			return;
		}

		$login_url = get_option( 'whl_page', 'wp-admin' );

		$allowed_urls = [
			$login_url,
		];

		if ( 'wp-admin' === $login_url ) {

			$allowed_urls[] = 'wp-login.php';

		}

		if ( in_array( $wp->request, $allowed_urls, true ) ) {
			return;
		}

		$frontend_url = get_option( 'frontend_url', 'https://souptik.dev' );

		if ( \wp_safe_redirect( $frontend_url, 302, __( 'Backend defender', 'souptik2001' ) ) ) {
			exit();
		}
	}

	/**
	 * Whitelists allowed redirect URLS.
	 *
	 * @param array $hosts Default allowed hosts.
	 *
	 * @return array
	 */
	public function allowed_redirect_hosts( $hosts ) {

		$protocol_remover = '/(.*):\/\//i';

		$frontend_url = get_option( 'frontend_url', 'https://souptik.dev' );

		$frontend_url = preg_replace( $protocol_remover, '', $frontend_url );

		$whitelisted_hosts = [
			$frontend_url,
		];

		return array_merge( $hosts, $whitelisted_hosts );

	}

	/**
	 * Enqueues all block editor assets.
	 *
	 * @global $post.
	 */
	public function enqueue_block_editor_assets() {

		global $post;

		$index_assets = SOUPTIK2001_FEATURES_PATH . '/assets/build/index.asset.php';

		if ( file_exists( $index_assets ) ) {

			$assets = require_once $index_assets;

			wp_enqueue_script(
				'souptik2001-block-editor-assets',
				SOUPTIK2001_FEATURES_URL . '/assets/build/index.js',
				$assets['dependencies'],
				$assets['version'],
				true
			);

			wp_localize_script(
				'souptik2001-block-editor-assets',
				'post_data',
				(array) $post,
			);

			wp_localize_script(
				'souptik2001-block-editor-assets',
				'site_revalidation_data',
				[
					'revalidate_url'      => get_option( 'revalidate_link', 'https://souptik.dev' ),
					'revalidation_secret' => get_option( 'revalidate_secret', '' ),
				]
			);

		}

	}

	/**
	 * Changes posts link to frontend link for mailpoet.
	 *
	 * @param string      $permalink Permalink of the post.
	 * @param int|WP_Post $post Post.
	 * @param bool        $leavename Not include name.
	 */
	public function change_mailpoet_posts_link( $permalink, $post, $leavename ) {

		if ( ! is_object( $post ) ) {

			$post = get_post( $post );

		}

		$frontend_home_url = get_option( 'souptik2001_frontend_home_url', 'https://souptik.dev' );

		if ( 'post' === $post->post_type ) {

			$post_slug = $post->post_name;

			$frontend_blog_path = get_option( 'souptik2001_frontend_blog_path', 'blog' );

			return sprintf(
				'%s/%s/%s',
				$frontend_home_url,
				$frontend_blog_path,
				$post_slug
			);

		}

		return $permalink;

	}

	/**
	 * Triggers build hook for single user page.
	 *
	 * @param int     $user_id User ID.
	 * @param WP_User $old_user_data Old user data.
	 * @param array   $userdata The raw array of data.
	 */
	public function trigger_build_hook_for_user( $user_id, $old_user_data, $userdata ) {

		$user_slug = get_user_by( 'ID', $user_id )->user_nicename;

		$revalidate_link = get_option( 'revalidate_link', '' );

		wp_remote_get(
			$revalidate_link . '&endpoint=/user/' . $user_slug
		);

	}

	/**
	 * Changes graphql return objects visibilities.
	 *
	 * @param string  $visibility Default visibility.
	 * @param string  $model_name Name of the model currently the filter is being executed.
	 * @param mixed   $data The un-modeled incoming data.
	 * @param int     $owner User ID of the owner of this data.
	 * @param WP_User $current_user Current user for the session.
	 */
	public function change_object_visibilities( $visibility, $model_name, $data, $owner, $current_user ) {

		if ( 'UserObject' === $model_name ) {
			$visibility = 'public';
		}

		return $visibility;

	}

	/**
	 * Changes GraphQL query args.
	 *
	 * @param array $query_args Query args.
	 * @param mixed $connection_resolver Connection Resolver.
	 */
	public function change_graphql_query_args( $query_args, $connection_resolver ) {

		if ( $connection_resolver instanceof \WPGraphQL\Data\Connection\UserConnectionResolver ) {
			unset( $query_args['has_published_posts'] );
		}

		return $query_args;

	}

	/**
	 * Triggers build hook.
	 *
	 * @param int $post_id Post ID.
	 */
	public function trigger_build_hook_deleted_post( $post_id ) {

		$post = get_post( $post_id );

		if ( ! isset( $post ) ) {
			return;
		}

		$post_type = '/' . $post->post_type;

		$revalidate_link = get_option( 'revalidate_link', '' );

		if ( 'page' === $post->post_type ) {
			$post_type = '';
		} elseif ( 'post' === $post->post_type ) {
			// Send revalidate request to home page.
			wp_remote_get(
				$revalidate_link . '&endpoint=/'
			);
			// Send revalidate request to post author page.
			wp_remote_get(
				$revalidate_link . '&endpoint=/user/' . get_the_author_meta( 'user_nicename', $post->post_author )
			);
			$post_type = '/blog';
		}

		$post_name = $post->post_name;

		$pattern = '/(.*)__trashed/m';

		if ( preg_match_all( $pattern, $post_name, $matches ) && count( $matches ) > 1 && count( $matches[1] ) > 0 ) {

			$post_name = $matches[1][0];

		}

		wp_remote_get(
			$revalidate_link . '&endpoint=' . $post_type . '/' . $post_name
		);

	}

	/**
	 * Fires build hook for that page when changing its status.
	 *
	 * @param string  $new_status New status.
	 * @param string  $old_status Old Status.
	 * @param WP_Post $post Post.
	 */
	public function handle_post_status_change( $new_status, $old_status, $post ) {

		if ( $new_status === $old_status ) {
			// Condition where status is not changing.
			return;
		}

		$post_type = '/' . $post->post_type;

		$revalidate_link = get_option( 'revalidate_link', '' );

		if ( 'page' === $post->post_type ) {
			$post_type = '';
		} elseif ( 'post' === $post->post_type ) {
			// Send revalidate request to home page.
			wp_remote_get(
				$revalidate_link . '&endpoint=/'
			);
			// Send revalidate request to post author page.
			wp_remote_get(
				$revalidate_link . '&endpoint=/user/' . get_the_author_meta( 'user_nicename', $post->post_author )
			);
			$post_type = '/blog';
		}

		wp_remote_get(
			$revalidate_link . '&endpoint=' . $post_type . '/' . $post->post_name
		);

	}

	/**
	 * Runs after activating the plugin.
	 */
	public function souptik2001_activate() {

		flush_rewrite_rules();

	}

	/**
	 * Runs after deactivating the plugin.
	 */
	public function souptik2001_deactivate() {

		flush_rewrite_rules();

	}

}
