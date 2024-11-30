import { Box } from "@chakra-ui/react";

const Sticky = ({ children, ...props }) => {
  return (
    <Box
		position="sticky"
		top="0"
		width={"100%"}
		{...props}
    >
      {children}
    </Box>
  );
};

export default Sticky;