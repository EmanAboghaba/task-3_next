/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["randomuser.me"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.app.goo.gl",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default nextConfig;
