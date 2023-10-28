import { Box, Icon, useToast } from "@chakra-ui/react";
import he from 'he';
import { useState } from "react";
import { BiCopy } from 'react-icons/bi';
import { BsCheckAll } from 'react-icons/bs';

const Code = ({block, ...props}) => {

	const toast = useToast();

	const [displayCopyIcon, setDisplayCopyIcon] = useState(false);
	const [copied, setCopied] = useState(false);

	return (
		<Box
		width="100%"
		border="1px solid white"
		color="white"
		pt={ block?.attributes?.style?.spacing?.padding?.top ?? "16px" }
		pb={ block?.attributes?.style?.spacing?.padding?.bottom ?? "16px" }
		pr={ block?.attributes?.style?.spacing?.padding?.right ?? "16px" }
		pl={ block?.attributes?.style?.spacing?.padding?.left ?? "16px" }
		borderRadius="5px"
		cursor="copy"
		onClick={() => {
			navigator.clipboard.writeText(he.decode(block.attributes.content));
			setCopied(true);
			toast({
				title: 'Copied to clipboard.',
				status: 'success',
				duration: 1000,
				isClosable: false,
				variant: 'left-accent',
				position: 'bottom-left',
			})
		}}
		backdropFilter="blur(10px)"
		transition="background-color 0.2s"
		_hover={{
			backgroundColor: "rgba(255, 255, 255, 0.1)"
		}}
		onMouseOver={() => setDisplayCopyIcon(true)}
		onMouseLeave={() => {
			setDisplayCopyIcon(false);
			setCopied(false);
		}}
		position="relative"
		{...props}
		>
			<code style={{ whiteSpace: 'pre-line' }} className="no-code-style">{he.decode(block.attributes.content)}</code>
			<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			marginRight="20px"
			borderRadius="5px"
			background="rgba(255, 255, 255, 0.6)"
			position="absolute"
			right="0"
			top="50%"
			transform="translateY(-50%)"
			height="40px"
			width="40px"
			transition="all 0.2s"
			opacity={displayCopyIcon ? "100%" : "0%"}
			>
				{
					! copied
					&&
					<Icon
					as={BiCopy}
					color="black"
					/>
				}
				{
					copied
					&&
					<Icon
					as={BsCheckAll}
					color="black"
					/>
				}
			</Box>
		</Box>
	)

}

export default Code;