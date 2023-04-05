import React, { type FC, type ReactNode } from 'react'
import { Box, Toolbar } from '@mui/material'
import Header from '../widgets/Header/Header'
import Sidebar from '../widgets/Sidebar/Sidebar'

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  const drawerWidth = 240

  return (
    <>
      <Header drawerWidth={drawerWidth}/>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar drawerWidth={drawerWidth}/>
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <Toolbar/>
          {children}
        </Box>
      </Box>
    </>
  )
}

export default MainLayout
