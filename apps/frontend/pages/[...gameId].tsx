import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import Board from '../components/Board'
import PlayersList from '../components/PlayersList'
import { Team } from '../interfaces'

export function Index() {
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
    <>
      <Grid container item xs={12} p={2} spacing={2}>
        <Grid item xs={6}>
          <PlayersList team={teamRed} />
        </Grid>
        <Grid item xs={6}>
          <PlayersList team={teamBlue} />
        </Grid>
      </Grid>

      <Board />
    </>
  )
}

export default Index
