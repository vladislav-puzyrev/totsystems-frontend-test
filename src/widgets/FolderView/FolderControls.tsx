import React, { type ChangeEvent, type FC, useEffect, useState } from 'react'
import { Box, Button, MenuItem, type SelectChangeEvent, TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import Select from '@mui/material/Select'
import { folderMailMoved, folderUpdated } from '../../slices/folderSlice'
import { folderSelector } from '../../selectors/folderSelector'
import { otherFoldersSelector } from '../../selectors/otherFoldersSelector'
import { deleteFolderMail } from '../../thunks/deleteFolderMail'
import { deleteFolder } from '../../thunks/deleteFolder'

interface Props {
  selectedMailIds: number[]
  setSelectedMailIds: (selectedMailIds: number[]) => void
  mailsSearchTerm: string
  setMailsSearchTerm: (mailsSearchTerm: string) => void
}

const FolderControls: FC<Props> = ({ selectedMailIds, setSelectedMailIds, mailsSearchTerm, setMailsSearchTerm }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const folderId = Number(params.folderId ?? '1')
  const folder = useAppSelector((state) => folderSelector(state, { folderId }))
  const otherFolders = useAppSelector((state) => otherFoldersSelector(state, { folderId }))

  const firstFolderId = otherFolders[0].id
  const [toFolderId, setToFolderId] = useState(firstFolderId)
  const [folderName, setFolderName] = useState('')

  useEffect(() => {
    setToFolderId(firstFolderId)
    setFolderName('')
    setSelectedMailIds([])
    setMailsSearchTerm('')
  }, [firstFolderId, setMailsSearchTerm, setSelectedMailIds, folderId])

  if (
    (folder == null) ||
    (!folder.custom && folder.mailIds.length === 0)
  ) {
    return null
  }

  const handleSelectChange = (event: SelectChangeEvent): void => {
    setToFolderId(+event.target.value)
  }

  const handleMovedButton = (): void => {
    selectedMailIds.forEach((mailId) => {
      dispatch(folderMailMoved({ fromFolderId: folderId, toFolderId, mailId }))
    })
    setSelectedMailIds([])
    setMailsSearchTerm('')
  }

  const handleFolderRemove = (): void => {
    navigate('/', { replace: true })
    dispatch(deleteFolder({ folderId }))
  }

  const handleMailsRemove = (): void => {
    selectedMailIds.forEach((id) => {
      dispatch(deleteFolderMail({ folderId, mailId: id }))
    })
    setSelectedMailIds([])
    setMailsSearchTerm('')
  }

  const handleFolderRename = (): void => {
    const processedName = (folderName === '') ? 'Без имени' : folderName
    dispatch(folderUpdated({ folderId, payloadFolder: { name: processedName } }))
    setFolderName('')
  }

  const handleTermChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFolderName((event.target.value))
  }

  const fieldWith = 200

  return (
    <Box sx={{ mb: 2 }}>
      {(folder.mailIds.length > 0) && (
        <TextField
          fullWidth
          label="Поиск писем"
          variant="standard"
          value={mailsSearchTerm}
          onChange={(event) => { setMailsSearchTerm((event.target.value)) }}
        />
      )}
      {folder.custom && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <TextField
            sx={{ width: fieldWith }}
            label="Имя папки"
            variant="filled"
            value={folderName}
            onChange={handleTermChange}
          />
          <Button
            onClick={handleFolderRename}
            variant="contained"
            sx={{ ml: 2, minWidth: fieldWith }}
          >
            Переименовать
          </Button>
          <Button
            onClick={handleFolderRemove}
            color="error"
            variant="contained"
            sx={{ ml: 2, minWidth: fieldWith }}
          >
            Удалить папку
          </Button>
        </Box>
      )}
      {(selectedMailIds.length > 0) && (
        <Box sx={{ mt: 2 }}>
          <Select
            sx={{ width: fieldWith }}
            value={String(toFolderId)}
            onChange={handleSelectChange}
          >
            {otherFolders.map((folder) => (
              <MenuItem key={folder.id} value={folder.id}>{folder.name}</MenuItem>
            ))}
          </Select>
          <Button
            onClick={handleMovedButton}
            variant="contained"
            sx={{ ml: 2, minWidth: fieldWith }}
          >
            Переместить
          </Button>
          <Button
            onClick={handleMailsRemove}
            color="error"
            variant="contained"
            sx={{ ml: 2, minWidth: fieldWith }}
          >
            Удалить письма
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default FolderControls
