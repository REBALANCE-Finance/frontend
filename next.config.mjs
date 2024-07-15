/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/earn",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
