import { wordApi } from '../../apis';
import { IList, ITranslation } from '../../interface';
import { add_list, set_list, set_loading_lists } from '../slices/listSlice';
import { AppDispatch } from './../store';


export const fetchList = () => (dispatch: AppDispatch) => {

    wordApi.get<IList[]>('lists')
        .then(response => {
            dispatch(set_list(response.data))
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