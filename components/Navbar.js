import { Box, Flex, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer background="black" textAlign="center" zIndex="20" {...props}>
      <LogoAndToggleIconContainer zIndex="10">
        <Link style={{textDecoration: "none"}} href="/"><Box cursor="pointer">✍</Box></Link>
        <MenuToggle width={["25%", null, "auto"]} toggle={toggle} isOpen={isOpen} />
      </LogoAndToggleIconContainer>
      <MenuLinks isOpen={isOpen} zIndex="10" />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen, ...rest }) => {
  return (
    <Box cursor="pointer" display={{ base: "flex", md: "none" }} flexDirection="row" alignItems="center" justifyContent="flex-end" onClick={toggle} {...rest}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link
    href={to}
    >
    <ChakraLink
    fontWeight="600"
    style={{textDecoration: "none"}}
    color="rgba(255, 255, 255, 0.5)"
    _hover={{
      color: "rgba(255, 255, 255, 0.8)"
    }}
    {...rest}>
      <Text display="block">
        {children}
      </Text>
    </ChakraLink>
    </Link>
  );
};

const MenuLinks = ({ isOpen, ...props }) => {

  const router = useRouter();

  let currentRoute = '';

  if(router?.query?.slug !== undefined) currentRoute = router?.query?.slug;

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      {...props}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "column", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/" color={(currentRoute === '') ? "white" : "rgba(255, 255, 255, 0.5)"}>📖Home</MenuItem>
        <MenuItem to="/interests" color={(currentRoute === 'interests') ? "white" : "rgba(255, 255, 255, 0.5)"}>📚Interests</MenuItem>
        <MenuItem to="/about" color={(currentRoute === 'about') ? "white" : "rgba(255, 255, 255, 0.5)"}>👋About</MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      wrap="wrap"
      {...props}
    >
      {children}
    </Flex>
  );
};

const LogoAndToggleIconContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      flexDirection="row"
      width={["100%", null, "auto", "auto"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;