const formatters = {
  en: new Intl.NumberFormat('en-EN'),
  pl: new Intl.NumberFormat('pl'),
}

/**
 * @type {import('next-translate').LoaderConfig}
 */
module.exports = {
  locales: ['pl'], // ['pl', 'en' ...]
  defaultLocale: 'pl',
  defaultNS: 'common',
  pages: {
    '*': ['common', 'error'],
  },
  interpolation: {
    // we cannot type it, it's not .ts file :(
    /* eslint-disable @typescript-eslint/no-unsafe-return */
    format: (value, format, lang) => {
      if (format === 'number') {
        return formatters[lang].format(value)
      }
      return value
    },
    /* eslint-enable @typescript-eslint/no-unsafe-return */
  },
}
