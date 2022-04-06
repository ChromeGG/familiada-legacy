import type { Translate } from 'next-translate'

import axios from 'axios'
import { is, isNil } from 'ramda'

// TODO We need test it!

export const errorMessagesMap = {
  UNEXPECTED_ERROR: 'Unexpected error occurred. Please contact Support.',
  CONNECTION_FAILURE: 'Internet connection error. Check your wires!',
  FORBIDDEN: 'Access to this resource is forbidden.',
  NOT_FOUND: "Broken link. The page you're trying to access doesn't exist.",
  TIMEOUT: 'This resource is no longer available.',
  SYSTEM_FAILURE: "Something is wrong, but we're working on it!",
  UNAUTHORIZED: 'Authorization required.',
}

const HTTPStatusCodeToErrorMessageMap: {
  [code in number]?: keyof typeof errorMessagesMap
} = {
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  410: 'TIMEOUT',
  500: 'SYSTEM_FAILURE',
}

interface ErrorMessage {
  type: keyof typeof errorMessagesMap
}

const getErrorMessageByHTTPStatusCode = (statusCode: number) => {
  return HTTPStatusCodeToErrorMessageMap[statusCode]
}

export const checkError = (error: unknown): ErrorMessage => {
  if (!(error instanceof Error)) {
    return { type: 'UNEXPECTED_ERROR' }
  }

  if (error instanceof TypeError) {
    return { type: 'UNEXPECTED_ERROR' }
  }

  if (axios.isAxiosError(error)) {
    const messageType = getErrorMessageByHTTPStatusCode(error.response.status)
    if (messageType) {
      return { type: messageType }
    }
  }

  return { type: 'UNEXPECTED_ERROR' }
}

// use it if we need obtain messaged based on type
export const getErrorMessage = (errMessage: ErrorMessage) =>
  errorMessagesMap[errMessage.type]

export type ErrorMessageKey = keyof typeof errorMessagesMap
