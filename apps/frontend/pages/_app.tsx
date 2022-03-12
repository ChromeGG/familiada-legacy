import { AppProps } from 'next/app'
import Head from 'next/head'
import { theme } from '../config/theme'
import { ThemeProvider } from '@mui/material/styles'
import { DefaultSeo } from 'next-seo'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pl',
          site_name: 'Familiada',
          title: 'Familiada',
        }}
        titleTemplate="%s | Familiada"
      />
      <main className="app">
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  )
}

export default CustomApp
