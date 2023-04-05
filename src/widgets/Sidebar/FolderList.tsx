import React, { type FC } from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { type Folder } from '../../slices/folderSlice'
import MailIcon from '@mui/icons-material/Mail'
import { useNavigate, useParams } from 'react-router-dom'

interface Props {
  folders: Folder[]
}

const FolderList: FC<Props> = ({ folders }) => {
  const navigate = useNavigate()
  const params = useParams()
  const folderId = Number(params.folderId)
  const mailId = Number(params.mailId)

  const handleButtonClick = (id: number): () => void => {
    return () => {
      navigate(`/folders/${id}`)
    }
  }

  const isSelected = (id: number): boolean => {
    if (!isNaN(mailId)) {
      return false
    }

    if (isNaN(folderId)) {
      return id === 1
    }

    return folderId === id
  }

  return (
    <List>
      {folders.map((folder) => (
        <ListItem key={folder.id} disablePadding>
          <ListItemButton
            onClick={handleButtonClick(folder.id)}
            selected={isSelected(folder.id)}
          >
            <ListItemIcon>
              <MailIcon/>
            </ListItemIcon>
            <ListItemText primary={folder.name}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default FolderList
