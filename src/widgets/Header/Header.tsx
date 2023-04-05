import React, { type FC } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store'
import { colorModeSelector, colorModeToggled } from '../../slices/settingsSlice'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

interface Props {
  drawerWidth: number
}

const Header: FC<Props> = ({ drawerWidth }) => {
  const dispatch = useAppDispatch()
  const colorMode = useAppSelector(colorModeSelector)

  const handleButtonClick = (): void => {
    dispatch(colorModeToggled())
  }

  return (
    <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
      <Toolbar>
        <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
          totsystems-frontend-test
        </Typography>
        <IconButton color="inherit" onClick={handleButtonClick} aria-label="switch color mode">
          {colorMode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
