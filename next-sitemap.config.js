const frontendUrl = process.env.NEXT_PUBLIC_ORIGIN || 'https://souptik.dev';
const robotsTxtPolicies = [
	(process.env.DISALLOW_INDEXING !== undefined) ? { userAgent: '*', disallow: '/' } : { userAgent: '*', disallow: '/*?*' }
];

module.exports = {
    siteUrl: frontendUrl,
    generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: robotsTxtPolicies
	}
};
