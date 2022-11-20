import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/layout";
import Link from 'next/link';
import StripTags from "../../src/escaping/StripTags";

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

		<Link href={`/blog/${slug}`}>
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
						{StripTags(excerpt)}
					</Box>
				</Box>
			</ChakraLink>
		</Link>

	)

}