import { Box, Link as ChakraLink } from "@chakra-ui/react";
import Link from 'next/link';

const Button = ({children, isExternal=false, ...props}) => {

	const { link="#", ...rest } = props;

	return(
		<Link href={link} legacyBehavior>
			<ChakraLink style={{ textDecoration: 'none' }} isExternal={isExternal}>
				<Box
				as='button'
				transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
				{...rest}
				>
					{children}
				</Box>
			</ChakraLink>
		</Link>
	)

}

export default Button;