import { gql } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/layout';
import { Container, Spinner, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import BlogList from '../components/BlogList';
import Search from '../components/Home/Search';
import Layout from '../components/Layout';
import client from '../src/apollo/Client';
import styles from '../styles/Blogs.module.css';

export default function Blogs({posts, displayWPNotice, seoData}) {
  const loadMore = () => {
    updateBlogs(searchTerm, nextCursor);
  }

  const updateBlogs = async ( search, cursor, overwrite = false ) => {
    setIsLoading(true);

    const blogsDataJSON = await fetch(`/api/fetch-blogs?nextCursor=${cursor}&search=${search}`);
    const blogsDataResponse = await blogsDataJSON.json();

    // Handle error here.

    const blogsData = blogsDataResponse.blogs;

    if (overwrite) {
      setBlogs(blogsData.data.posts.edges);
    } else {
      setBlogs((prevBlogs) => {
        return prevBlogs.concat(blogsData.data.posts.edges);
      });
    }

    setNextCursor(blogsData.data.posts.pageInfo.endCursor);
    setHasMore(blogsData.data.posts.pageInfo.hasNextPage);
    setIsLoading(false);
    setIsSearching(false);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(posts.data.posts.pageInfo.hasNextPage);
  const [nextCursor, setNextCursor] = useState(posts.data.posts.pageInfo.endCursor);
  const [blogs, setBlogs] = useState(posts.data.posts.edges);

  return (
    <Layout
      customPageTitle={seoData?.openGraph?.frontPage?.title}
      customPageDescription={seoData?.openGraph?.frontPage?.description}
      customSeoMeta={{
        title: seoData?.openGraph?.frontPage?.title,
        description: seoData?.openGraph?.frontPage?.description,
        siteName: "Souptik's Blog",
        imageURL: seoData?.openGraph?.frontPage?.image?.link
      }}
      data={{
        link: `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`,
      }}
      displayWPNotice={displayWPNotice}
    >
      <Head>
        <title>{"Blogs | Souptik's Blog"}</title>
      </Head>
      <Box className={styles.firstSec} id={styles.firstSec_i}>
        <Box className={styles.intro}>
          <Heading className={styles.pageTitle}>
            Blogs
          </Heading>
          <Container
            marginTop="20px"
            width={["100%", null, null, null, "50%"]}
          >
            <Search
              setSearchTerm={setSearchTerm}
              setNextCursor={setNextCursor}
              updateBlogs={updateBlogs}
              setIsSearching={setIsSearching}
            />
          </Container>
          <Box className={styles.blogs} id={styles.blogs}>
            {
              isSearching &&
              <Box color="white" fontSize="20px" textAlign="center" marginTop="50px" marginBottom="50px">
                <VStack>
                  <Spinner color="white" borderWidth="4px" />
                  <Text>🕵️‍♂️ Searching for blogs...</Text>
                </VStack>
              </Box>
            }
            {
              ! isSearching &&
              <>
                <BlogList
                  blogs={blogs}
                  hasMore={hasMore}
                  isLoading={isLoading}
                  onLoadMore={loadMore}
                  emptyMessage="😢 No blogs found. Maybe the author needs some help."
                  styles={styles}
                />
              </>
            }
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {

  try {

    const posts = await client.query({
      query: gql`
        query fetchPosts {
          posts(first: 6) {
            edges {
              node {
                id
                date
                excerpt
                slug
                title
                author {
                  node {
                    name
                    firstName
                    lastName
                  }
                }
                categories {
                  edges {
                    node {
                    name
                    slug
                    }
                  }
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      `
    });

    const seoData = await client.query({
      query: gql`
        query seoData {
          seo {
            openGraph {
              frontPage {
                description
                title
                image {
                  altText
                  link
                }
              }
            }
          }
        }
      `
    })

    return {
      props: {
        posts,
        seoData: seoData?.data?.seo,
        displayWPNotice: process.env.DISPLAY_WP_SITE_NOTICE ?? null,
      }
    };
  } catch(error) {
		return {
			props:{},
			notFound: true
		};
	}

}
