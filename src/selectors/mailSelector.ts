import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '../store'
import { mailsSelector } from '../slices/mailSlice'

interface Arguments {
  mailId: number
}

export const mailSelector = createSelector(
  [
    (state: RootState, { mailId }: Arguments) => mailId,
    mailsSelector
  ],
  (mailId, mails) => {
    return mails.find((mail) => mail.id === mailId)
  }
)
