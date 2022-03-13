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
  Grid,
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
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from 'react-hook-form-mui'
import useTranslation from 'next-translate/useTranslation'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  JoinToGameFormInput,
  useJoinToGameForm,
} from '../validation/joinToGame'
import PlayersList from '../components/PlayersList'
import { Team } from '../interfaces'

export function Index() {
  const { t } = useTranslation()
  const form = useJoinToGameForm()
  const [player, setPlayer] = useState<Player>(null)
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(null)

  const joinToGame = async ({
    gameId,
    team,
    playerName,
  }: JoinToGameFormInput) => {
    // POTEM OGARNĄĆ TEN SYF NA DOLE
    // const localUser = { name, team }
    // setDebug({ gameId, name, team })
    // setUser(localUser)
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `http://${window.location.hostname}:3333`
    )
    setSocket(newSocket)
    console.log('socket ID', newSocket.id)

    newSocket.on('userJoined', (sth) => {
      console.log('userJoined', sth)
      setPlayer((prevPlayers) => [...prevPlayers, sth])
    })

    // newSocket.emit('join', localUser)
    // setUsers((prevPlayers) => [...prevPlayers, { name, team }])

    // newSocket.on('answer', (sth) => {
    //   console.log('answer', sth)
    //   // setUsers((prevPlayers) => [...prevPlayers, sth])
    // })
  }

  const connect = ({ gameId, name, team }: FormInput) => {
    // POTEM OGARNĄĆ TEN SYF NA DOLE
    const localUser = { name, team }
    // setDebug({ gameId, name, team })
    // setUser(localUser)
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `http://${window.location.hostname}:3333`
    )
    setSocket(newSocket)
    console.log('socket ID', newSocket.id)

    // newSocket.on('userJoined', (sth) => {
    //   console.log('userJoined', sth)
    //   setUsers((prevPlayers) => [...prevPlayers, sth])
    // })

    newSocket.emit('join', localUser)
    // setUsers((prevPlayers) => [...prevPlayers, { name, team }])

    // newSocket.on('answer', (sth) => {
    //   console.log('answer', sth)
    //   // setUsers((prevPlayers) => [...prevPlayers, sth])
    // })
  }

  return (
    <Grid container>
      <Grid item xs={12} m={2}>
        <FormContainer
          formContext={form}
          handleSubmit={form.handleSubmit(joinToGame)}
        >
          <Card>
            <CardHeader title="Familiada" />
            <CardContent>
              <TextFieldElement
                name="playerName"
                label={t`player_name`}
                fullWidth
                autoComplete="off"
              />
              <TextFieldElement
                name="gameId"
                label={t`game_id`}
                fullWidth
                autoComplete="off"
                sx={{ my: 3 }}
              />
              <RadioButtonGroup
                label={t`team`}
                name="team"
                options={[
                  {
                    id: 'RED',
                    label: t`team_red`,
                  },
                  {
                    id: 'BLUE',
                    label: t`team_blue`,
                  },
                ]}
              />
            </CardContent>

            <CardActions>
              <Button
                type="submit"
                variant="contained"
              >{t`join_to_game`}</Button>
            </CardActions>
          </Card>
        </FormContainer>
      </Grid>
    </Grid>
  )
}

export default Index
