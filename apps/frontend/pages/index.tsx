import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Container,
} from '@mui/material'
import { CreateGameDTO } from '@familiada/shared-interfaces'
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from 'react-hook-form-mui'
import useTranslation from 'next-translate/useTranslation'
import { useCreateGameForm } from '../validation/game'
import { useMe } from '../contexts/Me'
import { useRouter } from 'next/router'
import { useCreateGameMutation } from '../api/game'
import { getPlayer } from '../api/player'
import { useQueryClient } from 'react-query'
import { NextSeo } from 'next-seo'

export function Index() {
  const { t } = useTranslation()
  const form = useCreateGameForm()
  const router = useRouter()
  const createGame = useCreateGameMutation()
  const client = useQueryClient()
  const [_, setMe] = useMe()

  const useCreateGameHandler = async ({
    gameName,
    playerTeam,
    playerName,
  }: CreateGameDTO) => {
    const game = await createGame.mutateAsync({
      gameName,
      playerTeam,
      playerName,
    })

    const me = await client.fetchQuery('me', () => getPlayer(game.supervisorId))
    setMe(me)

    router.push(`/${gameName}`)
  }

  return (
    <Container maxWidth="sm">
      <NextSeo title={t`create_game`} />
      <FormContainer
        formContext={form}
        handleSubmit={form.handleSubmit(useCreateGameHandler)}
      >
        <Card>
          <CardHeader title="Familiada" />
          <CardContent>
            <TextFieldElement
              name="playerName"
              label={t`player_name`}
              fullWidth
              autoComplete="off"
            />
            <TextFieldElement
              name="gameName"
              label={t`game_id_name`}
              fullWidth
              autoComplete="off"
              sx={{ my: 3 }}
            />
            <RadioButtonGroup
              label={t`team`}
              name="playerTeam"
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
            <Button type="submit" variant="contained">{t`create_game`}</Button>
          </CardActions>
        </Card>
      </FormContainer>
    </Container>
  )
}

export default Index
