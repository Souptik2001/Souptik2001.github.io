<?php
/**
 * Assets functions.
 *
 * @package souptik
 */

namespace Souptik\Theme\Assets;

/**
 * Setup.
 *
 * @return void
 */
function setup(): void {
	// Fire hooks to bootstrap theme assets.
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_styles' );
}

/**
 * Enqueue styles.
 */
function enqueue_styles() {
	wp_enqueue_style( 'overrides', get_stylesheet_uri() . '/assets/css/overrides.css', [], filemtime( get_stylesheet_directory() . '/assets/css/overrides.css' ) );
}
