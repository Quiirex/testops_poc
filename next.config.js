/** @type {import('next').NextConfig} */
const withPWA = require('@imbios/next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  typescript: {
    ignoreBuildErrors: true,
  },
});
