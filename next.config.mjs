/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/lending",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
