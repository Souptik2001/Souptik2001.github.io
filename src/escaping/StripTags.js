import sanitizeHtml from 'sanitize-html';
import he from 'he';

const StripTags = (input) => {

	return he.decode(sanitizeHtml(
		input,
		{
			allowedTags: [],
			allowedAttributes: []
		}
	));

}

export default StripTags;
