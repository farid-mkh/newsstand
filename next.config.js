/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        nyt_api_url: process.env.NYT_API_URL,
        nyt_api_key: process.env.NYT_API_KEY,
        newsorg_api_url: process.env.NEWSORG_API_URL,
        newsorg_api_key: process.env.NEWSORG_API_KEY,
        guardian_api_url: process.env.GUARDIAN_API_URL,
        guardian_api_key: process.env.GUARDIAN_API_KEY,
    },
};

module.exports = nextConfig;
