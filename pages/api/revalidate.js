export default async function handler(req, res) {
	// Check for secret to confirm this is a valid request
	if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
	  return res.status(401).json({ message: 'Invalid token' })
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
			if (!isEmpty(blog?.node?.slug) && !doesSlugMatchesCustomPage(blog?.node?.slug)) {
				await res.revalidate(`/blog/${blog?.node?.slug}`);
			}
		});

		const pages = await client.query({
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

		pages?.data?.posts?.edges?.map(async (page) => {
			if (!isEmpty(page?.node?.slug) && !doesSlugMatchesCustomPage(page?.node?.slug)) {
				await res.revalidate(`/${page?.node?.slug}`);
			}
		});

		return res.json({ revalidated: true })
	} catch (err) {
		return res.status(500).send('Error revalidating');
	}
  }