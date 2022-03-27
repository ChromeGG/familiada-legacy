import { useState } from 'react'
import {
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  Box,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import io, { Socket } from 'socket.io-client'
import Script from 'next/script'
import axios, { AxiosResponse } from 'axios'
import {
  ClientToServerEvents,
  ServerToClientEvents,
  Player,
} from '@familiada/shared-interfaces'
import JoinToGame, { FormInput } from '../components/JoinToGame'

export function Index() {
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(null)
  const [user, setUser] = useState<Player>(null)
  const [users, setUsers] = useState<Player[]>([])
  const [debug, setDebug] = useState(null)

  const connect = ({ gameId, name, team }: FormInput) => {
    // POTEM OGARNĄĆ TEN SYF NA DOLE
    const localUser = { name, team }
    setDebug({ gameId, name, team })
    setUser(localUser)
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `http://${window.location.hostname}:3333`
    )
    setSocket(newSocket)
    console.log('socket ID', newSocket.id)

    newSocket.on('userJoined', (sth) => {
      console.log('userJoined', sth)
      setUsers((prevUsers) => [...prevUsers, sth])
    })

    newSocket.emit('join', localUser)
    // setUsers((prevUsers) => [...prevUsers, { name, team }])

    // newSocket.on('answer', (sth) => {
    //   console.log('answer', sth)
    //   // setUsers((prevUsers) => [...prevUsers, sth])
    // })
  }

  const sendEvent = () => {
    socket.emit('findAllUsers', { answer: 'abc' })
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {debug && JSON.stringify(debug, null, 2)}
      <JoinToGame onJoin={connect} />

      {!!users.length && (
        <Card sx={{ m: 4, p: 4 }}>
          <CardHeader title={`List of users of game ?`} />
          <CardContent>
            <List>
              {users.map(({ name }) => {
                return (
                  <ListItem key={name}>
                    <ListItemText>{name}</ListItemText>
                  </ListItem>
                )
              })}
            </List>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={sendEvent}>
              SEND EVENT
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  )
}

export default Index
