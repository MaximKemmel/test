
const withNextIntl = require('next-intl/plugin')();


/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    reactStrictMode: false
})

module.exports = nextConfig;
