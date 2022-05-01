import { GameId } from '@familiada/shared-interfaces'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React from 'react'
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from 'react-hook-form-mui'
import { useJoinToGameMutation } from '../hooks/game'
import { JoinToGameInput, useJoinToGameForm } from '../validation/game'

interface Props {
  game: any
}

const JoinToGameFrom = ({ game }: Props) => {
  const { t } = useTranslation()
  const form = useJoinToGameForm()
  const joinToGame = useJoinToGameMutation()

  const joinToGameHandler = async ({ name, team }: JoinToGameInput) => {
    const teamId = team === 'RED' ? game.teamRedId : game.teamBlueId
    console.time('joinToGame')
    await joinToGame.mutateAsync({ name, teamId })
    console.timeEnd('joinToGame')
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
