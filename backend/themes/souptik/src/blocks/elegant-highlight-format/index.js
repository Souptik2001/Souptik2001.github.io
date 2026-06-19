/**
 * WordPress dependencies
 */
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	applyFormat,
	registerFormatType,
	removeFormat,
} from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import './style.scss';

const FORMAT_NAME = 'souptik/elegant-highlight';

const ElegantHighlightEdit = ( { isActive, value, onChange } ) => {
	const toggleHighlight = () => {
		onChange(
			isActive
				? removeFormat( value, FORMAT_NAME )
				: applyFormat( value, { type: FORMAT_NAME } )
		);
	};

	return (
		<RichTextToolbarButton
			icon={ <span aria-hidden="true">Aa</span> }
			title={ __( 'Elegant highlight', 'souptik' ) }
			onClick={ toggleHighlight }
			isActive={ isActive }
		/>
	);
};

registerFormatType( FORMAT_NAME, {
	title: __( 'Elegant highlight', 'souptik' ),
	tagName: 'span',
	className: 'souptik-elegant-highlight',
	edit: ElegantHighlightEdit,
} );
