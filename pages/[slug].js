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

export default function Blog({frontend, slug}) {

	return(
		<Layout>
			<Head>
		  		<title>{`@Souptik | ${frontend?.data?.page?.title}`}</title>
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
				frontend: frontendData
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

	const pages = await client.query({
		query: gql`
		  query fetchPages {
			pages {
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
