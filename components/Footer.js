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
		<Flex width="100%" flexDirection="column" justifyContent="center" alignItems="center" {...props}>
			<Box
			width="15%"
			border="0.5px solid rgba(255, 255, 255, 0.4)"
			mb="40px"
			></Box>
			<Flex mb="20px" textAlign="center" width="100%" flexDirection={["column", null, null, null, "row"]} justifyContent="space-between" alignItems="center">
				<Box textAlign="center" width={["100%", null, null, null, "100%"]} fontWeight="300" fontSize="16px" lineHeight="32px" color="white" letterSpacing="3px">
					<em>Seems interesting? We can send you a notification on a new blog&apos;s release</em>👇
				</Box>
			</Flex>
			<Flex mb="20px" gap="40px" textAlign="center" width="50%" flexDirection={["column", null, null, null, "row"]} justifyContent="space-between" alignItems="center">
				<Input
				placeholder="Name"
				size="lg"
				type="text"
				color="white"
				ref={nameInput}
				disabled={loading}
				/>
				<Input
				placeholder="Email"
				size="lg"
				type="email"
				color="white"
				ref={emailInput}
				disabled={loading}
				/>
			</Flex>
			<Button
			letterSpacing="5px"
			mb="5px"
			lineHeight='24px'
			transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
			borderRadius='5px'
			fontSize='16px'
			padding="8px"
			fontWeight='600'
			bg='rgba(0,0,0,0)'
			border='1.5px solid #28a745'
			color='#28a745'
			_hover={{
				bg: "#28a745",
				color: "white"
			}}
			_active={{
				bg: "#28a745",
				color: "white",
				transform: 'scale(0.98)',
			}}
			_focus={{
				boxShadow:
				'0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
			}}
			disabled={loading}
			onClick={subscribe}
			>
				Subscribe
			</Button>
			<Flex mb="40px" textAlign="center" width="100%" flexDirection={["column", null, null, null, "row"]} justifyContent="space-between" alignItems="center">
				<Box textAlign="center" width={["100%", null, null, null, "100%"]} fontWeight="600" fontSize="12px" lineHeight="32px" color={subscribedStatus?.error === true ? "red" : "white"} letterSpacing="3px">
					{ subscribedStatus !== undefined && subscribedStatus.error === true && '❌' }
					{ subscribedStatus !== undefined && subscribedStatus.error === false && '✅' }
					{ subscribedStatus !== undefined && subscribedStatus.message !== undefined && subscribedStatus.message }
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
