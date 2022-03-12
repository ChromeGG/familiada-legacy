import {
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { TEAM } from '@familiada/shared-interfaces'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { useEffect } from 'react'

interface Props {
  onJoin: (data: FormInput) => void
}

export interface FormInput {
  gameId: string
  name: string
  team: TEAM
}

const schema = Joi.object({
  gameId: Joi.string().min(3).max(12).required(),
  name: Joi.string().required(),
  team: Joi.string().valid('RED', 'BLUE'),
})

const defaultValues: FormInput = {
  gameId: '',
  name: '',
  team: 'RED',
}

const JoinToGame = ({ onJoin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onJoin(data)
  }

  useEffect(() => {
    console.log(isValid)
  }, [isValid])

  return (
    <Card sx={{ m: 4, p: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="Familiada" />
        <CardContent>
          <Stack spacing={2}>
            <Controller
              name="gameId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Game ID"
                  variant="outlined"
                  error={!!errors.gameId}
                  helperText={errors.gameId ? errors.gameId?.message : ''}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name?.message : ''}
                />
              )}
            />
            {/* <TextField label="User name" /> */}

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="RED"
                control={<Radio />}
                label="Team RED"
              />
              <FormControlLabel
                value="BLUE"
                control={<Radio />}
                label="Team BLUE"
              />
            </RadioGroup>
          </Stack>
        </CardContent>
        <CardActions>
          <Button variant="contained" type="submit">
            Join to Game
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default JoinToGame
