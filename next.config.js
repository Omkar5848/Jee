/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',   // ensures static build for GH Pages
  images: {
    unoptimized: true
  },
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS ? '/Jee' : '',
  images: { unoptimized: true },
  basePath: process.env.GITHUB_ACTIONS ? '/Jee' : '',
};


module.exports = nextConfig;
