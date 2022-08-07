import { Flex } from "@chakra-ui/react";

const Buttons = ({children, ...props}) => {

	return(
			<Flex {...props}>
				{children}
			</Flex>
	)

}

export default Buttons;