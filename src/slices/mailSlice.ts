import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'
import { MAILS } from '../data/mails'

export interface Mail {
  id: number
  author: string
  subject: string
  message: string
  createdDate: string
  readDate: string | null
}

export type PayloadMail = Omit<Mail, 'id' | 'createdDate' | 'readDate'>

const initialState = {
  items: MAILS
}

const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    mailCreated (state, action: PayloadAction<{ payloadMail: PayloadMail }>) {
      const { payloadMail } = action.payload
      const date = new Date()

      state.items.push({
        id: state.items.length + 1,
        ...payloadMail,
        createdDate: date.toISOString(),
        readDate: null
      })
    },
    mailBeenRead (state, action: PayloadAction<{ mailId: number }>) {
      const { mailId } = action.payload
      const date = new Date()

      state.items = state.items.map((mail) => {
        return (mail.id === mailId)
          ? {
              ...mail,
              readDate: (mail.readDate == null) ? date.toISOString() : mail.readDate
            }
          : mail
      })
    },
    mailUpdated (state, action: PayloadAction<{ mailId: number, payloadMail: PayloadMail }>) {
      const { mailId, payloadMail } = action.payload

      state.items = state.items.map((mail) => {
        return (mail.id === mailId)
          ? { ...mail, ...payloadMail }
          : mail
      })
    },
    mailDeleted (state, action: PayloadAction<{ mailId: number }>) {
      const { mailId } = action.payload
      state.items = state.items.filter((mail) => (mail.id !== mailId))
    }
  }
})

export const mailsSelector = (state: RootState): Mail[] => state.mail.items
export const { mailCreated, mailBeenRead, mailUpdated, mailDeleted } = mailSlice.actions
export const mailReducer = mailSlice.reducer
