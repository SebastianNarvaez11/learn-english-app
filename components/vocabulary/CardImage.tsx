import { CardMedia } from "@mui/material"
import { FC, useEffect } from "react"
import { IWord } from "../../interface"
import { getGif } from "../../redux/actions/uiActions"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

interface Props {
    word: IWord,
    nextImageCome: boolean
}

export const CardImage: FC<Props> = ({word, nextImageCome}) => {

    const {currentGif} = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (nextImageCome) {
            word.image === '' && dispatch(getGif(word.english))
        }
    }, [word, nextImageCome])


    return (
        <CardMedia
            component="img"
            height="200"
            image={word.image !== '' ? word.image : currentGif} 
            alt={word.english}
        />
    )
}
