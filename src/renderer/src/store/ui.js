import { create } from 'zustand'

const initialState = {
  page: ''
}

export const useUi = create((set) => ({
  ...initialState,
  cambiarPage: (page) => set((state) => ({ ...state, page }))
}))
