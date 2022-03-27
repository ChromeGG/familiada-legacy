import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  TextField,
  Button,
} from '@mui/material'
import Close from 'mdi-material-ui/Close'
import useTranslation from 'next-translate/useTranslation'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { AnswerFormInput, useAnswerForm } from '../validation/answer'

const AnswerField = () => {
  const { t } = useTranslation()
  const form = useAnswerForm()

  const answerForQuestion = (answer: AnswerFormInput) => {
    console.log(answer)
  }
  return (
    <FormContainer
      formContext={form}
      handleSubmit={form.handleSubmit(answerForQuestion)}
    >
      <TextFieldElement name="answer" label={t`answer`} autoComplete="off" />
    </FormContainer>
  )
}

export default AnswerField
