/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,  // This will make MONGO_URI accessible in your app
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
  },
};

console.log('MONGO_URI:', process.env.MONGO_URI); // Log to check if the variable is accessible

export default nextConfig;
