import { Box, Image } from '@chakra-ui/react';
import styles from './ImageBlock.module.css';

export default function ImageBlock({ src, alt, height, width, borderRadius }) {
  if (!src) {
    return null;
  }

  return (
    <Box className={styles.imageBlock}>
      <Box className={styles.imageFrame}>
        <Image
          src={src}
          alt={alt || ''}
          className={styles.image}
          height={height || 'auto'}
          width={width || '100%'}
          borderRadius={borderRadius || '8px'}
          loading="lazy"
        />
      </Box>
    </Box>
  );
}
