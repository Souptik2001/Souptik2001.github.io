import { Flex } from "@chakra-ui/react";

export default function Columns({children, ...props}) {

	const { verticalAlignment="center", ...rest } = props;

	return(
		<Flex
		width="100%"
		flexDirection={["column", null, null, "row"]}
		justifyContent="space-between"
		alignItems={verticalAlignment}
		{...rest}
		>
			{children}
		</Flex>
	);

}