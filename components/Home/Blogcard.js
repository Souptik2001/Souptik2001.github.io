import { Box, Heading, Link } from "@chakra-ui/layout";
import StripTags from "../../src/escaping/StripTags";

const parseDate = (rawDate) => {

	let rawDateArray = rawDate.split("T");

	return rawDateArray.join(" @ ");

}

export default function Blogcard({ data, styles, ...rest }) {

	const { title, excerpt, slug, date, author } = data;

	return (

		<Link style={{textDecoration: 'none'}} href={`/blog/${slug}`}>
			<Box className={styles.blog} {...rest}>
				<Heading fontWeight="300" className={styles.b_head}>
					{StripTags(title)}
				</Heading>
				<Box className={styles.b_info}>
					Posted by {author.node.name} on {parseDate(date)}
				</Box>
				<Box className={styles.b_body}>
					{/* There wil also be an option to insert content if excerpt is not present. */}
					{StripTags(excerpt)}
				</Box>
			</Box>
		</Link>


	)

}