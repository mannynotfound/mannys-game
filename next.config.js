const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'manny',
    'react-syntax-highlighter',
    'react-sticky-mouse-tooltip',
  ],
};

module.exports = withMDX(nextConfig);
