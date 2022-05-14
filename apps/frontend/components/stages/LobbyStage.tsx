import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { config } from '../../configuration'
import { useSnackbar } from 'notistack'
import useTranslation from 'next-translate/useTranslation'

const { frontendUrl } = config

const LobbyStage = () => {
  const { asPath } = useRouter()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const invitationLink = `${frontendUrl}${asPath}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    enqueueSnackbar(t`invitation_link_has_been_copied`, {
      variant: 'success',
      preventDuplicate: true,
    })
  }

  return (
    <Card>
      <CardHeader
        title="Udostępnij tę rozgrywkę:"
        titleTypographyProps={{ textAlign: 'center' }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            defaultValue={invitationLink}
            InputProps={{
              readOnly: true,
            }}
            onClick={() => copyToClipboard(invitationLink)}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default LobbyStage
