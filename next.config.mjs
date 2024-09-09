/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        INSTANCE_NAME: process.env.INSTANCE_NAME,
        INSTANCE_PUBLIC_DOMAIN: process.env.INSTANCE_PUBLIC_DOMAIN,
        API_PUBLIC_DOMAIN: process.env.API_PUBLIC_DOMAIN
    },
};

export default nextConfig;

