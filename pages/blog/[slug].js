import { gql } from '@apollo/client';
import { Box, Heading, Image } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import Head from "next/head";
import ParseBlock from '../../components/GutenbergParser/ParseBlock';
import Layout from "../../components/Layout";
import client from "../../src/apollo/Client";
import StripTags from '../../src/escaping/StripTags';
import { doesSlugMatchesCustomPage } from '../../src/helper-functions';
import styles from '../../styles/Blog.module.css';

const parseDate = (rawDate) => {

	let rawDateArray = rawDate.split("T");

	return rawDateArray.join(" @ ");

}

export default function Blog({frontend, slug}) {

	return(
		<Layout>
			<Head>
		  		<title>{`@Souptik | ${frontend?.data?.post?.title}`}</title>
			</Head>
			<Box px="10%" className="container">
				<Heading fontWeight="300" className={styles.b_head}>
					{StripTags(frontend?.data?.post?.title)}
				</Heading>
				<Box className={styles.b_info}>
					Posted by {frontend?.data?.post?.author?.node?.name} on {parseDate(frontend?.data?.post?.date)}
				</Box>
				<Box  marginTop="40px" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
					<Image borderRadius="10px" width={["100%", null, null, "50%"]} srcSet={frontend?.data?.post?.featuredImage?.node?.srcSet} alt={frontend?.data?.post?.featuredImage?.node?.altText} />
				</Box>
				<Box marginTop="70px">
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

		if(frontendData?.data?.post?.blocksJSON === undefined) {

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

	const blogs = await client.query({
		query: gql`
		  query fetchPosts {
			posts {
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

    blogs?.data?.posts?.edges?.map((blog) => {
        if (!isEmpty(blog?.node?.slug) && !doesSlugMatchesCustomPage(blog?.node?.slug)) {
            pathsData.push({ params: { slug: blog?.node?.slug } });
        }
    });

    return {
        paths: pathsData,
        fallback: 'blocking'
    };

}
