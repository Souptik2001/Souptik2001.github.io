<?php
/**
 * Scattered image cards block.
 *
 * @package souptik
 */

namespace Souptik\Theme\Blocks\Scattered_Image_Cards;

/**
 * Setup.
 *
 * @return void
 */
function setup(): void {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

/**
 * Register block.
 *
 * @return void
 */
function register_block(): void {
	$blocks_path = __DIR__ . '/../../../dist/blocks';

	register_block_type( $blocks_path . '/scattered-image-cards/' );
}
