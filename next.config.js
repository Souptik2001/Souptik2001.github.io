/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 1000,
  reactStrictMode: true,
  swcMinify: true,
  /**
   * We specify which domains are allowed to be optimized.
   * This is needed to ensure that external urls can't be abused.
   * @see https://nextjs.org/docs/basic-features/image-optimization#domains
   */
  images: {
    domains: []
  },

	async redirects() {
		return [
		  {
        source: '/blog',
        destination: '/',
        permanent: true,
		  },
		]
	},

  async headers() {
    return [
      {
        source: '/api/revalidate',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          }
        ]
      }
    ]
  },
}

module.exports = nextConfig
