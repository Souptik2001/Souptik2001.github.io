/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';

/**
 * Edit function.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content, linkText } = attributes;

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'souptik' ) }>
					<TextControl
						label={ __( 'Link Text', 'souptik' ) }
						value={ linkText }
						onChange={ ( linkText ) => setAttributes( { linkText: linkText } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				className="souptik-top-notice"
				tagName="div"
				value={ content }
				onChange={ ( content ) => setAttributes( { content: content } ) }
				placeholder={ __( "Content... (Note: %s will be replaced by new theme site URL)", "souptik" ) }
			/>
		</div>
	);
}