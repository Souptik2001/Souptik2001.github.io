import { Box, Image } from '@chakra-ui/react';
import styles from './ScatteredImageCards.module.css';

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

const normalizeImages = ( images = [] ) => images
  .filter((image) => image?.url)
  .map((image) => ({
    id: image.id,
    url: image.url,
    alt: image.alt || '',
  }));

const getCardLayout = ( index, total ) => {
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

export default function ScatteredImageCards({ images }) {
  const normalizedImages = normalizeImages(images);

  if (normalizedImages.length === 0) {
    return null;
  }

  return (
    <Box className={styles.scatteredImageCards}>
      <Box className={styles.stage}>
        {
          normalizedImages.map((image, index) => {
            const layout = getCardLayout(index, normalizedImages.length);

            return (
              <Box
                as="figure"
                key={image.id || image.url}
                className={styles.card}
                style={{
                  '--card-rotation': `${layout.rotation}deg`,
                  '--card-x': `${layout.x}px`,
                  '--card-y': `${layout.y}px`,
                  '--card-mobile-x': `${layout.mobileX}px`,
                  '--card-mobile-y': `${layout.mobileY}px`,
                  '--card-z': layout.zIndex,
                }}
              >
                <Image src={image.url} alt={image.alt} />
              </Box>
            );
          })
        }
      </Box>
    </Box>
  );
}
