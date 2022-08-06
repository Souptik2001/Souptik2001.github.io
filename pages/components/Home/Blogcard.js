import { Box, Heading } from "@chakra-ui/layout";

export default function Blogcard({ data, styles, ...rest }) {

	const { title, excerpt, content } = data;

	return (

		<Box className={styles.blog} {...rest}>
			<Heading fontWeight="300" className={styles.b_head}>
				{title}
			</Heading>
			<Box className={styles.b_body}>
				{/* There wil also be an option to insert content if excerpt is not present. */}
				{excerpt}
			</Box>
		</Box>

	)

}