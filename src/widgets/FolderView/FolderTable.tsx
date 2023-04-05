import React, { type FC, useEffect } from 'react'
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../store'
import { folderMailsSearchSelector } from '../../selectors/folderMailsSearchSelector'

interface Props {
  selectedMailIds: number[]
  setSelectedMailIds: (selectedMailIds: number[]) => void
  mailsSearchTerm: string
  setMailsSearchTerm: (mailsSearchTerm: string) => void
}

const FolderTable: FC<Props> = ({ selectedMailIds, setSelectedMailIds, mailsSearchTerm, setMailsSearchTerm }) => {
  const navigate = useNavigate()
  const params = useParams()
  const folderId = Number(params.folderId ?? '1')
  const mails = useAppSelector((state) => folderMailsSearchSelector(state, { folderId, term: mailsSearchTerm }))

  useEffect(() => {
    if (mails.length >= selectedMailIds.length) {
      return
    }

    setSelectedMailIds(selectedMailIds.filter((id) => {
      return mails.find((mail) => mail.id === id)
    }))
  }, [mails, selectedMailIds, setSelectedMailIds])

  if (mailsSearchTerm !== '' && mails.length === 0) {
    return (
      <Typography variant="h4" component="div">
        Письма не найдены
      </Typography>
    )
  }

  if (mails.length === 0) {
    return (
      <Typography variant="h4" component="div">
        Письма отсутствуют
      </Typography>
    )
  }

  const globalCheckboxChecked = mails.every((mail) => selectedMailIds.includes(mail.id))
  const globalCheckboxIndeterminate = (selectedMailIds.length > 0) && (selectedMailIds.length < mails.length)

  const handleGlobalCheckbox = (): void => {
    if (globalCheckboxIndeterminate || selectedMailIds.length === 0) {
      setSelectedMailIds(mails.map((mail) => mail.id))
    } else {
      setSelectedMailIds([])
    }
  }

  const checkboxChecked = (id: number): boolean => selectedMailIds.includes(id)
  const handleCheckbox = (id: number): () => void => {
    return () => {
      if (selectedMailIds.includes(id)) {
        setSelectedMailIds(selectedMailIds.filter((selectedId) => selectedId !== id))
      } else {
        setSelectedMailIds([...selectedMailIds, id])
      }
    }
  }

  const handleMailNavigate = (id: number): () => void => {
    return () => {
      navigate(`/mails/${id}`)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={globalCheckboxChecked}
                indeterminate={globalCheckboxIndeterminate}
                onChange={handleGlobalCheckbox}
                inputProps={{
                  'aria-label': 'select all mails'
                }}
              />
            </TableCell>
            <TableCell>Автор</TableCell>
            <TableCell>Тема</TableCell>
            <TableCell>Сообщение</TableCell>
            <TableCell>Дата создания</TableCell>
            <TableCell>Дата прочтения</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mails.map((mail) => (
            <TableRow
              key={mail.id}
              onClick={handleMailNavigate(mail.id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
              hover
            >
              <TableCell padding="checkbox">
                <Checkbox
                  onClick={(event) => { event.stopPropagation() }}
                  checked={checkboxChecked(mail.id)}
                  onChange={handleCheckbox(mail.id)}
                  inputProps={{
                    'aria-label': 'select mail'
                  }}
                />
              </TableCell>
              <TableCell component="th" scope="row">{mail.author}</TableCell>
              <TableCell>{mail.subject}</TableCell>
              <TableCell>{(mail.message.length > 40) ? mail.message.slice(0, 40) + '...' : mail.message}</TableCell>
              <TableCell>{new Date(mail.createdDate).toLocaleString()}</TableCell>
              <TableCell>
                {(mail.readDate == null)
                  ? 'Не прочитано'
                  : new Date(mail.readDate).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FolderTable
