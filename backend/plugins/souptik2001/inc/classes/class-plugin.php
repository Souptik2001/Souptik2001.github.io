<?php
/**
 * Plugin manifest class.
 *
 * @package souptik2001
 */

namespace Souptik2001\Features\Inc;

use \Souptik2001\Features\Inc\Traits\Singleton;
use \Souptik2001\Features\Inc\Settings\Build_Hook;
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
		Build_Hook::get_instance();
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

		add_action( 'transition_post_status', [ $this, 'handle_post_status_change' ], 10, 3 );

		add_action( 'trashed_post', [ $this, 'trigger_build_hook_deleted_post' ] );

		add_filter( 'graphql_connection_query_args', [ $this, 'change_graphql_query_args' ], 10, 2 );

		add_filter( 'graphql_object_visibility', [ $this, 'change_object_visibilities' ], 10, 5 );

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
	public function waldos_platform_activate() {

		flush_rewrite_rules();

	}

	/**
	 * Runs after deactivating the plugin.
	 */
	public function waldos_platform_deactivate() {

		flush_rewrite_rules();

	}

}
