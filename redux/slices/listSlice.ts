import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IList } from "../../interface";

export interface ListState {
    lists: IList[],
    loadingLists: boolean
}

const initialState: ListState = {
    lists: [],
    loadingLists: true
}


export const ListSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {

        set_list: (state, action: PayloadAction<IList[]>) => {
            state.lists = action.payload
        },

        add_list: (state, action: PayloadAction<IList>) => {
            state.lists = [action.payload, ...state.lists]
        },

        set_loading_lists: (state, action: PayloadAction<boolean>) => {
            state.loadingLists = action.payload
        },
    }
})


export const { set_list, add_list, set_loading_lists} = ListSlice.actions
export default ListSlice.reducer