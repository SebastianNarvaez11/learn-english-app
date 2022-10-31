import { configureStore } from "@reduxjs/toolkit";
import uiSlice from './slices/uiSlice'
import wordSlice from './slices/wordSlice'



export const store = configureStore({
    reducer: {
        ui: uiSlice,
        word : wordSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch