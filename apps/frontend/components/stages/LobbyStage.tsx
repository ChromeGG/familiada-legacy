import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { config } from '../../configuration'
import { useSnackbar } from 'notistack'
import useTranslation from 'next-translate/useTranslation'
import { useSocket } from '../../contexts/Socket'
import { useMe } from '../../contexts/Me'
import { useGame } from '../../api/game'

const { frontendUrl } = config

const LobbyStage = () => {
  const { asPath } = useRouter()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [me] = useMe()
  const game = useGame()
  const invitationLink = `${frontendUrl}${asPath}`

  const { socket } = useSocket()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    enqueueSnackbar(t`invitation_link_has_been_copied`, {
      variant: 'success',
      preventDuplicate: true,
    })
  }

  const startGame = () => {
    socket.emit('startGame', me, game.id)
  }

  const isSupervisor = me?.id === game.supervisorId

  return (
    <Card>
      <CardHeader
        title="Udostępnij tę rozgrywkę:"
        titleTypographyProps={{ textAlign: 'center' }}
      />
      <CardContent>
        <Stack gap={2}>
          <TextField
            defaultValue={invitationLink}
            InputProps={{
              readOnly: true,
            }}
            onClick={() => copyToClipboard(invitationLink)}
          />
          {isSupervisor ? (
            <Button
              variant="contained"
              onClick={() => startGame()}
            >{t`start_game`}</Button>
          ) : (
            <Typography>{t`waiting_for_the_game_to_start_by_the_administrator`}</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LobbyStage
