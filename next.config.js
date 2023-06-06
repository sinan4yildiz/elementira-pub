/** @type {import('next').NextConfig} */
const nextConfig = {
   optimizeFonts: true,
   swcMinify: true,
   trailingSlash: false,
   reactStrictMode: false,
   i18n: {
      locales: ['en'],
      defaultLocale: 'en'
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**'
         }
      ]
   },
   redirects: async () => [
      {
         source: '/:path*',
         has: [
            {
               type: 'host',
               value: 'www.*'
            }
         ],
         destination: `${process.env.APP_URL}/:path*`,
         permanent: true
      }
   ],
   webpack(config, { isServer }) {
      config.module.rules.push({
         test: /\.svg$/i,
         issuer: /\.[jt]sx?$/,
         use: ['@svgr/webpack']
      })

      return config
   }
}

module.exports = nextConfig
