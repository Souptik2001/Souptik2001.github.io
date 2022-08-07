import { Box, Heading } from "@chakra-ui/layout";
import StripTags from "../../../src/escaping/StripTags";

export default function Blogcard({ data, styles, ...rest }) {

	const { title, excerpt, content } = data;

	return (

		<Box className={styles.blog} {...rest}>
			<Heading fontWeight="300" className={styles.b_head}>
				{StripTags(title)}
			</Heading>
			<Box className={styles.b_body}>
				{/* There wil also be an option to insert content if excerpt is not present. */}
				{StripTags(excerpt)}
			</Box>
		</Box>

	)

}