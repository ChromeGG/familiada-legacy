import { AppProps } from 'next/app'
import Head from 'next/head'
import { theme } from '../config/theme'
import { ThemeProvider } from '@mui/material/styles'
import { DefaultSeo } from 'next-seo'
import { CssBaseline } from '@mui/material'
import { PlayerContext } from '../contexts/Player'
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
        defaultTitle="Familiada"
      />
      <CssBaseline />
      <PlayerContext.Provider value={null}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </PlayerContext.Provider>
    </>
  )
}

export default CustomApp
