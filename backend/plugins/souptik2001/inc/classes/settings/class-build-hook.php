<?php
/**
 * Register Build Hook setting.
 *
 * @package souptik2001
 */

namespace Souptik2001\Features\Inc\Settings;

/**
 * Class Build_Hook
 */
class Build_Hook extends Base {

	/**
	 * Settings page slug.
	 *
	 * @var string
	 */
	const SETTINGS_SLUG = 'souptik2001';

	/**
	 * Custom option and settings
	 */
	public function settings_init() {

		if( empty(static::SETTINGS_SLUG) ) {

			return;

		}

		register_setting(
			static::SETTINGS_SLUG,
			'revalidate_link'
		);

		add_settings_section(
			'revalidate_frontend_section',
			__( 'Revalidate Frontend', 'souptik2001' ),
			[ $this, 'revalidate_section_callback' ],
			static::SETTINGS_SLUG
		);

		add_settings_field(
			'revalidate_frontend_url',
			__( 'Revalidate URL', 'souptik2001' ),
			[ $this, 'revalidate_url_field_callback' ],
			static::SETTINGS_SLUG,
			'revalidate_frontend_section',
			array(
				'label_for' => 'revalidate_frontend_url'
			)
		);

	}

	/**
	 *  Revalidate section callback function.
	 *
	 * @param array $args  The settings array, defining title, id, callback.
	 */
	public function revalidate_section_callback( $args )
	{
		?>

			<p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e( 'Configure frontend revalidation settings.', 'souptik2001' ); ?></p>

		<?php
	}

	/**
	 * Revalidate URL field callback function.
	 *
	 * @param array $args
	 */
	function revalidate_url_field_callback( $args ) {
		// Get the value of the setting we've registered with register_setting()
		$revalidate_link = get_option( 'revalidate_link' );
		?>
		<input type="text"
				id="<?php echo esc_attr( $args['label_for'] ); ?>"
				name="revalidate_link" value="<?php echo esc_attr( $revalidate_link ); ?>">
		</input>
		<?php
	}

	/**
	 * Top level menu callback function
	 */
	public function options_page_html() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if( isset( $_REQUEST['_wpnonce'] ) && wp_verify_nonce( $_REQUEST['_wpnonce'], 'revalidate_frontend_nonce' ) ) {

			if ( isset( $_GET['publish'] ) && 1 == $_GET['publish'] ) {

				$revalidate_link = get_option( 'revalidate_link' );

				$response = wp_remote_get(
					$revalidate_link
				);

				if( is_array( $response ) && ! is_wp_error( $response ) ) {

					if( json_decode( $response['body'], true )['revalidated'] !== true ) {

						add_settings_error( 'souptik2001_frontend_publish', 'souptik2001_messages', __( 'Frontend rebuild failed.', 'souptik2001' ), 'error' );

					} else {

						add_settings_error( 'souptik2001_frontend_publish', 'souptik2001_messages', __( 'Frontend rebuild complete.', 'souptik2001' ), 'updated' );

					}

				} else {

					add_settings_error(
						'souptik2001_frontend_publish',
						'souptik2001_messages',
						sprintf(
							'%1$s <br/> %2$s',
							__( 'Error. Error written below. ', 'souptik2001' ),
							wp_json_encode( $response )
						),
						'error'
					);

				}

			}

		}

		if ( isset( $_GET['settings-updated'] ) ) {
			add_settings_error( 'souptik2001_settings_update', 'souptik2001_messages', __( 'Settings Saved', 'souptik2001' ), 'updated' );
		}

		settings_errors( 'souptik2001_frontend_publish' );
		settings_errors( 'souptik2001_settings_update' );
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form action="options.php" method="post">
				<?php
				settings_fields( static::SETTINGS_SLUG );
				do_settings_sections( static::SETTINGS_SLUG );
				submit_button( 'Save Settings' );
				?>
				<a href="<?php echo $this->get_revalidate_wp_url(); ?>" class="button button-primary"><?php _e( 'Revalidate Now', 'souptik2001' ); ?></a>
			</form>
		</div>
		<?php

	}

	public function get_revalidate_wp_url() {

		return wp_nonce_url( admin_url( 'admin.php?page=souptik2001&publish=1' ), 'revalidate_frontend_nonce' );

	}

}