const rotations = [ -12, 9, -7, 13, -10, 6, 11, -8 ];
const offsets = [
	[ 0, 12 ],
	[ -44, -12 ],
	[ 46, 24 ],
	[ -72, 34 ],
	[ 76, -4 ],
	[ -100, 22 ],
	[ 104, -18 ],
	[ -28, 48 ],
];
const mobileOffsets = [
	[ 0, -28 ],
	[ -16, -18 ],
	[ 16, -8 ],
	[ -12, 2 ],
	[ 12, 12 ],
	[ -8, 22 ],
	[ 8, 32 ],
	[ 0, 42 ],
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
	const [ mobileX, mobileY ] = mobileOffsets[ index % mobileOffsets.length ];
	const centerOffset = ( index - ( total - 1 ) / 2 ) * 48;

	return {
		rotation: rotations[ index % rotations.length ],
		x: centerOffset + x,
		y,
		mobileX,
		mobileY,
		zIndex: index + 1,
	};
};
