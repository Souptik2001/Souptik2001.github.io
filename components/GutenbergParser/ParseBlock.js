import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import he from 'he';
import _ from "lodash";
import { ATTRIBUTE_NAMES, BUTTON_STYLE, FLEX_LAYOUT, GROUP_STYLE, H_STYLE, P_STYLE } from "../../src/default-values";
import { parseClassNameString, parseStyles } from "../../src/helper-functions";
import { flexAlignment, flexOrientation } from '../../src/value-mappings';
import Button from "./Button/Button";
import Buttons from "./Button/Buttons";
import Column from "./Column";
import Columns from "./Columns";
import MediaText from "./MediaText";
import Paragraph from "./Paragraph/Paragraph";
import ParseList from "./ParseList/ParseList";

const ParseBlock = ({blocks, depth, searchComponent, extra}) => {

	if( blocks.length < 0 ) {
		return;
	}

	let elements = [];

	blocks.forEach((block, index) => {

		let key = `${block.name}-${depth}-${index}`;

		/**
		 * Following attributes can be passed through custom classes section( e.g - "pt=20px;mr=50%" ):
		 * - pt: "0px",
		 * - pb: "0px",
		 * - pr: "0px",
		 * - pl: "0px",
		 * - mt: "0px",
		 * - mb: "0px",
		 * - mr: "0px",
		 * - ml: "0px",
		 * - width: "100%",
		 * - height: "100%"
		 * - box-shadow: ""
		 * - border-radius: ""
		 */
		let customAttributesRaw = parseClassNameString(block.attributes.className);
		let customAttributes = {};
		_.merge(customAttributes, ATTRIBUTE_NAMES, customAttributesRaw);

		if(block?.attributes?.style?.spacing?.padding){
			if(customAttributesRaw.pr===undefined && block.attributes.style.spacing.padding.right){
				customAttributes.pr = block.attributes.style.spacing.padding.right;
			}
			if(customAttributesRaw.pl===undefined && block.attributes.style.spacing.padding.left){
				customAttributes.pl = block.attributes.style.spacing.padding.left;
			}
			if(customAttributesRaw.pt===undefined && block.attributes.style.spacing.padding.top){
				customAttributes.pt = block.attributes.style.spacing.padding.top;
			}
			if(customAttributesRaw.pb===undefined && block.attributes.style.spacing.padding.bottom){
				customAttributes.pb = block.attributes.style.spacing.padding.bottom;
			}
		}

		switch(block.name) {
			case "core/spacer":
				elements.push(
					<Box
					key={key}
					pt={block.attributes.height}
					></Box>
				);
				break;
			case "core/media-text":
				let wrap = (block.attributes.isStackedOnMobile) ? block.attributes.isStackedOnMobile : false;
				let flexDirection = (block.attributes.mediaPosition && block.attributes.mediaPosition === "left") ? "row-reverse" : "row";
				let verticalPositioning = (block.attributes.mediaPosition) ? flexAlignment[block.attributes.verticalAlignment] : "center";
				elements.push(
					<MediaText wrap={wrap} key={key} alignItems={verticalPositioning} flexDirection={flexDirection} mediaWidth={block.attributes.mediaWidth ?? 50} mediaLink={block.attributes.mediaUrl ?? "#"} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb} variant={customAttributes.variant}>
						<ParseBlock blocks={block.innerBlocks} depth={depth+1} searchComponent={searchComponent} />
					</MediaText>
				);
				break;
			case "core/group":
				var style = {};
				_.merge(style, GROUP_STYLE, (block.attributes.style) ?? {});
				if(block.attributes.backgroundColor !== undefined) style.color.gradient = block.attributes.backgroundColor;
				style.width = (block?.attributes?.align) ? "100%" : "auto";
				if(customAttributesRaw.width !== undefined) style.width = customAttributesRaw.width;
				elements.push(
					<Flex flexDirection="row" justifyContent="center" alignItems="stretch" key={key} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} width="100%">
						<Box pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb} background={style.color.gradient} width={style.width} boxShadow={customAttributes['box-shadow']} borderRadius={customAttributes['border-radius']}>
							<ParseBlock blocks={block.innerBlocks} depth={depth+1} searchComponent={searchComponent} />
						</Box>
					</Flex>
				);
				break;
			case "core/columns":
				elements.push(
					<Columns key={key} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb} verticalAlignment={flexAlignment[block.attributes.verticalAlignment] ?? "center"}>
						<ParseBlock blocks={block.innerBlocks} depth={depth+1} extra={{totalColumns: block.innerBlocks.length}} searchComponent={searchComponent} />
					</Columns>
				);
				break;
			case "core/column":
				elements.push(
					<Column key={key} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb} borderLeft={customAttributes.bl} borderRight={customAttributes.br} borderTop={customAttributes.bt} borderBottom={customAttributes.bb} columnNumber={index} totalColumns={extra.totalColumns}>
						<ParseBlock blocks={block.innerBlocks} depth={depth+1} searchComponent={searchComponent} />
					</Column>
				);
				break;
			case "core/heading":
				var style = {};
				_.merge(style, H_STYLE[block.attributes.level], block.attributes.style);
				if(block?.attributes?.textColor !== undefined) style.color.text = block?.attributes?.textColor;
				elements.push(
					<Heading key={key} as={`h${block.attributes.level}`} fontSize={style.typography.fontSize} fontWeight={style.typography.fontWeight} letterSpacing="-0.02em" lineHeight={style.typography.lineHeight} color={style.color.text} textAlign={block.attributes.textAlign} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb} width={customAttributes.width}>
						<span dangerouslySetInnerHTML={{ __html: he.decode(block.attributes.content) }} />
						<ParseBlock blocks={block.innerBlocks} depth={depth+1} searchComponent={searchComponent} />
					</Heading>
				);
				break;
			case "core/paragraph":
				var style = parseStyles(block.attributes, P_STYLE);
				elements.push(
					<Paragraph key={key} fontSize={style.typography.fontSize} fontWeight={style.typography.fontWeight} lineHeight={style.typography.lineHeight} color={style.color.text} textAlign={block.attributes.align} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb} width={customAttributes.width}>
						<span dangerouslySetInnerHTML={{ __html: he.decode(block.attributes.content) }} />
						<ParseBlock blocks={block.innerBlocks} depth={depth+1} searchComponent={searchComponent} />
					</Paragraph>
				);
				break;
			case "core/search":
				if(searchComponent === undefined){
					elements.push( <Box key={key} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb}><Text as="kbd">Could not render block {block.name} because searchComponent prop has not been passed to ParseBlock component!</Text></Box> );
				} else {
					elements.push(
						<Box key={key}>
							{searchComponent}
						</Box>
					);
				}
				break;
			case "core/list":
				var style = parseStyles(block.attributes, P_STYLE);
				elements.push(
					<Paragraph key={key} fontSize={style.typography.fontSize} fontWeight={style.typography.fontWeight} lineHeight={style.typography.lineHeight} color={style.color.text} textAlign={block.attributes.align} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb} width={customAttributes.width}>
						<ParseList htmlString={block.attributes.values} />
						<ParseBlock blocks={block.innerBlocks} depth={depth+1} searchComponent={searchComponent} />
					</Paragraph>
				);
				break;
			case "core/image":
				elements.push(
					<Image key={key} src={block.attributes.url} alt={block.attributes.alt} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb} width={customAttributes.width} />
				);
				break;
			case "core/buttons":
				let layout = {};
				_.merge(layout, FLEX_LAYOUT, block.attributes.layout);
				elements.push(
					<Buttons key={key} flexWrap={layout.flexWrap} flexDirection={flexOrientation[layout.flexDirection]} alignItems="center" justifyContent={layout.justifyContent}>
						<ParseBlock blocks={block.innerBlocks} depth={depth+1} searchComponent={searchComponent} />
				  	</Buttons>
				);
				break;
			case "core/button":
				var style = parseStyles(block.attributes, BUTTON_STYLE);
				elements.push(
					<Button
					key={key}
					height={customAttributes.height}
					width={customAttributes.width}
					borderRadius={style.border.radius}
					bg={style.color.background}
					color={style.color.text}
					lineHeight='1.2'
					fontSize={style}
					fontWeight='500'
					borderColor='#ccd0d5'
					_hover={{ bg: "#3F6DD1" }}
					_active={{
						bg: "#3F6DD1",
						transform: 'scale(0.98)',
					}}
					_focus={{
						boxShadow:
						'0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
					}}
					mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb}
					link={block.attributes.url ?? "#"}
					>
						{he.decode(block.attributes.text)}
					</Button>
				);
				break;
			default:
				elements.push( <Box key={key} mb={customAttributes.mb} mt={customAttributes.mt} mr={customAttributes.mr} ml={customAttributes.ml} pl={customAttributes.pl} pr={customAttributes.pr} pt={customAttributes.pt} pb={customAttributes.pb}><Text as="kbd">Could not identify block of type {block.name}!</Text></Box> );
				break;
		}

	});

	return (
		<>
			{elements}
		</>
	);

}

export default ParseBlock;