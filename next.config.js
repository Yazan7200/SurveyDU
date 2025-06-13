/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        unoptimized: true,
    },
    output: 'export',
    basePath: '/SurveyDU',
    assetPrefix: '/SurveyDU/',
}

module.exports = nextConfig 