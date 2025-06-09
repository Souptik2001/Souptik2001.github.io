<?php
/**
 * Blocks functions.
 *
 * @package souptik
 */

namespace Souptik\Theme\Blocks;

// Includes.
require_once __DIR__ . '/../src/blocks/multi-theme-top-notice/index.php';

/**
 * Setup.
 *
 * @return void
 */
function setup(): void {
	// Fire hooks to bootstrap theme blocks.
	add_filter( 'block_categories_all', __NAMESPACE__ . '\\register_custom_block_category', 10, 2 );

	Multi_Theme_Top_Notice\setup();
}

/**
 * Register custom block category.
 *
 * @param array[]                 $block_categories     Array of categories for block types.
 * @param WP_Block_Editor_Context $block_editor_context The current block editor context.
 */
function register_custom_block_category( $block_categories, $block_editor_context ) {

	return array_merge(
		$block_categories,
		array(
			array(
				'slug'  => 'souptik',
				'title' => esc_html__( 'Souptik', 'souptik' ),
				'icon'  => null,
			),
		)
	);

}
