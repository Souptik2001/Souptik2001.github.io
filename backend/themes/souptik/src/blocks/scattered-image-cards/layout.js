const rotations = [ -7, 5, -3, 8, -5, 4, 7, -6 ];
const offsets = [
	[ 0, 12 ],
	[ -18, -6 ],
	[ 16, 22 ],
	[ -10, 34 ],
	[ 20, 2 ],
	[ -22, 24 ],
	[ 8, -10 ],
	[ -4, 42 ],
];

export const normalizeImages = ( images = [] ) => images
	.filter( ( image ) => image?.url )
	.map( ( image ) => ( {
		id: image.id,
		url: image.url,
		alt: image.alt || '',
	} ) );

export const getCardLayout = ( index, total ) => {
	const [ x, y ] = offsets[ index % offsets.length ];
	const centerOffset = ( index - ( total - 1 ) / 2 ) * 34;

	return {
		rotation: rotations[ index % rotations.length ],
		x: centerOffset + x,
		y,
		zIndex: index + 1,
	};
};
