import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout";

export default function FourOhFour() {

	return (
		<Layout>
			<Box color="white" height="100vh" display="flex" alignItems="center" justifyContent="center">
				<Box textAlign="center" fontSize="20px" fontWeight="600" letterSpacing="7px">404 | Page Not Found</Box>
			</Box>
		</Layout>
	);

}