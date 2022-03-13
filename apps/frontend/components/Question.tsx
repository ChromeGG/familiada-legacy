import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
} from '@mui/material'
import Close from 'mdi-material-ui/Close'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { useConditionalEffect } from '@react-hookz/web'

const Question = () => {
  const text = 'Więcej niż jedno zwierze to ...'
  const textChunks = text.split('')

  const [displayed, setDisplayed] = useState('')

  // Lift it up for setting from parent without rerendering?
  const [pushLetters, setPushLetters] = useState(true)

  function* generateText() {
    for (const char of textChunks) {
      yield char
    }
  }

  const gen = generateText()

  useConditionalEffect(
    () => {
      const interval = setInterval(() => {
        const res = gen.next()
        if (res.done) {
          setPushLetters(() => true)
          return
        }
        setDisplayed((prev) => prev + res.value)
      }, 150)

      return () => {
        clearInterval(interval)
      }
    },
    [],
    [pushLetters]
  )

  return <Typography variant="h6">{displayed}</Typography>
}

export default Question
