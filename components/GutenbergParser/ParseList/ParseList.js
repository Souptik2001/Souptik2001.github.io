import { ListItem, UnorderedList } from "@chakra-ui/react";
import he from 'he';

export default function ParseList({htmlString}) {

	let listItems = htmlString.split("<li>");
	listItems.shift();
	return (

		<UnorderedList>
			{
				listItems.map((item, index) => {

					return (
					<ListItem key={`key-${item}`}><span dangerouslySetInnerHTML={{ __html: he.decode(item.slice(0, -5)) }} /></ListItem>
					);

				})
			}
		</UnorderedList>

	);

}