import { Box } from "@chakra-ui/react";
import { flexDirectionToBorder, flexDirectionToPadding } from "../../src/value-mappings";


export default function Column({children, ...props}) {

	const {columnNumber=0, totalColumns=0, border, borderY, borderX, borderTop, borderBottom, borderLeft, borderRight, padding, px, py, paddingX, paddingY, pl, paddingLeft, pr, paddingRight, pt, paddingTop, pb, paddingBottom, ...rest} = props;

	let paddingMapping;
	if(padding!==undefined){
		paddingMapping = flexDirectionToPadding(padding ?? 0, padding ?? 0, padding ?? 0, padding ?? 0);
	} else if(px!==undefined || py!==undefined){
		paddingMapping = flexDirectionToPadding(py ?? 0, py ?? 0, px ?? 0, px ?? 0);
	} else if(paddingX!==undefined || paddingY!==undefined) {
		paddingMapping = flexDirectionToPadding(paddingY ?? 0, paddingY ?? 0, paddingX ?? 0, paddingX ?? 0);
	} else	if(paddingTop!==undefined || paddingBottom!==undefined || paddingRight!==undefined || paddingLeft!==undefined) {
		paddingMapping = flexDirectionToPadding(paddingTop ?? 0, paddingBottom ?? 0, paddingRight ?? 0, paddingLeft ?? 0);
	} else {
		paddingMapping = flexDirectionToPadding(pt ?? 0, pb ?? 0, pr ?? 0, pl ?? 0);
	}
	let borderMapping;
	if(border!==undefined) {
		borderMapping =flexDirectionToBorder(padding ?? 0, padding ?? 0, padding ?? 0, padding ?? 0);
	} else if(borderX!==undefined || borderY!==undefined) {
		borderMapping = flexDirectionToBorder(borderY ?? 0, borderY ?? 0, borderX ?? 0, borderX ?? 0);
	} else {
		borderMapping = flexDirectionToBorder(borderTop ?? 0, borderBottom ?? 0, borderRight ?? 0, borderLeft ?? 0);
	}

	return(
		<Box
		width="100%"
		borderLeft={columnNumber !== 0 ? borderMapping.horizontal.left : "none"}
		borderLeftColor={["none", null, null, "#F0E7D7"]}
		borderTop={columnNumber !== 0 ? borderMapping.horizontal.top : "none"}
		borderTopColor={["none", null, null, "#F0E7D7"]}
		borderRight={columnNumber+1 < totalColumns ? borderMapping.horizontal.right : "none"}
		borderRightColor={["none", null, null, "#F0E7D7"]}
		borderBottom={columnNumber+1 < totalColumns ? borderMapping.horizontal.bottom : "none"}
		borderBottomColor={["none", null, null, "#F0E7D7"]}
		pt={paddingMapping.horizontal.top}
		pb={paddingMapping.horizontal.bottom}
		pl={paddingMapping.horizontal.left}
		pr={paddingMapping.horizontal.right}
		{...rest}
		>
			{children}
		</Box>
	);

}