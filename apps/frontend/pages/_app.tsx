import { AppProps } from 'next/app'
import Head from 'next/head'
import { theme } from '../configuration/theme'
import { ThemeProvider } from '@mui/material/styles'
import { DefaultSeo } from 'next-seo'
import { CssBaseline } from '@mui/material'
import { PlayerContext } from '../contexts/Player'
import { useEffect, useState } from 'react'
import {
  ClientToServerEvents,
  Player,
  ServerToClientEvents,
} from '@familiada/shared-interfaces'
import { Hydrate, QueryClientProvider } from 'react-query'
import { queryClient } from '../core/httpClient'
import { io, Socket } from 'socket.io-client'
import { config } from '../configuration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SocketContext } from '../contexts/Socket'

const { apiUrl } = config

function CustomApp({ Component, pageProps }: AppProps) {
  const [client] = useState(() => queryClient)
  const [player, setPlayer] = useState<Player>(null)
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(null)

  useEffect((): any => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `${apiUrl}`
    )
    setSocket(newSocket)
    // log socket connection
    newSocket.on('connect', () => {
      console.log('Socket ID', newSocket.id)
    })

    // // update chat on new message dispatched
    // socket.on('message', (message: IMsg) => {
    //   chat.push(message)
    //   setChat([...chat])
    // })

    if (newSocket) return () => newSocket.disconnect()
  }, [])

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
          <SocketContext.Provider value={{ socket, setSocket }}>
            <PlayerContext.Provider value={{ player, setPlayer }}>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
                <ReactQueryDevtools />
              </ThemeProvider>
            </PlayerContext.Provider>
          </SocketContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default CustomApp
