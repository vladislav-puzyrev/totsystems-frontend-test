import { createSelector } from '@reduxjs/toolkit'
import { foldersSelector } from '../slices/folderSlice'
import { mailsSelector } from '../slices/mailSlice'
import { type RootState } from '../store'

interface Arguments {
  folderId: number
}

export const folderMailsSelector = createSelector(
  [
    (state: RootState, { folderId }: Arguments) => folderId,
    foldersSelector,
    mailsSelector
  ],
  (folderId, folders, mails) => {
    const folder = folders.find((folder) => folder.id === folderId)
    return mails.filter((mail) => folder?.mailIds.includes(mail.id))
  }
)
