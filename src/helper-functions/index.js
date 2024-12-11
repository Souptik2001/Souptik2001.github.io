import { Box } from "@chakra-ui/layout";
import he from 'he';
import humanFormat from 'human-format';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import _ from "lodash";
import StripTags from "../escaping/StripTags";

TimeAgo.addLocale(en);

export function parseClassNameString(classNameString){

	if(classNameString===undefined) { return {} };

	let classNamesRaw = classNameString.split(";");

	let classNames = {};

	classNamesRaw.forEach(className => {
		let values = className.split("=");
		classNames[values[0]]=values[1];
	});

	return classNames;

}

export function parseStyles(attributes, defaultStyles){
	var style = {};
	_.merge(style, defaultStyles, attributes.style);
	if(attributes.textColor) {style.color.text = attributes.textColor;}
	return style;
}

export function removeHTMLCharacters(text, includeBasicMarkup=true){
	if(includeBasicMarkup){

		return(
			<Box width="100%">
				{text.replace(/(<([^>]+)>)/gi, "")}
			</Box>
		)

	}

	return text.replace(/(<([^>]+)>)/gi, "");
}

export function removeHTMLCharactersAndDecode(text, includeBasicMarkup=true){
	if(includeBasicMarkup){

		return(
			<Box width="100%">
				{he.decode(text.replace(/(<([^>]+)>)/gi, ""))}
			</Box>
		)

	}

	return he.decode(text.replace(/(<([^>]+)>)/gi, ""));
}

export function parseNumber(rawNumber) {

	return humanFormat(
		rawNumber,
		{
			maxDecimals: 1,
		}
	);

}

export function parseDateAndTime(dateTimeString) {

	let parsedString = '';

	if(dateTimeString===undefined || dateTimeString===false || dateTimeString==='false') {
		return 'N/A';
	}

	let dateTimeList = dateTimeString.split(' ');

	const timeAgo = new TimeAgo('en-US');

	if(dateTimeList.length > 0) {
		parsedString += timeAgo.format(new Date(dateTimeList[0]).getTime());
	}

	return parsedString;

}

export const doesSlugMatchesCustomPage = (slug) => {
	const pagesToExclude = [];

	return pagesToExclude.includes(slug);
}

export const prepareExcerpt = (excerpt) => {
	const regex = /<p>(.*?)<\/p>/s;
	const match = excerpt.match(regex);

	if (match) {
	  excerpt = match[1];
	}

	return StripTags(excerpt);
}
