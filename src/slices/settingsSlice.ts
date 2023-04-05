import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'

export type ColorMode = 'light' | 'dark'

const initialState = {
  colorMode: null as ColorMode | null
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    colorModeUpdated (state, action: PayloadAction<{ mode: ColorMode }>) {
      const { mode } = action.payload
      state.colorMode = mode
    },
    colorModeToggled (state) {
      state.colorMode = (state.colorMode === 'dark') ? 'light' : 'dark'
    }
  }
})

export const colorModeSelector = (state: RootState): ColorMode | null => state.settings.colorMode
export const { colorModeUpdated, colorModeToggled } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
