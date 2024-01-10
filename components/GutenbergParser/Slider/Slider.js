import { Box, Icon, useToast, Image } from "@chakra-ui/react";
import he from 'he';
import { useEffect, useState, Children } from "react";
import { BiCopy } from 'react-icons/bi';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import '@travelopia/web-components/dist/slider/style.css';

const Slider = ({blocks, ...props}) => {

	useEffect(() => {
		function loadWebComponent() {
		  import("@travelopia/web-components/dist/slider")
		}
		loadWebComponent();
	}, []);

	let slides = [];
	let slideNavItems = [];

	blocks.forEach((block, index) => {
		slides.push(
			<tp-slider-slide key={index}>
				<Image src={block.attributes.url} alt={block.attributes.alt} height={block?.attributes?.height ?? 'auto'} width={block?.attributes?.width ?? 'auto'} />
				{
					block?.attributes?.caption !== ''
					&&
					<Box className="caption">{block?.attributes?.caption}</Box>
				}
			</tp-slider-slide>
		);

		slideNavItems.push(
			<tp-slider-nav-item key={index}></tp-slider-nav-item>
		)
	});


	return (
		<div className="slider-container">
			<tp-slider flexible-height="yes" infinite="yes" swipe="yes">
				<tp-slider-track>
					<tp-slider-arrow direction="previous"><button><FaAngleLeft /></button></tp-slider-arrow>
					<tp-slider-arrow direction="next"><button><FaAngleRight /></button></tp-slider-arrow>
					<tp-slider-slides>
						{slides}
					</tp-slider-slides>
				</tp-slider-track>
				<tp-slider-nav>
					{slideNavItems}
				</tp-slider-nav>
			</tp-slider>
		</div>
	);

}

export default Slider;