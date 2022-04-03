import { Grid, Button, Container } from '@mui/material'
import Board from '../components/Board'
import PlayersList from '../components/PlayersList'
import Question from '../components/Question'
import AnswerField from '../components/AnswerField'
import { Team } from '../interfaces'
import useTranslation from 'next-translate/useTranslation'
import { useToggle } from '@react-hookz/web'
import { GetServerSideProps } from 'next'
import { queryClient } from '../core/httpClient'
import { getGame, useGetGame } from '../hooks/game'
import { GameId } from '@familiada/shared-interfaces'
import { dehydrate } from 'react-query'
import { checkError } from '../core/errorHandler'

export function GameView() {
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

  const { data } = useGetGame('qwe')
  console.log('~ data', data)

  return (
    <Container maxWidth="xl" disableGutters>
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
        <Grid item container xs={12} p={2} spacing={2}>
          <Grid item xs={6}>
            <PlayersList team={teamRed} />
          </Grid>
          <Grid item xs={6}>
            <PlayersList team={teamBlue} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { gameId: gameIdParam } = ctx.params
  const gameId = gameIdParam[0] as GameId

  const client = queryClient

  if (gameId !== 'favicon.ico') {
    try {
      await client.fetchQuery(['game', gameId], () => getGame(gameId))
    } catch (error) {
      const { type } = checkError(error)

      if (type === 'NOT_FOUND') {
        return {
          notFound: true,
        }
      }
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  }
}

export default GameView
