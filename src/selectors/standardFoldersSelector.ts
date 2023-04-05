import { createSelector } from '@reduxjs/toolkit'
import { foldersSelector } from '../slices/folderSlice'

export const standardFoldersSelector = createSelector([foldersSelector], (folders) => {
  return folders.filter((folder) => !folder.custom)
})
