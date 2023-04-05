import React, { type FC, useState } from 'react'
import FolderTable from './FolderTable'
import FolderControls from './FolderControls'

const FolderView: FC = () => {
  const [selectedMailIds, setSelectedMailIds] = useState<number[]>([])
  const [mailsSearchTerm, setMailsSearchTerm] = useState('')

  return (
    <>
      <FolderControls
        selectedMailIds={selectedMailIds}
        setSelectedMailIds={setSelectedMailIds}
        mailsSearchTerm={mailsSearchTerm}
        setMailsSearchTerm={setMailsSearchTerm}
      />
      <FolderTable
        selectedMailIds={selectedMailIds}
        setSelectedMailIds={setSelectedMailIds}
        mailsSearchTerm={mailsSearchTerm}
        setMailsSearchTerm={setMailsSearchTerm}
      />
    </>
  )
}

export default FolderView
