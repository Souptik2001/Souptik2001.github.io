import { gql } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import Blogcard from '../components/Home/Blogcard';
import Layout from '../components/Layout';
import client from '../src/apollo/Client';
import styles from '../styles/Home.module.css';

export default function Home({posts, seoData}) {

  const loadMore = async () => {

    setIsLoading(true);

    const morePostsJSON = await fetch(`/api/fetch-blogs?nextCursor=${nextCursor}`);
    const morePostsResponse = await morePostsJSON.json();

    // Handle error here.

    const morePosts = morePostsResponse.blogs;

    setBlogs((prevBlogs) => {
      return prevBlogs.concat(morePosts.data.posts.edges);
    });

    setNextCursor(morePosts.data.posts.pageInfo.endCursor);
    setHasMore(morePosts.data.posts.pageInfo.hasNextPage);
    setIsLoading(false);

  }

  const [isLoading, setIsLoading] = useState(false);
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
    >
      <Head>
        <title>{"Souptik's Blog"}</title>
      </Head>
      <Box className={styles.firstSec} id={styles.firstSec_i}>
        <Box className={styles.intro}>
            <Heading color="white" letterSpacing="8px" fontFamily="Heboo, Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" fontWeight="800">
              Welcome👋
            </Heading>
            <Box className={styles.blogs} id={styles.blogs}>
              <Box marginBottom="50px">
                {
                  blogs.map((item, index) => {
                    // The index will not change dynamically. So, safe to use index.
                    return (
                      <Blogcard key={`key-${index}`} data={item.node} styles={styles} />
                    );

                  })
                }
              </Box>
              <Button
                lineHeight='24px'
                transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                borderRadius='5px'
                fontSize='16px'
                padding="15px"
                fontWeight='600'
                bg= "#28a745"
                border='1.5px solid #28a745'
                color='white'
                _hover={{
                  bg: "#1f7032",
                }}
                _active={{
                  bg: "#1f7032",
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  boxShadow:
                  '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
                isDisabled={!hasMore}
                isLoading={isLoading}
                loadingText='Loading'
                onClick={loadMore}
              >
                Load More
              </Button>
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
          posts(first: 5) {
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
      }
    };
  } catch(error) {
		return {
			props:{},
			notFound: true
		};
	}

}
