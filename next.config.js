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
    output: 'standalone',
    basePath: process.env.NODE_ENV === 'production' ? '/SurveyDU' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/SurveyDU/' : '',
    webpack: (config) => {
        config.module.rules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        });
        return config;
    },
}

module.exports = nextConfig 