/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import './style.scss';

/**
 * Register the block.
 */
registerBlockType('souptik/multi-theme-top-notice', {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: Save,
});
