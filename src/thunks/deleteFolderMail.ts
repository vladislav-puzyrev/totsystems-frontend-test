import { type AppThunk } from '../store'
import { folderMailDeleted } from '../slices/folderSlice'
import { mailDeleted } from '../slices/mailSlice'

interface Arguments {
  folderId: number
  mailId: number
}

export const deleteFolderMail = ({ folderId, mailId }: Arguments): AppThunk => {
  return (dispatch, getState) => {
    dispatch(folderMailDeleted({ folderId, mailId }))

    const state = getState()
    const mailIsUsed = state.folder.items.some((folder) => folder.mailIds.includes(mailId))

    if (mailIsUsed) {
      return
    }

    dispatch(mailDeleted({ mailId }))
  }
}
