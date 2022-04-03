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

const { apiUrl } = config

function CustomApp({ Component, pageProps }: AppProps) {
  const [client] = useState(() => queryClient)
  const [player, setPlayer] = useState<Player>(null)
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(null)
  //   useState<Socket<ServerToClientEvents, ClientToServerEvents>>(null)
  // const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  //   `http://${window.location.hostname}:3333`
  // )
  // setSocket(newSocket)
  // const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  //   `http://${window.location.hostname}:3333`
  // )
  // setSocket(newSocket)
  // const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  //   `http://${window.location.hostname}:3333`
  // )
  // setSocket(newSocket)
  // setSocket(newSocket)
  // console.log('~ newSocket', newSocket)
  // console.log('socket ID', newSocket.id)
  // setPlayer({ id: newSocket.id, name: playerName, team })
  // newSocket.on('userJoined', (sth) => {
  //   console.log('userJoined', sth)
  //   // setPlayer((prevPlayers) => [...prevPlayers, sth])
  // })

  useEffect((): any => {
    // connect to socket server
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `${apiUrl}`
    )
    setSocket(newSocket)
    // log socket connection
    newSocket.on('connect', () => {
      console.log('SOCKET CONNECTED!', newSocket.id)
    })

    // // update chat on new message dispatched
    // socket.on('message', (message: IMsg) => {
    //   chat.push(message)
    //   setChat([...chat])
    // })

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect()
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
