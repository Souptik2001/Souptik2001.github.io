import { Box, Flex, Heading, Link as ChakraLink } from "@chakra-ui/layout";
import Link from 'next/link';
import StripTags from "../../src/escaping/StripTags";

const parseDate = (rawDate) => {

	let rawDateArray = rawDate.split("T");

	return rawDateArray.join(" @ ");

}

export default function Blogcard({ data, styles, ...rest }) {

	const { title, excerpt, slug, date, author } = data;

	return (

		<Flex width="100%" flexDirection="column" justifyContent="center" alignItems="center">
			<Link href={`/blog/${slug}`}>
				<ChakraLink width={["100%", null, null, "50%"]} style={{textDecoration: 'none'}}>
					<Box className={styles.blog} {...rest}>
						<Heading fontWeight="300" fontSize="20px" className={styles.b_head}>
							{StripTags(title)}
						</Heading>
						<Box className={styles.b_info}>
							Posted on {parseDate(date)}
						</Box>
						<Box border="0px" className={styles.b_body}>
							{/* There wil also be an option to insert content if excerpt is not present. */}
							{StripTags(excerpt)}
						</Box>
					</Box>
				</ChakraLink>
			</Link>
		</Flex>


	)

}