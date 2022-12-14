import { wordApi } from "../../apis";
import { IDifficulty, IWord } from "../../interface";
import { disorderWords } from "../../utils";
import { set_loading_words, set_words, update_word } from "../slices/wordSlice";
import { AppDispatch } from "../store";

export const fetchWords = () => (dispatch: AppDispatch) => {

    dispatch(set_loading_words(true))

    wordApi.get<IWord[]>('words')
        .then(response => {
            dispatch(set_words(response.data))
            dispatch(set_loading_words(false))
        })
        .catch(error => {
            console.log(error);
            dispatch(set_loading_words(false))
        })
}


export const updateWord = (id: string, english?: string, spanish?: string, points?: number) => (dispatch: AppDispatch) => {

    wordApi.put<IWord>(`words/${id}`, { english, spanish, points })
        .then(response => {
            // dispatch(update_word(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}


export const fetchWordsByDifficulty = (difficulty : IDifficulty) => (dispatch: AppDispatch) => {

    dispatch(set_loading_words(true))

    wordApi.get<IWord[]>(`words/difficulty/?difficulty=${difficulty}`)
        .then(response => {
            const words = disorderWords(Array.from(response.data))
            dispatch(set_words(words))
            dispatch(set_loading_words(false))
        })
        .catch(error => {
            console.log(error);
            dispatch(set_loading_words(false))
        })
}