import { gql } from "@apollo/client";
import { isEmpty } from "lodash";
import client from "../../src/apollo/Client";
import { doesSlugMatchesCustomPage } from "../../src/helper-functions";

export default async function handler(req, res) {

	if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
		return res.status(401).json({ message: 'Invalid revalidate secret token' })
	}

	if (req.query.endpoint !== undefined) {

		try {

			await res.revalidate(req.query.endpoint);

			return res.json({ revalidated: true });

		} catch (err) {

			return res.status(500).send('Error revalidating');

		}

	}

	try {

		if(req.query.async !== undefined){

			revalidate_app(req, res);

			return res.json({
				completed: false,
				revalidated: true
			});

		}

		await revalidate_app(req, res);

		return res.json({
			completed: true,
			revalidated: true
		});

	} catch (err) {

		return res.status(500).send('Error revalidating');

	}

}

async function revalidate_app(req, res) {

	await res.revalidate(`/`);

	let blogs = await client.query({
		query: gql`
		query fetchPosts {
			posts(first: 10) {
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

	while( blogs?.data?.posts?.edges !== undefined ) {

		blogs?.data?.posts?.edges?.map(async (blog) => {
			await res.revalidate(`/blog/${blog?.node?.slug}`);
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

	while( pages?.data?.pages?.edges !== undefined ) {

		pages?.data?.pages?.edges?.map(async (page) => {
			if (!isEmpty(page?.node?.slug) && !doesSlugMatchesCustomPage(page?.node?.slug)) {
				await res.revalidate(`/${page?.node?.slug}`);
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

	while( users?.data?.users?.edges !== undefined ) {

		users?.data?.users?.edges?.map(async (user) => {
			if (!isEmpty(user?.node?.slug)) {
				await res.revalidate(`/user/${user?.node?.slug}`);
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

}