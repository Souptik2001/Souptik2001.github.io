import sanitizeHtml from 'sanitize-html';

const StripTags = (input) => {

	return sanitizeHtml(
		input,
		{
			allowedTags: [],
			allowedAttributes: []
		}
	);

}

export default StripTags;