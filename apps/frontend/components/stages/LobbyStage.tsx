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

const { frontendUrl } = config

const LobbyStage = () => {
  const { asPath } = useRouter()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
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
    socket.emit('startGame', 'start')
    // ! next: jakiś sposób na przekazywanie usera pomiędzy serwerem a klientem
    // emit that game will start soon
  }

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
          <Button
            variant="contained"
            onClick={() => startGame()}
          >{t`start_game`}</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LobbyStage
