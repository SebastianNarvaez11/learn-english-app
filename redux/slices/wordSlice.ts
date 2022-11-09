import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from "../../interface";




export interface WordState {
    words: IWord[],
    loadingWords: boolean
}


const initialState: WordState = {
    words: [],
    loadingWords: true
}


export const wordSlice = createSlice({
    name: 'word',
    initialState,
    reducers: {

        set_words: (state, action: PayloadAction<IWord[]>) => {
            state.words = action.payload
        },

        set_loading_words: (state, action: PayloadAction<boolean>) => {
            state.loadingWords = action.payload
        },

        update_word: (state, action: PayloadAction<IWord>) => {
            state.words = state.words.map(word => word._id === action.payload._id ? word = action.payload : word)
        },

        add_word: (state, action: PayloadAction<IWord>) => {
            state.words = [...state.words, action.payload]
        }
    }
})

export const { set_words, set_loading_words, update_word, add_word } = wordSlice.actions
export default wordSlice.reducer