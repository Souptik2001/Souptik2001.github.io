/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { getCardLayout, normalizeImages } from './layout';

export default function Edit( { attributes, setAttributes } ) {
	const images = normalizeImages( attributes.images );
	const blockProps = useBlockProps( {
		className: 'souptik-scattered-image-cards',
	} );

	const setImages = ( selectedImages ) => {
		setAttributes( {
			images: normalizeImages( selectedImages ),
		} );
	};

	return (
		<div { ...blockProps }>
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={ [ 'image' ] }
					gallery
					multiple
					value={ images.map( ( image ) => image.id ) }
					onSelect={ setImages }
					render={ ( { open } ) => (
						<Button
							className="souptik-scattered-image-cards__button"
							variant="secondary"
							onClick={ open }
						>
							{ images.length > 0
								? __( 'Edit scattered images', 'souptik' )
								: __( 'Select scattered images', 'souptik' ) }
						</Button>
					) }
				/>
			</MediaUploadCheck>

			{ images.length > 0 ? (
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
									'--card-z': layout.zIndex,
								} }
							>
								<img src={ image.url } alt={ image.alt } />
							</figure>
						);
					} ) }
				</div>
			) : (
				<div className="souptik-scattered-image-cards__empty">
					{ __( 'Choose a few images to create a scattered card stack.', 'souptik' ) }
				</div>
			) }
		</div>
	);
}
