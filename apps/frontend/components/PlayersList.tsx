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

interface Props {
  team: Team
}

const PlayersList = ({ team }: Props) => {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader title={team.color === 'RED' ? t`team_red` : t`team_blue`} />
      <CardContent>
        <List>
          {team.players.map((player) => {
            const isSupervisor = false // = player.id === me2?.id
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
