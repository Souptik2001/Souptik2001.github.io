import he from 'he';
import { NextSeo } from 'next-seo';


const Seo = ({
    seo,
    customPageTitle,
	customPageDescription,
    customSeoMeta,
    customPublishedTime,
}) => {

	let frontendURL = process.env.NEXT_PUBLIC_ORIGIN ?? "https://souptik.dev";

	let title = customPageTitle ?? seo?.title;
	let description = customPageDescription ?? seo?.metaDesc;
	let ogTitle = customSeoMeta?.title ?? seo?.opengraphTitle;
	let ogDesc = customSeoMeta?.description ?? seo?.opengraphDescription;
	let ogSiteName = customSeoMeta?.siteName ?? seo?.opengraphSiteName;
	let ogImage = null;
	if(customSeoMeta?.imageURL) {
		ogImage = [
			{
				url: customSeoMeta?.imageURL,
				width: 1280,
				height: 720
			}
		];
	}else if(seo?.opengraphImage){
		ogImage = [
			{
				url: seo?.opengraphImage?.sourceUrl,
				width: 1280,
				height: 720
			}
		];
	} else {
		ogImage = [
			{
				url: frontendURL + "/icon.webp",
				width: 1280,
				height: 720
			}
		]
	}

	let ogURL = customSeoMeta?.url ?? ( seo?.opengraphUrl ? seo?.opengraphUrl.replace(process.env.NEXT_PUBLIC_BACKEND_URL, frontendURL) : frontendURL );

	return (
		<NextSeo
			title={(title) ? he.decode(title) : 'Souptik\'s Blog'}
			description={(description) ? he.decode(description) : 'Read quality technology blogs.'}
			canonical=''
			openGraph={{
                type: seo?.opengraphType || 'website',
                locale: seo?.opengraphLocale || 'en_US',
				title: (ogTitle) ? he.decode(ogTitle) : 'Souptik\'s Blog',
				description: (ogDesc) ? he.decode(ogDesc) : 'Read quality technology blogs.',
				url: (ogURL) ? ogURL : '',
				site_name: (ogSiteName) ? he.decode(ogSiteName) : 'Souptik\'s Blog',
				images: ogImage,
				article: {
					publishedTime: customPublishedTime || (seo?.opengraphPublishedTime ?? ''),
                    modifiedTime: seo?.opengraphModifiedTime ?? ''
				}

			}}
			twitter={{
                handle: '@datta_souptik',
                site: 'Souptik\'s Blog',
                cardType: 'summary_large_image'
            }}
	  />
	);

}

export default Seo;
