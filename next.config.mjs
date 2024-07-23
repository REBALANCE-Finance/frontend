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
        source: "/lending",
        destination: "/earn",
        permanent: true
      },
      {
        // TODO: change dest to token when merge to dev
        source: "/lending/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
        destination: "/earn/0xCF86c768E5b8bcc823aC1D825F56f37c533d32F9",
        permanent: true
      },
      {
        source: "/lending/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
        destination: "/earn/0xa8aae282ab2e57B8E39ad2e70DA3566d315348A9",
        permanent: true
      },
      {
        source: "/lending/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
        destination: "/earn/0x5A0F7b7Ea13eDee7AD76744c5A6b92163e51a99a",
        permanent: true
      },
      {
        source: "/lending/0x17fc002b466eec40dae837fc4be5c67993ddbd6f",
        destination: "/earn",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
