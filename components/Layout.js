import { Box } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout = ({
	children,
}) => {

	return (

		<Box
		className="content"
		position="relative"
		height="100%"
		maxHeight="100vh"
		overflowX="hidden"
		overflowY="scroll"
		background="radial-gradient(rgba(0, 0, 0, 0.76), rgba(5, 5, 5, 0.829)), url('/main_b.webp')"
		backgroundRepeat="no-repeat"
		backgroundPosition="center"
		backgroundSize="cover"
		backgroundAttachment="fixed"
		>
			<NavBar position="sticky" top="0" px={["15px", null, null, "92px"]} py={10} marginBottom={["46px", null, "70px"]} borderBottom="1px solid rgba(255, 255, 255, 0.2)" background="rgba(0, 0, 0, 0.05)" backdropFilter="blur(6px)" />
			{ children }
			<Footer px={["15px", null, null, "128px"]} py={["32px", null, null, "64px"]}  />
		</Box>

	);

}

export default Layout;