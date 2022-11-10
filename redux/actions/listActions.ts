import { wordApi } from '../../apis';
import { IList, IListResponse, ITranslation } from '../../interface';
import { add_list, set_list, set_loading_lists } from '../slices/listSlice';
import { set_easy_words, set_hard_words, set_medium_words } from '../slices/wordSlice';
import { AppDispatch } from './../store';


export const fetchList = () => (dispatch: AppDispatch) => {

    wordApi.get<IListResponse>('lists')
        .then(response => {
            dispatch(set_list(response.data.list))
            dispatch(set_hard_words(response.data.hard))
            dispatch(set_medium_words(response.data.medium))
            dispatch(set_easy_words(response.data.easy))
            dispatch(set_loading_lists(false))
        })
        .catch(error => {
            console.log(error);
            dispatch(set_loading_lists(false))
        })
}


export const createList = (name: string, icon: string, words: ITranslation[], router: any) => (dispatch: AppDispatch) => {

    wordApi.post<IList>('lists', { name, icon, words })
        .then(response => {
            dispatch(add_list(response.data))
            router.push('/')
        })
        .catch(error => {
            console.log(error);
        })
}