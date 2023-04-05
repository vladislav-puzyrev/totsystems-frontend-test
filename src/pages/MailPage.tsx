import React, { type FC } from 'react'
import MainLayout from '../layouts/MainLayout'
import MailView from '../widgets/MailView/MailView'

const MailPage: FC = () => {
  return (
    <MainLayout>
      <MailView/>
    </MainLayout>
  )
}

export default MailPage
