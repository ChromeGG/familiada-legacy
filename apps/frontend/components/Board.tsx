import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
} from '@mui/material'
import Close from 'mdi-material-ui/Close'
import useTranslation from 'next-translate/useTranslation'

const Board = () => {
  // TODO fix fontFamily={`"Press Start 2P"`}
  const { t } = useTranslation()

  const answers = [
    { position: 1, text: 'Lama', score: 45 },
    { position: 2, text: '.......', score: 9 },
  ]

  return (
    <Paper
      sx={{
        bgcolor: 'black',
        borderRadius: 4,
        color: 'greenyellow',
      }}
    >
      <Grid container xs="auto">
        <Grid item xs={12} textAlign="center">
          <Typography fontFamily={`"Press Start 2P"`}>123</Typography>
        </Grid>
        <Grid container item>
          <Grid item xs>
            <Stack>
              <Close />
              <Close />
              <Close />
            </Stack>
          </Grid>
          <Grid item xs={10}>
            <List dense>
              {answers.map((answer) => {
                return (
                  <ListItem
                    key={answer.position}
                    secondaryAction={
                      <Typography fontFamily={`"Press Start 2P"`}>
                        {answer.score}
                      </Typography>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 26 }}>
                      <Typography
                        color="greenyellow"
                        fontFamily={`"Press Start 2P"`}
                      >
                        {answer.position}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography fontFamily={`"Press Start 2P"`}>
                        {answer.text}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                )
              })}
            </List>
            <Typography
              pr={2}
              fontFamily={`"Press Start 2P"`}
              textAlign="right"
              textTransform="uppercase"
            >
              {t`sum`} 67
            </Typography>
          </Grid>
          <Grid item xs>
            <Close />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Board
