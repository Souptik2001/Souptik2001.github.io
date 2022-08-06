import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	colors: {
		primary: {
			1: "#D67648",
			2: "#589E71",
			3: "#DEB64F",
			4: "#B472CC",
		},
		neutral: {
			1: "#000000",
			2: "#666666",
			3: "#FFFFFF",
		},
	},
	fonts: {
		heading: 'Heebo, sans-serif',
		body: 'Heebo, sans-serif',
	  },
});