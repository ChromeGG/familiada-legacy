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
import { useToggle } from '@react-hookz/web'

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

  const [isAnswering, toggleIsAnswering] = useToggle(false)
  const hitAnswerButton = () => {
    toggleIsAnswering(true)
  }

  return (
    <Grid container spacing={2} p={1}>
      <Grid item xs={12}>
        <Board />
      </Grid>
      <Grid item xs={12}>
        <Question />
      </Grid>
      <Grid item xs={12}>
        {isAnswering ? (
          <AnswerField />
        ) : (
          <Button variant="contained" onClick={hitAnswerButton}>
            {t`answer_to_question`}!
          </Button>
        )}
      </Grid>
      <Grid container item xs={12} p={2} spacing={2}>
        <Grid item xs={6}>
          <PlayersList team={teamRed} />
        </Grid>
        <Grid item xs={6}>
          <PlayersList team={teamBlue} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Index
