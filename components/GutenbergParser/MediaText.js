import { Box, Container, Flex, Image } from "@chakra-ui/react";

export default function MediaText({children, ...props}) {

	const { mediaWidth=50, mediaLink="", variant="1", wrap=true, ...rest } = props;

	let textWidth = 100 - mediaWidth;

	if( variant === "1" ) {

		return(
			<Container maxWidth="100%" position="relative">
				<Flex alignment="center" justifyContent="space-between" flexDirection={["column", null, null, "row"]} flexWrap={(wrap) ? "wrap" : "no-wrap"} {...rest}>
					<Box width={["100%", null, null, `${textWidth}%`]} mb={["0px", null, null, "0"]}>
						{children}
					</Box>
					<Box width={["70%", null, null, `${mediaWidth}%`]} display={["none", null, null, "block"]}>
						<Image w="100%" src={mediaLink} alt="Media-Text block's media"/>
					</Box>
				</Flex>
			</Container>
		);

	} else {

		return(
			<Container maxWidth="100%" position="relative">
				<Flex alignment="center" justifyContent="space-between" flexDirection={["column", null, null, "row"]} flexWrap={(wrap) ? "wrap" : "no-wrap"} {...rest}>
				<Box width={["100%", null, null, `${textWidth}%`]} mb={["0px", null, null, "0"]}>
						{children}
					</Box>
					<Box width={["100%", null, null, `${mediaWidth}%`]} display={["block", null, null, "block"]}>
						<Image w="100%" src={mediaLink} alt="Media-Text block's media"/>
						<Image h="10%" src="./YellowEllipse.svg" alt="Ellipse 2" className="Shapes_Top" top="-5%" left="5%" />
						<Box h="10%" className="Shapes_Top" bottom="-5%" left="75%" display="flex">
							<Image src="./PluginComparison_T1.svg" alt="Triangle 1" />
							<Image src="./PluginComparison_T2.svg" alt="Triangle 2" />
						</Box>
					</Box>
				</Flex>
				<Image h="140%" src="./PluginComparison_E1.svg" alt="Ellipse 1" className="Shapes_Bottom" bottom="-20%" left="50%" transform="translateX(-50%)" />
			</Container>
		);

	}

}