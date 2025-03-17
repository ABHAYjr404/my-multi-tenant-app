/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/api/resolve-school',
      },
    ];
  },
};

module.exports = nextConfig;
