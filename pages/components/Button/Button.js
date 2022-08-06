import { Box, Link } from "@chakra-ui/react";

const Button = ({children, isExternal=false, ...props}) => {

	const { link="#", ...rest } = props;

	return(
		<Link href={link} style={{ textDecoration: 'none' }} isExternal={isExternal}>
			<Box
			as='button'
			transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
			{...rest}
			>
				{children}
			</Box>
		</Link>
	)

}

export default Button;