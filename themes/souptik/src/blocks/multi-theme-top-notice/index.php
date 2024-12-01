<?php
/**
 * Blocks functions.
 *
 * @package souptik
 */

namespace Souptik\Theme\Blocks\Multi_Theme_Top_Notice;

/**
 * Setup.
 *
 * @return void
 */
function setup(): void {
	// Fire hooks to bootstrap theme blocks.
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

/**
 * Register block.
 *
 * @return void
 */
function register_block(): void {
	// Path to blocks file.
	$blocks_path = __DIR__ . '/../../../dist/blocks';

	register_block_type(
		$blocks_path . '/multi-theme-top-notice/',
		[
			'render_callback' => __NAMESPACE__ . '\\render_callback',
		]
	);
}

/**
 * Render callback.
 *
 * @param array  $block_attributes Block attributes.
 * @param string $content          Block content.
 *
 * @return string
 */
function render_callback( $block_attributes, $content ) {
	$link = get_alternate_theme_site_url();

	// Return early if alternate theme site URL is not set.
	if ( empty( $link ) ) {
		return '';
	}

	$link_text = ! empty( $block_attributes['linkText'] ) ? $block_attributes['linkText'] : $link;

	return sprintf(
		$content,
		sprintf(
			'<a href="%s" class="multi-theme-top-notice__link">%s</a>',
			esc_url( $link ),
			esc_html( $link_text )
		)
	);
}

/**
 * Get alternate-theme site URL.
 *
 * @return string
 */
function get_alternate_theme_site_url() {
	$alternate_theme_site_url = '';

	$base_frontend_url = get_option( 'frontend_url', '' );

	// Return early if base frontend URL is not set.
	if ( empty( $base_frontend_url ) ) {
		return $alternate_theme_site_url;
	}

	// Format the URL based on respective page.
	if ( is_home() ) {
		$alternate_theme_site_url = $base_frontend_url;
	} elseif ( is_author() ) {
		$alternate_theme_site_url = $base_frontend_url . '/user/' . get_the_author();
	} elseif ( is_singular( 'post' ) ) {
		$alternate_theme_site_url = $base_frontend_url . '/blog/' . get_post_field( 'post_name', get_the_ID() );
	} elseif ( is_singular( 'page' ) ) {
		$alternate_theme_site_url = $base_frontend_url . '/' . get_post_field( 'post_name', get_the_ID() );
	}

	return $alternate_theme_site_url;
}
