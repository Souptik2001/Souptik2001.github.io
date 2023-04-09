import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";

export default function FourOhFour() {

	return (
		<Layout>
			<Head>
		  		<title>Souptik's Blog | 404</title>
			</Head>
			<Box color="white" display="flex" alignItems="center" justifyContent="center">
				<Box textAlign="center" fontSize="20px" fontWeight="600" letterSpacing="7px">404 | Page Not Found</Box>
			</Box>
		</Layout>
	);

}