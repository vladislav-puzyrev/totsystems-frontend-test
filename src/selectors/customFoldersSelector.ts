import { createSelector } from '@reduxjs/toolkit'
import { foldersSelector } from '../slices/folderSlice'

export const customFoldersSelector = createSelector([foldersSelector], (folders) => {
  return folders.filter((folder) => folder.custom)
})
