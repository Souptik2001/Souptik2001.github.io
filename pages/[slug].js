import { gql } from '@apollo/client';
import { Box, Heading, Image } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import Head from "next/head";
import ParseBlock from '../components/GutenbergParser/ParseBlock';
import Layout from "../components/Layout";
import client from "../src/apollo/Client";
import StripTags from '../src/escaping/StripTags';
import { doesSlugMatchesCustomPage } from '../src/helper-functions';
import styles from '../styles/Blog.module.css';

export default function Blog({frontend, displayWPNotice, slug}) {

	return(
		<Layout
		data={frontend?.data?.page}
		yoastSeoData={frontend?.data?.page?.seo}
		displayWPNotice={displayWPNotice}
		>
			<Head>
		  		<title>{`${frontend?.data?.page?.title} | Souptik's Blog`}</title>
			</Head>
			<Box px="10%" className="container">
				<Heading fontWeight="600" className={styles.b_head}>
					{StripTags(frontend?.data?.page?.title)}
				</Heading>
				<Box  marginTop="40px" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
					<Image borderRadius="10px" width={["100%", null, null, "50%"]} srcSet={frontend?.data?.page?.featuredImage?.node?.srcSet} alt={frontend?.data?.page?.featuredImage?.node?.altText} />
				</Box>
				<Box marginTop="70px">
					{frontend
					&&
					<ParseBlock blocks={JSON.parse(frontend?.data?.page?.blocksJSON)} depth={1} />
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
				query fetchPageData {
					page(id: "${slug}", idType: URI) {
						blocksJSON
						date
						title
						link
						author {
							node {
							name
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
					}
				}
			`
		});

		if(frontendData?.data?.page?.blocksJSON === undefined) {

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

	let pages = await client.query({
		query: gql`
		  query fetchPages {
			pages(first: 10) {
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

	while( pages?.data?.pages?.edges !== undefined ) {

		pages?.data?.pages?.edges?.map((page) => {
			if (!isEmpty(page?.node?.slug) && !doesSlugMatchesCustomPage(page?.node?.slug)) {
				pathsData.push({ params: { slug: page?.node?.slug } });
			}
		});

		if ( pages?.data?.pages?.pageInfo?.hasNextPage === false ) { break; }

		pages = await client.query({
			query: gql`
			query fetchPages {
				pages(first: 10, after: "${pages?.data?.pages?.pageInfo?.endCursor}") {
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

    pages?.data?.pages?.edges?.map((page) => {
        if (!isEmpty(page?.node?.slug) && !doesSlugMatchesCustomPage(page?.node?.slug)) {
            pathsData.push({ params: { slug: page?.node?.slug } });
        }
    });

    return {
        paths: pathsData,
        fallback: 'blocking'
    };

}
