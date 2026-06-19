/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType( 'souptik/scattered-image-cards', {
	edit: Edit,
	save: Save,
} );
