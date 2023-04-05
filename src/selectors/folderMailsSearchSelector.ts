import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '../store'
import { folderMailsSelector } from './folderMailsSelector'

interface Arguments {
  folderId: number
  term: string
}

export const folderMailsSearchSelector = createSelector(
  [
    (state: RootState, { term }: Arguments) => term,
    (state: RootState, { folderId }: Arguments) => folderMailsSelector(state, { folderId })
  ],
  (term, mails) => {
    const termLowerCase = term.toLowerCase()

    return mails.filter((mail) => {
      return mail.author.toLowerCase().includes(termLowerCase) ||
        mail.subject.toLowerCase().includes(termLowerCase) ||
        mail.message.toLowerCase().includes(termLowerCase)
    })
  }
)
