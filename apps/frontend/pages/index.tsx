import { useContext, useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Container,
} from '@mui/material'
import io, { Socket } from 'socket.io-client'
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
import {
  JoinToGameFormInput,
  useJoinToGameForm,
} from '../validation/createGame'
import { usePlayerContext } from '../contexts/Player'
import { httpClient } from '../core/httpClient'
import { useRouter } from 'next/router'

export function Index() {
  const { t } = useTranslation()
  const form = useJoinToGameForm()
  const { player, setPlayer } = usePlayerContext()
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(null)
  const router = useRouter()

  const joinToGame = async ({
    gameId,
    team,
    playerName,
  }: JoinToGameFormInput) => {
    console.log('~ gameId, team, playerName', gameId, team, playerName)
    console.log(httpClient.defaults)
    const asd = await httpClient.post('games/create', {
      gameId,
      team,
      playerName,
    })
    console.log('~ data', asd.data)

    // const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    //   `http://${window.location.hostname}:3333`
    // )
    // setSocket(newSocket)
    // // ! NEXT there is newSocket.id, but its undefined at start ..?
    // console.log('~ newSocket', newSocket)
    // console.log('socket ID', newSocket.id)
    // setPlayer({ id: newSocket.id, name: playerName, team })
    // newSocket.on('userJoined', (sth) => {
    //   console.log('userJoined', sth)
    //   // setPlayer((prevPlayers) => [...prevPlayers, sth])
    // })

    // newSocket.emit('join', localUser)
    // setUsers((prevPlayers) => [...prevPlayers, { name, team }])

    // newSocket.on('answer', (sth) => {
    //   console.log('answer', sth)
    //   // setUsers((prevPlayers) => [...prevPlayers, sth])
    // })
  }

  return (
    <Container maxWidth="sm">
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
            <Button type="submit" variant="contained">{t`create_game`}</Button>
            <Button onClick={() => console.log(player)}>XXXX</Button>
          </CardActions>
        </Card>
      </FormContainer>
    </Container>
  )
}

export default Index
