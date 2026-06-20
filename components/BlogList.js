import { Box, Button } from '@chakra-ui/react';
import Blogcard from './Home/Blogcard';
import defaultStyles from '../styles/Blogs.module.css';

export default function BlogList({
  blogs,
  hasMore,
  isLoading,
  onLoadMore,
  emptyMessage = 'No blogs found.',
  styles = defaultStyles,
  gridMarginTop = '50px',
  gridMarginBottom = '50px',
}) {
  return (
    <>
      <Box className={styles.blogGrid} marginTop={gridMarginTop} marginBottom={gridMarginBottom}>
        {
          blogs.length > 0 &&
          blogs.map((item, index) => (
            <Blogcard key={item.node?.id || `blog-list-${index}`} data={item.node} styles={styles} />
          ))
        }
        {
          blogs.length === 0 &&
          <Box color="white" fontSize="20px" textAlign="center">
            {emptyMessage}
          </Box>
        }
      </Box>
      <Box textAlign="center">
        <Button
          lineHeight="24px"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          borderRadius="5px"
          fontSize="16px"
          padding="15px"
          fontWeight="600"
          bg="#0f5f3a"
          border="1.5px solid #0f5f3a"
          color="white"
          _hover={{
            bg: '#0b4f31',
          }}
          _active={{
            bg: '#0b4f31',
            transform: 'scale(0.98)',
          }}
          _focus={{
            boxShadow:
            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }}
          isDisabled={! hasMore}
          isLoading={isLoading}
          loadingText="Loading"
          onClick={onLoadMore}
        >
          Load More
        </Button>
      </Box>
    </>
  );
}
