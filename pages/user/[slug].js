import { gql } from '@apollo/client';
import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import Head from "next/head";
import { useState } from 'react';
import Layout from "../../components/Layout";
import Blogcard from '../../components/User/Blogcard';
import client from "../../src/apollo/Client";
import StripTags from '../../src/escaping/StripTags';
import styles from '../../styles/Blog.module.css';
import userStyles from '../../styles/User.module.css';

export default function Blog({user, slug}) {

	const loadMore = async () => {

		setIsLoading(true);

		const morePostsJSON = await fetch(`/api/fetch-blogs?nextCursor=${nextCursor}&&authorName=${slug}`);
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
	const [hasMore, setHasMore] = useState(user?.posts?.pageInfo?.hasNextPage);
	const [nextCursor, setNextCursor] = useState(user?.posts?.pageInfo?.endCursor);
	const [blogs, setBlogs] = useState(user?.posts?.edges);

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
		<Layout
		customPageTitle={`${authorName} | @Souptik`}
		customPageDescription={`Know about our user - "${authorName}"`}
		customSeoMeta={{
			title: `${authorName} | @Souptik`,
			description: `Know about our user "${authorName}"`,
			siteName: "@Souptik"
		}}
		>
			<Head>
		  		<title>{`${authorName} | @Souptik`}</title>
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

				<Box marginTop="100px" marginBottom="50px">
					<Heading fontWeight="400" marginBottom="50px" className={styles.b_head}>
						Blogs
					</Heading>
					{
						blogs?.map((item, index) => {
							// The index will not change dynamically. So, safe to use index.
							return (
							<Blogcard key={`key-${index}`} data={item.node} styles={userStyles} />
							);

						})
					}
					<Flex width="100%" flexDirection="row" justifyContent="center" alignContent="center">
						<Button
							marginTop="50px"
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
					</Flex>
              </Box>
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
						posts(first: 2) {
							edges {
								node {
									id
									date
									excerpt
									slug
									title
							  	}
							}
							pageInfo {
								endCursor
								hasNextPage
							}
						}
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
