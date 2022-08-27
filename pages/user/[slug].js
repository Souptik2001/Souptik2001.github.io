import { gql } from '@apollo/client';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import Head from "next/head";
import Layout from "../../components/Layout";
import client from "../../src/apollo/Client";
import StripTags from '../../src/escaping/StripTags';
import styles from '../../styles/Blog.module.css';

const parseDate = (rawDate) => {

	let rawDateArray = rawDate.split("T");

	return rawDateArray.join(" @ ");

}

export default function Blog({user, slug}) {

	let authorName = user?.name;

	if( user?.firstName !== undefined && user?.firstName !== null ) {

		authorName = user?.firstName;

		if( user?.lastName !== undefined && user?.lastName !== null ) {

			authorName += " " + user?.lastName;

		}

	}

	let registered = user?.registered;

	registered = registered.split( ' ' );

	registered = ( registered.length > 0 ) ? registered[0] : '';

	return(
		<Layout>
			<Head>
		  		<title>{`@Souptik | ${authorName}`}</title>
			</Head>
			<Box px="10%" className="container">
				<Heading fontWeight="600" className={styles.b_head}>
					{StripTags(authorName)}
				</Heading>
				<Box className={styles.b_info}>
					Member since <strong>{registered}</strong>
				</Box>
				<Flex flexDirection="row" justifyContent="center" alignItems="center">
					<Box textAlign="center" className={styles.b_info} width="fit-content" borderRadius="20px" px="10px" py="5px" fontWeight="600" bg="rgba(0, 209, 0, 0.5)">{user?.role?.name}</Box>
				</Flex>
				<Box marginTop="30px" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
					<Image __css={{aspectRatio: '1/1'}} height="96px" boxShadow="0px 0px 36px 0px white" borderRadius="50" src={user?.avatar?.url} alt="User profile picture" />
				</Box>
				<Flex marginTop="40px" flexDirection="row" justifyContent="center" alignItems="center">
					<Box letterSpacing="2.5px" lineHeight="30px" __css={{wordSpacing: "10px"}} textAlign="center" width={["100%", null, null, "50%"]} color="white">
						{StripTags( user?.description )}
					</Box>
				</Flex>
			</Box>
		</Layout>
	);

}

export async function getStaticProps({params}){

	const {slug} = params;

	try{
		let user = await client.query({
			query: gql`
				query fetchUserData {
					user(id: "${slug}", idType: SLUG) {
						id
						description
						firstName
						lastName
						name
						nicename
						nickname
						avatar {
							url
						}
						role {
							name
							slug
						}
						registered
					}
				}
			`
		});

		if(user?.data?.user === undefined || user?.data?.user === null) {

			return {
				props:{},
				notFound: true
			};

		}

		return {
			props: {
				slug,
				user: user?.data?.user
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

	let users = await client.query({
		query: gql`
		  query fetchUsers {
			users(first: 10) {
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

	while( users?.data?.users?.edges !== undefined ) {

		users?.data?.users?.edges?.map((user) => {
			if (!isEmpty(user?.node?.slug)) {
				pathsData.push({ params: { slug: user?.node?.slug } });
			}
		});

		if ( users?.data?.users?.pageInfo?.hasNextPage === false ) { break; }

		users = await client.query({
			query: gql`
			query fetchUsers {
				users(first: 10, after: "${users?.data?.users?.pageInfo?.endCursor}") {
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
