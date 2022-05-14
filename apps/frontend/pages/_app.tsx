import { AppProps } from 'next/app'
import { theme } from '../configuration/theme'
import { ThemeProvider } from '@mui/material/styles'
import { DefaultSeo } from 'next-seo'
import { CssBaseline } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  ClientToServerEvents,
  ServerToClientEvents,
  Team,
} from '@familiada/shared-interfaces'
import { Hydrate, QueryClientProvider } from 'react-query'
import { queryClient } from '../core/httpClient'
import { io, Socket } from 'socket.io-client'
import { config } from '../configuration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SocketContext } from '../contexts/Socket'
import { SnackbarProvider } from 'notistack'

const { apiUrl } = config

function CustomApp({ Component, pageProps }: AppProps) {
  const [client] = useState(() => queryClient)
  // const
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

    newSocket.on('playerJoined', (player) => {
      const data = client.getQueryData<Team>(['team', player.teamId])
      data.players = [...data.players, player]
      client.setQueryData(['team', player.teamId], data)
    })

    // // update chat on new message dispatched
    // socket.on('message', (message: IMsg) => {
    //   chat.push(message)
    //   setChat([...chat])
    // })

    if (newSocket) {
      return () => newSocket.disconnect()
    }
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
            <ThemeProvider theme={theme}>
              <SnackbarProvider maxSnack={3}>
                <Component {...pageProps} />
                <ReactQueryDevtools />
              </SnackbarProvider>
            </ThemeProvider>
          </SocketContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default CustomApp
