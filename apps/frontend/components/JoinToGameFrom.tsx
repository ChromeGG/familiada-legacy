import { Game } from '@familiada/shared-interfaces'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from 'react-hook-form-mui'
import { useQueryClient } from 'react-query'
import { useMe } from '../contexts/Me'
import { useJoinToGameMutation } from '../api/game'
import { JoinToGameInput, useJoinToGameForm } from '../validation/game'

interface Props {
  game: Game
}

const JoinToGameFrom = ({ game }: Props) => {
  const { t } = useTranslation()
  const form = useJoinToGameForm()
  const joinToGame = useJoinToGameMutation()
  const client = useQueryClient()
  const { setMe } = useMe()

  const joinToGameHandler = async ({ name, team }: JoinToGameInput) => {
    const teamId = team === 'RED' ? game.teamRedId : game.teamBlueId
    const me = await joinToGame.mutateAsync({ name, teamId })
    client.setQueryData('me', me)
    setMe(me)
  }

  return (
    <FormContainer
      formContext={form}
      handleSubmit={form.handleSubmit(joinToGameHandler)}
    >
      <Card>
        <CardHeader title={t`pick_a_team`} />
        <CardContent>
          <TextFieldElement
            name="name"
            label={t`player_name`}
            fullWidth
            autoComplete="off"
            sx={{ mb: 2 }}
          />
          <RadioButtonGroup
            name="team"
            options={[
              {
                id: 'RED',
                label: t`team_red`,
              },
              {
                id: 'BLUE',
                label: t`team_blue`,
              },
            ]}
          />
        </CardContent>

        <CardActions>
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >{t`join_to_game`}</Button>
        </CardActions>
      </Card>
    </FormContainer>
  )
}

export default JoinToGameFrom
