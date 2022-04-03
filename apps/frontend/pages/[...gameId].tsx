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
import { Game, GameId } from '@familiada/shared-interfaces'
import { dehydrate } from 'react-query'
import { checkError } from '../core/errorHandler'
import { useSocketContext } from '../contexts/Socket'
import { useEffect } from 'react'
import { getTeam, useGetTeam } from '../hooks/team'

interface Props {
  game: Game
}
export function GameView({ game }: Props) {
  const { t } = useTranslation()

  const { data: teamRed } = useGetTeam(game.teamRedId)
  const { data: teamBlue } = useGetTeam(game.teamBlueId)
  console.log('~ teamBlue', teamBlue)

  const [isAnswering, toggleIsAnswering] = useToggle()
  const hitAnswerButton = () => {
    toggleIsAnswering()
  }

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

  let game: Game
  if (gameId !== 'favicon.ico') {
    try {
      game = await client.fetchQuery(['game', gameId], () => getGame(gameId))
    } catch (error) {
      const { type } = checkError(error)

      if (type === 'NOT_FOUND') {
        return {
          notFound: true,
        }
      }
    }
    const { teamRedId, teamBlueId } = game

    // TODO fetch these data in parallel
    await client.fetchQuery(['team', teamRedId], () => getTeam(teamRedId))
    await client.fetchQuery(['team', teamBlueId], () => getTeam(teamBlueId))
  }

  return {
    props: {
      game,
      dehydratedState: dehydrate(client),
    },
  }
}

export default GameView
