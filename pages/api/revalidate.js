import { gql } from "@apollo/client";
import { isEmpty } from "lodash";
import client from "../../src/apollo/Client";
import { doesSlugMatchesCustomPage } from "../../src/helper-functions";

export default async function handler(req, res) {
	// Check for secret to confirm this is a valid request
	if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
	  return res.status(401).json({ message: 'Invalid token' })
	}

	if (req.query.endpoint !== undefined) {

		await res.revalidate(req.query.endpoint);

		return res.json({ revalidated: true });

	}

	try {
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

		blogs?.data?.posts?.edges?.map(async (blog) => {
			await res.revalidate(`/blog/${blog?.node?.slug}`);
		});

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

		pages?.data?.pages?.edges?.map(async (page) => {
			if (!isEmpty(page?.node?.slug) && !doesSlugMatchesCustomPage(page?.node?.slug)) {
				await res.revalidate(`/${page?.node?.slug}`);
			}
		});

		return res.json({ revalidated: true })
	} catch (err) {
		return res.status(500).send('Error revalidating');
	}
  }