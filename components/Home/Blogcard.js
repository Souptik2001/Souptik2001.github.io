import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/layout";
import Link from 'next/link';
import StripTags from "../../src/escaping/StripTags";
import { prepareExcerpt } from "../../src/helper-functions";
import Categories from "../Categories";

const parseDate = (rawDate) => {

	let rawDateArray = rawDate.split("T");

	return rawDateArray.join(" @ ");

}

export default function Blogcard({ data, styles, ...rest }) {

	const { title, excerpt, slug, date, author } = data;

	let authorName = author?.node?.name;

	if( author?.node?.firstName !== undefined && author?.node?.firstName !== null ) {

		authorName = author?.node?.firstName;

		if( author?.node?.lastName !== undefined && author?.node?.lastName !== null ) {

			authorName += " " + author?.node?.lastName;

		}

	}

	return (
		<Box className={styles.blog_wrapper}>
			<Box className={styles.blog_category}>
				<Categories categories={data?.categories?.edges ?? []} keyPrefix={slug} />
			</Box>
			<Link href={`/blog/${slug}`} legacyBehavior>
				<ChakraLink style={{textDecoration: 'none'}}>
					<Box className={styles.blog} {...rest}>
						<Heading fontWeight="300" className={styles.b_head}>
							{StripTags(title)}
						</Heading>
						<Box className={styles.b_info}>
							Posted by <Text as="span" fontWeight="800">{authorName}</Text> on {parseDate(date)}
						</Box>
						<Box className={styles.b_body}>
							{/* There wil also be an option to insert content if excerpt is not present. */}
							{prepareExcerpt(excerpt)}
						</Box>
					</Box>
				</ChakraLink>
			</Link>
		</Box>

	)

}