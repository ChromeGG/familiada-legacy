import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { Team } from '../interfaces'

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
            return (
              <ListItem key={player.name}>
                <ListItemText>{player.name}</ListItemText>
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}

export default PlayersList
