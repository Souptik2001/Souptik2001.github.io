import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './EmbedBlock.module.css';

export default function EmbedBlock({ src, title, aspectRatio = '16 / 9', className = '' }) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return null;
  }

  return (
    <Box className={`${styles.embedBlock} ${className}`}>
      <Box className={styles.embedFrame} style={{ '--embed-aspect-ratio': aspectRatio }}>
        {!loaded && (
          <Box className={styles.loader} aria-hidden="true">
            <Box className={styles.loaderPulse} />
          </Box>
        )}
        <iframe
          className={`${styles.iframe} ${loaded ? styles.iframeLoaded : ''}`}
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </Box>
    </Box>
  );
}
