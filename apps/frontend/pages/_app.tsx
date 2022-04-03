import { AppProps } from 'next/app'
import Head from 'next/head'
import { theme } from '../configuration/theme'
import { ThemeProvider } from '@mui/material/styles'
import { DefaultSeo } from 'next-seo'
import { CssBaseline } from '@mui/material'
import { PlayerContext } from '../contexts/Player'
import { useState } from 'react'
import { Player } from '@familiada/shared-interfaces'
import { Hydrate, QueryClientProvider } from 'react-query'
import { queryClient } from '../core/httpClient'

function CustomApp({ Component, pageProps }: AppProps) {
  const [client] = useState(() => queryClient)
  const [player, setPlayer] = useState<Player>(null)

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
      <QueryClientProvider client={client}>
        <Hydrate state={pageProps.dehydratedState}>
          <PlayerContext.Provider value={{ player, setPlayer }}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </PlayerContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default CustomApp
