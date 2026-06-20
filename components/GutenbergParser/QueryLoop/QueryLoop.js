import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BlogList from '../../BlogList';
import styles from '../../../styles/Blogs.module.css';

const getIntegerList = (rawValue) => {
  if (! rawValue) {
    return [];
  }

  const values = Array.isArray(rawValue) ? rawValue : [ rawValue ];

  return values
    .flatMap((value) => {
      if (typeof value === 'string') {
        return value.split(',');
      }

      if (value && typeof value === 'object') {
        return [ value.id, value.value, value.term_id ];
      }

      return [ value ];
    })
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => ! Number.isNaN(value));
};

const getStringList = (rawValue) => {
  if (! rawValue) {
    return [];
  }

  const values = Array.isArray(rawValue) ? rawValue : [ rawValue ];

  return values
    .flatMap((value) => {
      if (value && typeof value === 'object') {
        return [ value.slug, value.value, value.name ];
      }

      return `${value}`.split(',');
    })
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
};

const getSlugList = (rawValue) => getStringList(rawValue)
  .filter((value) => ! /^\d+$/.test(value));

const getTaxQueryValue = (taxQuery, taxonomy) => (
  taxQuery?.[taxonomy] ?? taxQuery?.include?.[taxonomy]
);

const buildQueryLoopParams = (attributes = {}) => {
  const query = attributes.query ?? {};
  const taxQuery = query.taxQuery ?? {};
  const perPage = Number.parseInt(query.perPage, 10);
  const tagTaxQuery = getTaxQueryValue(taxQuery, 'post_tag') ?? getTaxQueryValue(taxQuery, 'tag');
  const categoryTaxQuery = getTaxQueryValue(taxQuery, 'category');
  const tagIds = [
    ...getIntegerList(query.tagIds),
    ...getIntegerList(tagTaxQuery),
  ];
  const categoryIds = [
    ...getIntegerList(query.categoryIds),
    ...getIntegerList(categoryTaxQuery),
  ];
  const tagSlugs = [
    ...getStringList(query.tagSlugs),
    ...getStringList(query.tagSlug),
    ...getSlugList(tagTaxQuery),
  ];

  return {
    perPage: Number.isNaN(perPage) ? 6 : Math.max(1, Math.min(perPage, 24)),
    tagIds: [ ...new Set(tagIds) ],
    categoryIds: [ ...new Set(categoryIds) ],
    tagSlugs: [ ...new Set(tagSlugs) ],
    categorySlug: query.categoryName || query.categorySlug || '',
  };
};

const buildRequestUrl = ({ cursor, params }) => {
  const searchParams = new URLSearchParams();

  searchParams.set('perPage', params.perPage);

  if (cursor) {
    searchParams.set('nextCursor', cursor);
  }

  if (params.categorySlug) {
    searchParams.set('category', params.categorySlug);
  }

  if (params.categoryIds.length > 0) {
    searchParams.set('categoryIn', params.categoryIds.join(','));
  }

  if (params.tagIds.length > 0) {
    searchParams.set('tagIn', params.tagIds.join(','));
  }

  if (params.tagSlugs.length > 0) {
    searchParams.set('tagSlugIn', params.tagSlugs.join(','));
  }

  return `/api/fetch-blogs?${searchParams.toString()}`;
};

export default function QueryLoop({ attributes }) {
  const params = useMemo(() => buildQueryLoopParams(attributes), [ attributes ]);
  const [blogs, setBlogs] = useState([]);
  const [nextCursor, setNextCursor] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchPosts = useCallback(async ({ cursor = '', overwrite = false } = {}) => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch(buildRequestUrl({ cursor, params }));
      const postsResponse = await response.json();
      const posts = postsResponse?.blogs?.data?.posts;

      if (! posts) {
        throw new Error('Could not load query loop posts.');
      }

      setBlogs((previousBlogs) => (
        overwrite ? posts.edges : previousBlogs.concat(posts.edges)
      ));
      setNextCursor(posts.pageInfo.endCursor);
      setHasMore(posts.pageInfo.hasNextPage);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, [ params ]);

  useEffect(() => {
    setBlogs([]);
    setNextCursor('');
    setHasMore(false);
    setHasLoaded(false);
    fetchPosts({ overwrite: true });
  }, [ fetchPosts ]);

  return (
    <Box className={styles.blogs} marginTop="40px" marginBottom="40px">
      {
        ! hasLoaded && isLoading &&
        <Box color="white" fontSize="20px" textAlign="center" marginTop="30px" marginBottom="30px">
          <VStack>
            <Spinner color="white" borderWidth="4px" />
            <Text>Loading posts...</Text>
          </VStack>
        </Box>
      }
      {
        hasError &&
        <Box color="white" fontSize="20px" textAlign="center">
          Could not load posts.
        </Box>
      }
      {
        hasLoaded && ! hasError &&
        <BlogList
          blogs={blogs}
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={() => fetchPosts({ cursor: nextCursor })}
          emptyMessage="No posts found."
          styles={styles}
          gridMarginTop="30px"
          gridMarginBottom="40px"
        />
      }
    </Box>
  );
}
