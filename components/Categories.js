import { Box, Link as ChakraLink } from "@chakra-ui/layout";
import Link from 'next/link';
import styles from '../styles/Categories.module.css';

export default function Categories({ categories, keyPrefix }) {
	if (!categories || categories.length === 0) {
		return null;
	}
	return (
		<Box className={styles.categories}>
		{
			categories.length > 0 &&
			categories.map((item, index) => {
			  // The index will not change dynamically. So, safe to use index.
			  return (
				<Link key={`key-${keyPrefix}-${index}`} href={`/category/${item.node.slug}`} legacyBehavior>
					<ChakraLink style={{textDecoration: 'none'}}>
						<span className={styles.category_pill}>
							<em>{item.node.name}</em>
						</span>
					</ChakraLink>
				</Link>
			  );
			})
		}
		</Box>

	)

}