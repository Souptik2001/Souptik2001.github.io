import { gql } from '@apollo/client';
import { Box, Link as ChakraLink, Heading, Image } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import Head from "next/head";
import Link from 'next/link';
import ParseBlock from '../../components/GutenbergParser/ParseBlock';
import Layout from "../../components/Layout";
import client from "../../src/apollo/Client";
import StripTags from '../../src/escaping/StripTags';
import { doesSlugMatchesCustomPage } from '../../src/helper-functions';
import styles from '../../styles/Blog.module.css';
import Categories from '../../components/Categories';

const parseDate = (rawDate) => {

	let rawDateArray = rawDate.split("T");

	return rawDateArray.join(" @ ");

}

export default function Blog({frontend, displayWPNotice, slug}) {

	const authorNameHoverCSS = {
		textDecoration: "none",
		textShadow: "0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white, 0 0 50px white, 0 0 60px white, 0 0 70px white",
	}

	let authorName = frontend?.data?.post?.author?.node?.name;

	if( frontend?.data?.post?.author?.node?.firstName !== undefined && frontend?.data?.post?.author?.node?.firstName !== null ) {

		authorName = frontend?.data?.post?.author?.node?.firstName;

		if( frontend?.data?.post?.author?.node?.lastName !== undefined && frontend?.data?.post?.author?.node?.lastName !== null ) {

			authorName += " " + frontend?.data?.post?.author?.node?.lastName;

		}

	}

	return(
		<Layout
		data={frontend?.data?.post}
		yoastSeoData={frontend?.data?.post?.seo}
		displayWPNotice={displayWPNotice}
		>
			<Head>
		  		<title>{`${frontend?.data?.post?.title} | Souptik's Blog`}</title>
			</Head>
			<Box px="10%" className="container">
				<Heading fontWeight="300" className={styles.b_head}>
					{StripTags(frontend?.data?.post?.title)}
				</Heading>
				<Box className={styles.b_info}>
					Posted by <Link href={`/user/${frontend?.data?.post?.author?.node?.slug}`} legacyBehavior><ChakraLink fontWeight="600" __css={{ transition: "1s" }} _hover={authorNameHoverCSS}>{authorName}</ChakraLink></Link> on {parseDate(frontend?.data?.post?.date)}
				</Box>
				<Box className={styles.b_categories}>
					<Categories categories={frontend?.data?.post?.categories?.edges ?? []} />
				</Box>
				<Box  marginTop="40px" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
					<Image borderRadius="10px" width={["100%", null, null, "50%"]} srcSet={frontend?.data?.post?.featuredImage?.node?.srcSet} alt={frontend?.data?.post?.featuredImage?.node?.altText} />
				</Box>
				<Box px={["0%", null, "1%", "10%", "16%"]} marginTop="70px">
					{frontend
					&&
					<ParseBlock blocks={JSON.parse(frontend?.data?.post?.blocksJSON)} depth={1} />
					}
				</Box>
			</Box>
		</Layout>
	);

}

export async function getStaticProps({params}){

	const {slug} = params;

	try{
		let frontendData = await client.query({
			query: gql`
				query fetchPostData {
					post(id: "${slug}", idType: SLUG) {
						blocksJSON
						date
						title
						link
						author {
							node {
								name
								slug
								firstName
								lastName
							}
						}
						featuredImage {
							node {
							  altText
							  sourceUrl
							  srcSet
							  uri
							}
						}
						seo{
							canonical
							title
							metaDesc
							opengraphType
							metaRobotsNoindex
							metaRobotsNofollow
							opengraphAuthor
							opengraphDescription
							opengraphTitle
							opengraphDescription
							opengraphImage {
								altText
								sourceUrl
								srcSet
							}
							opengraphUrl
							opengraphSiteName
							opengraphPublishedTime
							opengraphModifiedTime
							twitterTitle
							twitterDescription
							twitterImage {
								altText
								sourceUrl
								srcSet
							}
							breadcrumbs {
								url
								text
							}
							cornerstone
							schema {
								pageType
								articleType
								raw
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
			`
		});

		if(frontendData?.data?.post?.blocksJSON === undefined) {

			return {
				props:{},
				notFound: true
			};

		}

		return {
			props: {
				slug,
				frontend: frontendData,
				displayWPNotice: process.env.DISPLAY_WP_SITE_NOTICE ?? null,
			}
		}
	} catch(error) {
		return {
			props:{},
			notFound: true
		};
	}

}

export async function getStaticPaths(){

	let blogs = await client.query({
		query: gql`
		  query fetchPosts {
			posts(first: 10) {
			  edges {
				node {
				  slug
				}
			  }
			}
		  }
		`
	  });

    const pathsData = [];

	while( blogs?.data?.posts?.edges !== undefined ) {

		blogs?.data?.posts?.edges?.map((blog) => {
			if (!isEmpty(blog?.node?.slug) && !doesSlugMatchesCustomPage(blog?.node?.slug)) {
				pathsData.push({ params: { slug: blog?.node?.slug } });
			}
		});

		if ( blogs?.data?.posts?.pageInfo?.hasNextPage === false ) { break; }

		blogs = await client.query({
			query: gql`
			query fetchPosts {
				posts(first: 10, after: "${blogs?.data?.posts?.pageInfo?.endCursor}") {
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

    return {
        paths: pathsData,
        fallback: 'blocking'
    };

}
