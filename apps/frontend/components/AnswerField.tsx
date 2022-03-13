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
} from '@mui/material'
import Close from 'mdi-material-ui/Close'
import useTranslation from 'next-translate/useTranslation'
import { TextFieldElement } from 'react-hook-form-mui'

const AnswerField = () => {
  const { t } = useTranslation()
  return <TextField name="answer" label={t`answer`} autoComplete="off" />
}

export default AnswerField
