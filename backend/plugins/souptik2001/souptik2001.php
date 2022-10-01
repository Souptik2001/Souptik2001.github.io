<?php
/**
 * Plugin Name:     Souptik2001
 * Description:     Contains the basic features required for the site.
 * Version:         0.1.0
 * Author:          souptik
 * Author URI:      souptik.dev
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     souptik2001
 *
 * @package         souptik2001
 */

define( 'SOUPTIK2001_FEATURES_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'SOUPTIK2001_FEATURES_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

// phpcs:disable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant
require_once SOUPTIK2001_FEATURES_PATH . '/inc/helpers/autoloader.php';
// phpcs:enable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant

/**
 * To load plugin manifest class.
 *
 * @return void
 */
function souptik2001_features_plugin_loader() {

	$plugin_object = \Souptik2001\Features\Inc\Plugin::get_instance();

	register_activation_hook( __FILE__, [ $plugin_object, 'souptik2001_activate' ] );

	register_deactivation_hook( __FILE__, [ $plugin_object, 'souptik2001_deactivate' ] );

}

souptik2001_features_plugin_loader();
