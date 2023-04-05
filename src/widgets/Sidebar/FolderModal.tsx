import React, { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useAppDispatch } from '../../store'
import { folderCreated } from '../../slices/folderSlice'

interface Props {
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void
}

const FolderModal: FC<Props> = ({ modalOpen, setModalOpen }) => {
  const dispatch = useAppDispatch()
  const [folderName, setFolderName] = useState('')
  const input = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      input.current?.focus()
    })
  }, [modalOpen])

  const handleInputChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFolderName(event.target.value)
  }

  const handleModalClose = (): void => {
    setModalOpen(false)
    setFolderName('')
  }

  const handleButtonClick = (): void => {
    const processedName = (folderName === '') ? 'Без имени' : folderName
    dispatch(folderCreated({ payloadFolder: { name: processedName } }))
    handleModalClose()
  }

  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h6" component="div">
            Создайте новую папку
          </Typography>
          <TextField
            inputRef={input}
            label="Имя папки"
            variant="standard"
            value={folderName}
            onChange={handleInputChanged}
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleButtonClick}
        >
          Создать
        </Button>
      </Box>
    </Modal>
  )
}

export default FolderModal
