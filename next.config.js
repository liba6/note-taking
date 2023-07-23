// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: false,
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = {
//       fs: false,
//       net: false,
//       dns: false,
//       child_process: false,
//       tls: false,
//     };

//     return config;
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
