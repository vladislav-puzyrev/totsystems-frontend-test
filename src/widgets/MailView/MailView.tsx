import React, { type FC, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { mailSelector } from '../../selectors/mailSelector'
import { mailBeenRead } from '../../slices/mailSlice'

const MailView: FC = () => {
  const params = useParams()
  const mailId = Number(params.mailId)
  const dispatch = useAppDispatch()
  const mail = useAppSelector((state) => mailSelector(state, { mailId }))

  useEffect(() => {
    dispatch(mailBeenRead({ mailId }))
  }, [dispatch, mailId])

  if (mail == null) {
    return (
      <Typography variant="h4" component="div">
        Письмо не найдено
      </Typography>
    )
  }

  const createdDate = new Date(mail.createdDate)

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant="h4" component="div">
          {mail.subject}
        </Typography>
        <Typography variant="h6" component="div">
          Автор: {mail.author}
        </Typography>
      </Box>
      <Typography variant="subtitle1" component="div">
        Создано: {createdDate.toLocaleString()}
      </Typography>
      <Typography variant="body1" component="div" sx={{ mt: 2 }}>
        {mail.message}
      </Typography>
    </>
  )
}

export default MailView
