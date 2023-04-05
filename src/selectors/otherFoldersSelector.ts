import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '../store'
import { foldersSelector } from '../slices/folderSlice'

interface Arguments {
  folderId: number
}

export const otherFoldersSelector = createSelector(
  [
    (state: RootState, { folderId }: Arguments) => folderId,
    foldersSelector
  ],
  (folderId, folders) => {
    return folders.filter((folder) => folder.id !== folderId)
  }
)
