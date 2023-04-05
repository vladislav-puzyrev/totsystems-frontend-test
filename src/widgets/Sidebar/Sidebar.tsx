import React, { type FC, useState } from 'react'
import { Button, Divider, Drawer, Toolbar, Typography } from '@mui/material'
import { persistor, useAppSelector } from '../../store'
import FolderList from './FolderList'
import { standardFoldersSelector } from '../../selectors/standardFoldersSelector'
import { customFoldersSelector } from '../../selectors/customFoldersSelector'
import FolderModal from './FolderModal'
import { useNavigate } from 'react-router-dom'

interface Props {
  drawerWidth: number
}

const Sidebar: FC<Props> = ({ drawerWidth }) => {
  const navigate = useNavigate()
  const standardFolders = useAppSelector(standardFoldersSelector)
  const customFolders = useAppSelector(customFoldersSelector)
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalClick = (): void => {
    setModalOpen(true)
  }

  const handleCleanClick = (): void => {
    const clean = async (): Promise<void> => {
      persistor.pause()
      await persistor.flush()
      await persistor.purge()
      navigate('/', { replace: true })
      location.reload()
    }

    void clean()
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': { width: drawerWidth }
      }}
      variant="permanent"
    >
      <Toolbar>
        <Typography variant="button" component="div">
          Ваши папки
        </Typography>
      </Toolbar>
      <Divider/>
      {(standardFolders.length > 0) && (
        <>
          <FolderList folders={standardFolders}/>
          <Divider/>
        </>
      )}
      {(customFolders.length > 0) && (
        <>
          <FolderList folders={customFolders}/>
          <Divider/>
        </>
      )}
      <Button
        onClick={handleModalClick}
        variant="contained"
        sx={{ m: 2 }}
      >
        Добавить папку
      </Button>
      <Button
        onClick={handleCleanClick}
        variant="contained"
        sx={{ m: 2, mt: 0 }}
      >
        Сбросить кеш
      </Button>
      <FolderModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </Drawer>
  )
}

export default Sidebar
