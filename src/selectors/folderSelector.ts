import { createSelector } from '@reduxjs/toolkit'
import { foldersSelector } from '../slices/folderSlice'
import { type RootState } from '../store'

interface Arguments {
  folderId: number
}

export const folderSelector = createSelector(
  [
    (state: RootState, { folderId }: Arguments) => folderId,
    foldersSelector
  ],
  (folderId, folders) => {
    return folders.find((folder) => folder.id === folderId)
  }
)
