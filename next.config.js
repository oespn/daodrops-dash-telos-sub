/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
   
    DD_API_ROOT: process.env.DD_API_ROOT,
    DD_API_KEY: process.env.DD_API_KEY,
    AMADAO_OPS_EMAIL: process.env.AMADAO_OPS_EMAIL,

  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      child_process: false,
      readline: false,
    };
    return config;
  }
};

module.exports = nextConfig;
