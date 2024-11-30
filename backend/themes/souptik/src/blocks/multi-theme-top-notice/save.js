/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Save function.
 *
 * @return {WPElement} Element to render.
 */
export default function Save( { attributes } ) {
	const { content } = attributes;

	return (
		<RichText.Content
			tagName="div"
			value={content}
			className="souptik-top-notice"
		/>
	);
}