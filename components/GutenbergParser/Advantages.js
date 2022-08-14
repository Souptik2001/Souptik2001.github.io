import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import AdvantagesCard from "./Cards/AdvantagesCard";

export default function Advantages() {

	const _data = [
		{
			imageSrc: "./Advantages_Sh1.svg",
			imageAlt: "Shape 1",
			title: "Enabling competition",
			body: "Customers have become more aware due to this plugin comparison service and plugin authors will become more thoughtful about what their plugin offers."
		},
		{
			imageSrc: "./Advantages_Sh2.svg",
			imageAlt: "Shape 2",
			title: "Enabling maintenance",
			body: "At times we have observed that authors do not maintain the plugin once they release. The comparison service will enable authors to actively maintain the plugin."
		},
		{
			imageSrc: "./Advantages_Sh3.svg",
			imageAlt: "Shape 3",
			title: "Enabling support",
			body: "Since the comparison table shows active vs closed support requests; plugin authors will be compelled to stay on top while providing support to their users."
		}
	];

	return (
		<Container maxWidth="100%">
			<Heading fontSize={['31px', null, '61px']} fontWeight="700" lineHeight={['40px', null, "72px"]} letterSpacing="-0.02em" color="#589E71" mb={["10px", null, "104px"]} textAlign="center">
				<Box>
				Advantages to the community
				</Box>
			</Heading>

			<Flex
			// templateColumns="repeat(3, 1fr)"
			w="100%"
			// flexWrap="wrap"
			flexDirection={["column", null, null, "row"]}
			justifyContent="space-between"
			alignItems="stretch"
			>
				{
					_data.map((item, index) =>
						// <GridItem key={`key-${item.title}`} px={16} borderLeft={index !== 0 ? "1px solid" : "none"} borderLeftColor="gray.200">
							<AdvantagesCard imageSrc={item.imageSrc} imageAlt={item.imageAlt} title={item.title} body={item.body} key={`key-${item.title}`} borderLeft={index !== 0 ? ["none", null, null, "1px solid"] : "none"} borderLeftColor={["none", null, null, "gray.200"]} borderTop={index !== 0 ? ["1px solid", null, null, "none"] : "none"} borderTopColor={["gray.200"]}
							px={[0, null, null, 16]}
							py={[16, null, null, 0]}
							// width="23%"
							/>
						// </GridItem>
					)
				}
			</Flex>

		</Container>
	)

}