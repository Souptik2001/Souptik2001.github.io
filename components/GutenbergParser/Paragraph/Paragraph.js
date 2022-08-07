import { Box } from "@chakra-ui/react";

const Paragraph = ({children, ...props}) => {

	return (
		<Box {...props}>
			{children}
		</Box>
	)

}

export default Paragraph;