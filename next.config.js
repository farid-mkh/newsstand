/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NYT_API_URL: process.env.NYT_API_URL,
        NYT_API_KEY: process.env.NYT_API_KEY,
        NEWSORG_API_URL: process.env.NEWSORG_API_URL,
        NEWSORG_API_KEY: process.env.NEWSORG_API_KEY,
        GUARDIAN_API_URL: process.env.GUARDIAN_API_URL,
        GUARDIAN_API_KEY: process.env.GUARDIAN_API_KEY,
    },
};

module.exports = nextConfig;
