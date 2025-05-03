import { gql } from '@apollo/client';
import { Box, Heading, Container, Spinner, VStack, Text, Button } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useState, useEffect } from 'react';
import Head from "next/head";
import Layout from "../../components/Layout";
import client from "../../src/apollo/Client";
import StripTags from '../../src/escaping/StripTags';
import Search from '../../components/Home/Search';
import Blogcard from '../../components/Home/Blogcard';
import styles from '../../styles/Home.module.css';

export default function Category({posts, displayWPNotice, seoData, slug, name}) {
	const loadMore = () => {
	  updateBlogs(searchTerm, nextCursor);
	}

	const updateBlogs = async ( search, cursor, overwrite = false ) => {
	  setIsLoading(true);

	  const blogsDataJSON = await fetch(`/api/fetch-blogs?nextCursor=${cursor}&search=${search}&category=${slug}`);
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

	useEffect(() => {
		setBlogs(posts.data.posts.edges);
	}, [posts.data.posts.edges]);

	return (
	  <Layout
	  customPageTitle={seoData?.openGraph?.frontPage?.title}
	  customPageDescription={seoData?.openGraph?.frontPage?.description}
	  customSeoMeta={{
		title: seoData?.openGraph?.frontPage?.title,
		description: seoData?.openGraph?.frontPage?.description,
		siteName: "Souptik's Blog | Category: " + name,
		imageURL: seoData?.openGraph?.frontPage?.image?.link
	  }}
	  data={{
		link: process.env.NEXT_PUBLIC_BACKEND_URL,
	  }}
	  displayWPNotice={displayWPNotice}
	  >
		<Head>
		  <title>{"Souptik's Blog | Category: " + name}</title>
		</Head>
		<Box className={styles.firstSec} id={styles.firstSec_i}>
		  <Box className={styles.intro}>
			  <Heading color="white" letterSpacing="8px" fontFamily="Heboo, Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" fontWeight="800">
				Category: {StripTags(name)}
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
						<Text>{`🕵️‍♂️ Searching for "${slug}" blogs...`}</Text>
					</VStack>
				  </Box>
				}
				{
				  ! isSearching &&
				  <>
					<Box marginTop="50px" marginBottom="50px">
					  {
						blogs.length > 0 &&
						blogs.map((item, index) => {
						  // The index will not change dynamically. So, safe to use index.
						  return (
							<Blogcard key={`key-${index}`} data={item.node} styles={styles} />
						  );
  
						})
					  }
					  {
						blogs.length === 0 &&
						<Box color="white" fontSize="20px" textAlign="center">
						  😢 No blogs found. Maybe the author needs some help.
						</Box>
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
				  </>
				}
			  </Box>
		  </Box>
		</Box>
	  </Layout>
	);
}

export async function getStaticProps({params}){

	const {slug} = params;

	try {

		const category = await client.query({
			query: gql`
			  query fetchCategory {
				category(id: "${slug}", idType: SLUG) {
					name
				}
			  }
			`
		});

		const posts = await client.query({
		  query: gql`
			query fetchPosts {
			  posts(first: 5, where: {categoryName: "${slug}"}) {
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
			slug,
			name: category?.data?.category?.name,
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

export async function getStaticPaths(){
	let categories = await client.query({
		query: gql`
		  query fetchCategories {
			categories(first: 10) {
			  edges {
				node {
				  slug
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

    const pathsData = [];

	while( categories?.data?.categories?.edges !== undefined ) {

		categories?.data?.categories?.edges?.map((category) => {
			if (!isEmpty(category?.node?.slug)) {
				pathsData.push({ params: { slug: category?.node?.slug } });
			}
		});

		if ( categories?.data?.categories?.pageInfo?.hasNextPage === false ) { break; }

		categories = await client.query({
			query: gql`
			query fetchCategories {
				categories(first: 10, after: "${categories?.data?.categories?.pageInfo?.endCursor}") {
					edges {
						node {
							slug
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

	}

    categories?.data?.categories?.edges?.map((category) => {
        if (!isEmpty(category?.node?.slug)) {
            pathsData.push({ params: { slug: category?.node?.slug } });
        }
    });

    return {
        paths: pathsData,
        fallback: 'blocking'
    };

}