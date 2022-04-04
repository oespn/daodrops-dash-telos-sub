/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    TWITTER_BEARER: process.env.TWITTER_BEARER,
    TWITTER_KEY: process.env.TWITTER_KEY,
    TWITTER_SECRET: process.env.TWITTER_SECRET,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    DD_API_ROOT: process.env.DD_API_ROOT,
    DD_API_KEY: process.env.DD_API_KEY,
    AMADAO_OPS_EMAIL: process.env.AMADAO_OPS_EMAIL,

    TELOS_PRIVATE_KEY: process.env.TELOS_PRIVATE_KEY,
    TELOS_VALIDATOR_ADDRESS: process.env.TELOS_VALIDATOR_ADDRESS,
    TELOS_SMC_CONTRACT_ADDRESS: process.env.TELOS_SMC_CONTRACT_ADDRESS,
    DEMO_DAO_PRIVATE_KEY_TELOS: process.env.DEMO_DAO_PRIVATE_KEY_TELOS,

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
