import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from "../../interface";




export interface WordState {
    words: IWord[],
    loadingWords: boolean,
    hard_words: number,
    medium_words: number,
    easy_words: number
}


const initialState: WordState = {
    words: [],
    loadingWords: true,
    hard_words: 0,
    medium_words: 0,
    easy_words: 0
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
        },

        set_hard_words: (state, action: PayloadAction<number>) => {
            state.hard_words = action.payload
        },

        set_medium_words: (state, action: PayloadAction<number>) => {
            state.medium_words = action.payload
        },

        set_easy_words: (state, action: PayloadAction<number>) => {
            state.easy_words = action.payload
        }
    }
})

export const { set_words, set_loading_words, update_word, add_word, set_easy_words, set_hard_words, set_medium_words } = wordSlice.actions
export default wordSlice.reducer