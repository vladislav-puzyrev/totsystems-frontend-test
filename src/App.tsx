import React, { type FC, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, useMediaQuery } from '@mui/material'
import { colorModeSelector, colorModeUpdated } from './slices/settingsSlice'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import FolderPage from './pages/FolderPage'
import MailPage from './pages/MailPage'

const App: FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const colorMode = useAppSelector(colorModeSelector)
  const dispatch = useAppDispatch()

  const prefersColorMode = prefersDarkMode ? 'dark' : 'light'

  useEffect(() => {
    if (colorMode != null) {
      return
    }

    dispatch(colorModeUpdated({ mode: prefersColorMode }))
  }, [colorMode, dispatch, prefersColorMode])

  const palette = useMemo(() => createTheme({ palette: { mode: colorMode ?? prefersColorMode } }), [prefersColorMode, colorMode])

  return (
    <ThemeProvider theme={palette}>
      <CssBaseline/>
      <HashRouter>
        <Routes>
          <Route path="/" element={<FolderPage/>}/>
          <Route path="/folders/:folderId" element={<FolderPage/>}/>
          <Route path="/mails/:mailId" element={<MailPage/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
