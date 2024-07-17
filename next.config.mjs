/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/earn",
        permanent: true
      },
      {
        source: '/lending',
        destination: '/earn',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
