/**
 * WordPress dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import { getCardLayout, normalizeImages } from './layout';

export default function Save( { attributes } ) {
	const images = normalizeImages( attributes.images );

	if ( images.length === 0 ) {
		return null;
	}

	return (
		<div { ...useBlockProps.save( { className: 'souptik-scattered-image-cards' } ) }>
			<div className="souptik-scattered-image-cards__stage">
				{ images.map( ( image, index ) => {
					const layout = getCardLayout( index, images.length );

					return (
						<figure
							key={ image.id || image.url }
							className="souptik-scattered-image-cards__card"
							style={ {
								'--card-rotation': `${ layout.rotation }deg`,
								'--card-x': `${ layout.x }px`,
								'--card-y': `${ layout.y }px`,
								'--card-mobile-x': `${ layout.mobileX }px`,
								'--card-mobile-y': `${ layout.mobileY }px`,
								'--card-z': layout.zIndex,
							} }
						>
							<img src={ image.url } alt={ image.alt } />
						</figure>
					);
				} ) }
			</div>
		</div>
	);
}
