import { Box, Button, Flex, Input, Link } from "@chakra-ui/react";
import { useRef, useState } from "react";

const Footer = (props) => {

	const emailInput = useRef();
	const nameInput = useRef();
	const [subscribedStatus, setSubscribedStatus] = useState(undefined);
	const [loading, setLoading] = useState(false);

	const subscribe = async function() {
		setLoading(true);
		if ( emailInput.current === undefined || nameInput.current === undefined ) return;
		const userEmail = emailInput.current.value;
		const userName = nameInput.current.value;

		if ( userEmail === '' || userName === '' ) {
			setSubscribedStatus({
				'error': true,
				'message': "Please fill the required fields."
			});
		} else {

			const respJson = await fetch(`/api/newsletter-subscribe?email=${userEmail}&name=${userName}`);
			const resp = await respJson.json();
			if ( ! resp.success ) {
				setSubscribedStatus({
					'error': true,
					'message': "Some internal server error occurred. Sorry for the inconvenience. We are trying to fix it."
				});
			}

			setSubscribedStatus({
				'error': ! resp?.resp?.data?.newsletterSubscribe?.success,
				'message': resp?.resp?.data?.newsletterSubscribe?.message
			});

		}
		setLoading(false);
	}

	return(
		<Flex className="footer" width="100%" flexDirection="column" justifyContent="center" alignItems="center" {...props}>
			<Box
			width="15%"
			border="0.5px solid rgba(255, 255, 255, 0.4)"
			mb="40px"
			></Box>
			<Flex className="newsletter-subscribe" mb="20px" textAlign="center" width="100%" flexDirection={["column", null, null, null, "row"]} justifyContent="space-between" alignItems="center">
				<Box textAlign="center" width={["100%", null, null, null, "100%"]} fontWeight="300" fontSize="16px" lineHeight="32px" color="white" letterSpacing="3px">
					<em>Should we send you a notification when new blogs are published?</em>
					<br/>
					{/* @TODO: Make this link dynamic */}
					<em>Then you can <Link href="https://blog.souptik.dev/#newsletter-subscribe">subscribe to newsletter here</Link>! It is just one click, and no spam! ❤️</em>
				</Box>
			</Flex>
			<Flex textAlign="center" width="100%" flexDirection={["column", null, null, null, "row"]} justifyContent="space-between" alignItems="center">
				<Box textAlign="center" width={["100%", null, null, null, "100%"]} fontWeight="600" fontSize="16px" lineHeight="32px" color="white">
					Built with 💻 by <Link isExternal href="https://www.linkedin.com/in/souptik-datta-a10072183/">Souptik</Link>
				</Box>
			</Flex>
	  </Flex>
	)

}

export default Footer;
