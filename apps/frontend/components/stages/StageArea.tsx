import { Game } from '@familiada/shared-interfaces'
import AnswerStage from './AnswerStage'
import LobbyStage from './LobbyStage'
import SummaryStage from './SummaryStage'

interface Props {
  game: Game
}

const StageArea = ({ game }: Props) => {
  // const { data } = useGetGame()

  if (game.status === 'LOBBY') {
    return <LobbyStage />
  }

  if (game.status === 'RUNNING') {
    return <AnswerStage />
  }

  return <SummaryStage />
}

export default StageArea
