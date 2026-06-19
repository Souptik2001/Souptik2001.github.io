import { Box, Image } from '@chakra-ui/react';
import styles from './ScatteredImageCards.module.css';

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

const normalizeImages = ( images = [] ) => images
  .filter((image) => image?.url)
  .map((image) => ({
    id: image.id,
    url: image.url,
    alt: image.alt || '',
  }));

const getCardLayout = ( index, total ) => {
  const [ x, y ] = offsets[ index % offsets.length ];
  const centerOffset = ( index - ( total - 1 ) / 2 ) * 34;

  return {
    rotation: rotations[ index % rotations.length ],
    x: centerOffset + x,
    y,
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
