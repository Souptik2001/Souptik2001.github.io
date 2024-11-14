import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";

export default function Search({ setSearchTerm, updateBlogs, setNextCursor, setIsSearching }) {

	const search = (searchTerm) => {
		setIsSearching(true);

		// Set search term.
		setSearchTerm(searchTerm);

		// Reset next cursor.
		setNextCursor('');

		// Execute the search.
		updateBlogs(searchTerm, '', true);
	}

	return (
		<InputGroup>
			<InputLeftElement
				height="100%"
				pointerEvents='none'
			>
				<Icon
					as={FaSearch}
					color="white"
				/>
			</InputLeftElement>
			<Input
				placeholder="Search..."
				_placeholder={{
					opacity: 1,
					color: 'white'
				}}
				size="lg"
				type="text"
				color="white"
				background="rgba(0, 0, 0, 0.4)"
				backdropBlur="4px"
				_hover={{
					bg: "rgba(0, 0, 0, 0.5)"
				}}
				borderColor="#ffffff8c"
				focusBorderColor="#ffffff8c"
				onChange={(event) => {
					debounce( () => { search(event.target.value) }, 300 )();
				}}
			/>
	  	</InputGroup>
	);

}