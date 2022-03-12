// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')
const { createSecureHeaders } = require('next-secure-headers')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }]
  },
}

module.exports = withNx(nextConfig)
