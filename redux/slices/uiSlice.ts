import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
    currentGif: string
}


const initialState: UIState = {
    currentGif: ''
}




export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {

        set_current_gif: (state, action: PayloadAction<string>) => {
            state.currentGif = action.payload
        }
    }
})




export const { set_current_gif } = uiSlice.actions
export default uiSlice.reducer