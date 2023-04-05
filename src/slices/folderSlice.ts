import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'
import { FOLDERS } from '../data/folders'

export interface Folder {
  id: number
  name: string
  mailIds: number[]
  custom: boolean
}

export type PayloadFolder = Omit<Folder, 'id' | 'mailIds' | 'custom'>

const initialState = {
  items: FOLDERS
}

export const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    folderCreated (state, action: PayloadAction<{ payloadFolder: PayloadFolder }>) {
      const { payloadFolder } = action.payload

      state.items.push({
        id: state.items.length + 1,
        ...payloadFolder,
        mailIds: [],
        custom: true
      })
    },
    folderMailMoved (state, action: PayloadAction<{ fromFolderId: number, toFolderId: number, mailId: number }>) {
      const { fromFolderId, toFolderId, mailId } = action.payload

      state.items = state.items.map((folder) => {
        if (folder.id === fromFolderId) {
          return { ...folder, mailIds: folder.mailIds.filter((id) => id !== mailId) }
        }

        if (folder.id === toFolderId) {
          return { ...folder, mailIds: [...folder.mailIds, mailId] }
        }

        return folder
      })
    },
    folderMailDeleted (state, action: PayloadAction<{ folderId: number, mailId: number }>) {
      const { folderId, mailId } = action.payload

      state.items = state.items.map((folder) => {
        return (folder.id === folderId)
          ? { ...folder, mailIds: folder.mailIds.filter((id) => id !== mailId) }
          : folder
      })
    },
    folderUpdated (state, action: PayloadAction<{ folderId: number, payloadFolder: PayloadFolder }>) {
      const { folderId, payloadFolder } = action.payload

      state.items = state.items.map((folder) => {
        return (folder.id === folderId)
          ? { ...folder, ...payloadFolder }
          : folder
      })
    },
    folderDeleted (state, action: PayloadAction<{ folderId: number }>) {
      const { folderId } = action.payload
      state.items = state.items.filter((folder) => (folder.id !== folderId))
    }
  }
})

export const foldersSelector = (state: RootState): Folder[] => state.folder.items
export const { folderCreated, folderMailMoved, folderMailDeleted, folderUpdated, folderDeleted } = folderSlice.actions
export const folderReducer = folderSlice.reducer
