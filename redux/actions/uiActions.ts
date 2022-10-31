import { giphyApi } from "../../apis";
import { GiphyResponse } from "../../interface";
import { set_current_gif } from "../slices/uiSlice";
import { AppDispatch } from "../store";

export const getGif = (text: string) => (dispatch: AppDispatch) => {

    const api_key = 'YZCUAXiEbpKsC87ajtMAanILkjQl5MtI'

    giphyApi.get<GiphyResponse>(`search?api_key=${api_key}&q=${text}&limit=1&offset=0&rating=g&lang=en`)
        .then(response => {
            dispatch(set_current_gif(response.data.data[0].images.downsized_medium.url))
        })
}