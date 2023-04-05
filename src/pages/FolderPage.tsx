import React, { type FC } from 'react'
import MainLayout from '../layouts/MainLayout'
import FolderView from '../widgets/FolderView/FolderView'

const FolderPage: FC = () => {
  return (
    <MainLayout>
      <FolderView/>
    </MainLayout>
  )
}

export default FolderPage
