// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//         port: '',
//         pathname: "/u/**"
//       },
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//         port: '',
//         pathname: "/a/**"
//       }
//     ]
//   },
//   experimental: {
//     serverActions: {
//       allowedOrigins: ["localhost:3000"]
//     }
//   }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: '',
        pathname: "/u/**"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: '',
        pathname: "/a/**"
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["http://localhost:3000", "https://waigenie.vercel.app"]
    }
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*' // Adjust this for production
      }
    ];
  }
};

export default nextConfig;
