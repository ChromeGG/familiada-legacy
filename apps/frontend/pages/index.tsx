import { useState } from 'react'
import {
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  Box,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material'
import io, { Socket } from 'socket.io-client'
import Script from 'next/script'
import axios, { AxiosResponse } from 'axios'
import {
  ClientToServerEvents,
  ServerToClientEvents,
  User,
} from '@familiada/shared-interfaces'
import JoinToGame, { FormInput } from '../components/JoinToGame'
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from 'react-hook-form-mui'
import useTranslation from 'next-translate/useTranslation'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  JoinToGameFormInput,
  useJoinToGameForm,
} from '../validation/joinToGame'

export function Index() {
  const { t } = useTranslation()

  const form = useJoinToGameForm()

  const joinToGame = async (formData: JoinToGameFormInput) => {
    console.log(formData)
  }

  return (
    <Grid container>
      <Grid item xs={12} md={8} lg={4}>
        <FormContainer
          formContext={form}
          handleSubmit={form.handleSubmit(joinToGame)}
        >
          <Card>
            <CardHeader title="Familiada" />
            <CardContent>
              <TextFieldElement
                name="name"
                label={t`name`}
                fullWidth
                autoComplete="off"
              />
              <TextFieldElement
                name="gameId"
                label={t`gameId`}
                fullWidth
                autoComplete="off"
              />
              <RadioButtonGroup
                label={t`team`}
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
              >{t`join_to_game`}</Button>
            </CardActions>
          </Card>
        </FormContainer>
      </Grid>
    </Grid>
  )
}

export default Index
