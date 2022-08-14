import { Flex } from "@chakra-ui/react";

export default function Columns({children, ...props}) {

	const { verticalAlignment="center", ...rest } = props;

	return(
		<Flex
		flexDirection={["column", null, null, "row"]}
		justifyContent="space-between"
		alignItems={verticalAlignment}
		{...rest}
		>
			{children}
		</Flex>
	);

}