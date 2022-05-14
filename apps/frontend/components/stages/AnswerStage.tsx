import { Button } from '@mui/material'
import { useToggle } from '@react-hookz/web'
import React from 'react'
import AnswerField from '../AnswerField'
import Question from '../Question'

const AnswerStage = () => {
  const [isAnswering, toggleIsAnswering] = useToggle()
  const hitAnswerButton = () => {
    toggleIsAnswering()
  }
  return (
    <div>
      <Question />
      {isAnswering ? (
        <AnswerField />
      ) : (
        <Button variant="contained" onClick={hitAnswerButton}>
          {t`answer_to_question`}!
        </Button>
      )}
    </div>
  )
}

export default AnswerStage
