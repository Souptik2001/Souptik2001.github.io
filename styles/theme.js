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
	styles: {
		global: (props) => ({
			body: {
				background: ["radial-gradient(circle at 0% 0%, rgba(18, 61, 102, 0.95) 0%, rgba(11, 31, 58, 0.72) 24%, rgba(7, 17, 31, 0.35) 45%, rgba(0, 0, 0, 0) 66%), linear-gradient(135deg, #030712 0%, #000000 74%, #000000 100%)", null, null, "radial-gradient(circle at 0% 0%, rgba(18, 61, 102, 0.95) 0%, rgba(11, 31, 58, 0.72) 24%, rgba(7, 17, 31, 0.35) 45%, rgba(0, 0, 0, 0) 66%), linear-gradient(135deg, #030712 0%, #000000 74%, #000000 100%)"],
				animation: "gradient 15s ease infinite",
			}
		 })
	},
	fonts: {
		heading: 'Heebo, sans-serif',
		body: 'Heebo, sans-serif',
	  },
});
