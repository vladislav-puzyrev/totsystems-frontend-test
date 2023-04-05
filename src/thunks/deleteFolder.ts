import { type AppThunk } from '../store'
import { folderDeleted } from '../slices/folderSlice'
import { mailDeleted } from '../slices/mailSlice'

interface Arguments {
  folderId: number
}

export const deleteFolder = ({ folderId }: Arguments): AppThunk => {
  return (dispatch, getState) => {
    const state = getState()
    const folder = state.folder.items.find((folder) => folder.id === folderId)

    if (folder == null) {
      return
    }

    dispatch(folderDeleted({ folderId }))
    const newState = getState()

    folder.mailIds.forEach((mailId) => {
      const mailIsUsed = newState.folder.items.some((folder) => folder.mailIds.includes(mailId))

      if (mailIsUsed) {
        return
      }

      dispatch(mailDeleted({ mailId }))
    })
  }
}
