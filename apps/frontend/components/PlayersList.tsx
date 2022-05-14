import { Team } from '@familiada/shared-interfaces'
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { ShieldCrownOutline } from 'mdi-material-ui'
import { useGame } from '../api/game'

interface Props {
  team: Team
}

const PlayersList = ({ team }: Props) => {
  const { t } = useTranslation()
  const game = useGame()

  return (
    <Card>
      <CardHeader title={team.color === 'RED' ? t`team_red` : t`team_blue`} />
      <CardContent>
        <List>
          {team.players.map((player) => {
            const isSupervisor = player.id === game.supervisorId
            return (
              <ListItem key={player.name}>
                <ListItemText>
                  {player.name} {isSupervisor && <ShieldCrownOutline />}
                </ListItemText>
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}

export default PlayersList
