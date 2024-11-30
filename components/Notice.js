import { Flex } from "@chakra-ui/react";

const Notice = ({ children, ...props }) => {
  return (
    <Flex
		className="notice"
		justifyContent="center"
		alignItems="center"
		letterSpacing="4px"
		wordSpacing="12px"
		fontSize="13px"
		color={"white"}
		position="sticky"
		top="0"
		px={["15px", null, null, "92px"]}
		py={2}
		borderBottom="1px solid rgba(255, 255, 255, 0.2)"
		background="rgba(0, 0, 0, 0.6)"
		backdropFilter="blur(6px)"
		textAlign="center"
		zIndex={20}
		{...props}
    >
      {children}
    </Flex>
  );
};

export default Notice;
