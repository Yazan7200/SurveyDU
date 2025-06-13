/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/SurveyDU' : '',
    images: {
        domains: ['localhost'],
        unoptimized: true,
    },
    trailingSlash: true,
    distDir: 'out'
}

module.exports = nextConfig 