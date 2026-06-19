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
	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_format_styles' );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_editor_assets' );
}

/**
 * Enqueue styles.
 */
function enqueue_styles() {
	wp_enqueue_style( 'overrides', get_stylesheet_directory_uri() . '/assets/css/overrides.css', [], filemtime( get_stylesheet_directory() . '/assets/css/overrides.css' ) );
}

/**
 * Enqueue shared format styles.
 */
function enqueue_format_styles() {
	$style_path = get_stylesheet_directory() . '/dist/blocks/elegant-highlight-format/style-index.css';

	if ( ! file_exists( $style_path ) ) {
		return;
	}

	wp_enqueue_style(
		'souptik-elegant-highlight-format',
		get_stylesheet_directory_uri() . '/dist/blocks/elegant-highlight-format/style-index.css',
		[],
		filemtime( $style_path )
	);
}

/**
 * Enqueue editor-only assets.
 */
function enqueue_editor_assets() {
	$script_path = get_stylesheet_directory() . '/dist/blocks/elegant-highlight-format/index.js';
	$asset_path  = get_stylesheet_directory() . '/dist/blocks/elegant-highlight-format/index.asset.php';

	if ( ! file_exists( $script_path ) || ! file_exists( $asset_path ) ) {
		return;
	}

	$asset = require $asset_path;

	wp_enqueue_script(
		'souptik-elegant-highlight-format',
		get_stylesheet_directory_uri() . '/dist/blocks/elegant-highlight-format/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
