import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Stack,
} from '@mui/material'
import Board from '../components/Board'
import PlayersList from '../components/PlayersList'
import Question from '../components/Question'
import AnswerField from '../components/AnswerField'
import { Team } from '../interfaces'
import useTranslation from 'next-translate/useTranslation'

export function Index() {
  const { t } = useTranslation()
  const teamRed: Team = {
    score: 0,
    players: [
      { id: '1', name: 'Adam' },
      { id: '2', name: 'Bartek' },
    ],
    color: 'RED',
  }
  const teamBlue: Team = {
    score: 0,
    players: [{ id: '1', name: 'Jan' }],
    color: 'BLUE',
  }

  return (
    <Stack>
      <Board />
      <Question />
      <Button variant="contained">{t`answer_to_question`}!</Button>
      <AnswerField />
      <Grid container item xs={12} p={2} spacing={2}>
        <Grid item xs={6}>
          <PlayersList team={teamRed} />
        </Grid>
        <Grid item xs={6}>
          <PlayersList team={teamBlue} />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Index
