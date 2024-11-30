import { Box, Icon } from "@chakra-ui/react";
import Footer from './Footer';
import NavBar from "./Navbar";
import Seo from "./Seo/Seo";
import Notice from "./Notice";
import Sticky from "./Sticky";
import Link from 'next/link';
import { GrAnnounce, GrWordpress } from "react-icons/gr";

const Layout = ({
	children,
	data,
	yoastSeoData,
	customPageTitle,
	customPageDescription,
    customSeoMeta,
	displayWPNotice = 'no',
    customPublishedTime,
}) => {

	return (
		<Box
			className="content-main"
		>
			<Seo
                seo={yoastSeoData ?? {}}
				customPageTitle={customPageTitle}
				customPageDescription={customPageDescription}
				customSeoMeta={customSeoMeta}
            />
			<Sticky
				zIndex="20"
			>
				{
					displayWPNotice === 'yes' && data?.link && data?.link !== ''
					&&
					<Notice>
						<p>
							<Icon as={GrAnnounce} color="white" /> <Icon as={GrWordpress} color="white" /> Check out the <Link href={data.link} legacyBehavior>WordPress site</Link> for the same content in a new experience!
						</p>
				</Notice>
				}
				<NavBar />
			</Sticky>
				{ children }
			<Footer px={["15px", null, null, "128px"]} py={["32px", null, null, "64px"]}  />
		</Box>

	);

}

export default Layout;