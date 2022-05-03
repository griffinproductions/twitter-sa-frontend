/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    console.log('rewrites');
    return [
      {
        source: '/users/session',
        destination: 'http://localhost:81/users/session',
      },
    ];
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};
