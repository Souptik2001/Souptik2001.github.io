import { Box, Flex, Link } from "@chakra-ui/react";

const Footer = (props) => {

	return(
		<Flex textAlign="center" width="100%" flexDirection={["column", null, null, null, "row"]} justifyContent="space-between" alignItems="center" {...props}>
			<Box textAlign="center" width={["100%", null, null, null, "100%"]} fontWeight="600" fontSize="16px" lineHeight="32px" color="white">
			Built with 💻 by <Link isExternal href="https://www.linkedin.com/in/souptik-datta-a10072183/">Souptik</Link>
			</Box>
	  </Flex>
	)

}

export default Footer;
