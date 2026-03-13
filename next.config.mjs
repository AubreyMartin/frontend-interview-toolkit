/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/exercise", destination: "/exercises", permanent: true },
      { source: "/questions", destination: "/topics", permanent: true },
    ];
  },
};

export default nextConfig;
