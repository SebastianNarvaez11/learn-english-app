import { wordApi } from "../../apis";
import { IWord } from "../../interface";
import { set_loading_words, set_words } from "../slices/wordSlice";
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