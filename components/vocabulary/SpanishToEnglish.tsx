import { useState, ChangeEvent, useEffect, KeyboardEvent, Dispatch, SetStateAction, FC } from 'react'
import { Typography, Box, TextField, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getGif } from '../../redux/actions/uiActions'
import confetti from "canvas-confetti"
import { updateWord } from '../../redux/actions/wordActions'
import { IWord } from '../../interface'
import { add_word } from '../../redux/slices/wordSlice'
import { ShowImage } from './ShowImage'

interface Props {
    words: IWord[],
    position: number,
    setPosition: Dispatch<SetStateAction<number>>
}

export const SpanishToEnglish: FC<Props> = ({ words, position, setPosition }) => {

    const dispatch = useAppDispatch()


    const [inputValue, setInpuValue] = useState('')
    const [help, setHelp] = useState(false)


    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInpuValue(event.target.value)

        if (event.target.value === words[position].english) {
            setPosition(position + 1)
            setInpuValue('')
            setHelp(false)
            confetti({
                zIndex: 999,
                particleCount: 200,
                spread: 160,
                angle: 90,
                origin: {
                    x: 0.5,
                    y: 1
                }
            })
        }
    }

    const onInputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && help === false) {
            setHelp(true)
            dispatch(updateWord(words[position]._id!, undefined, undefined, words[position].points + 1))

            if (position !== (words.length - 1)) {
                dispatch(add_word(words[position]))
            }
        }
    }

    const onClickHelp = () => {
        if (help === false) {
            setHelp(true)
            dispatch(updateWord(words[position]._id!, undefined, undefined, words[position].points + 1))

            if (position !== (words.length - 1)) {
                dispatch(add_word(words[position]))
            }
        }
    }


    return (
        <Box display='flex' padding={2} onKeyDown={onInputKeyDown}>
            <Box sx={{ margin: '0px auto', minWidth: 300, maxWidth: 300 }}>
                {position !== words.length ?
                    <>
                        <Card onClick={onClickHelp}>
                            <CardActionArea sx={{ padding: 2 }}>

                                <ShowImage word={words[position]} nextImageCome={position !== words.length}/>
                                
                                <CardContent>
                                    <Typography align='center' fontWeight={help ? 200 : 400} variant="h5" component="h5">
                                        {words[position].spanish}
                                    </Typography>
                                    {help &&
                                        <Typography align='center' fontWeight={600} variant="h5" component="h5">
                                            {words[position].english}
                                        </Typography>
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <TextField
                            placeholder={`Traduce "${words[position].spanish}"`}
                            value={inputValue}
                            onChange={onInputChange}
                            sx={{ marginTop: 2, width: '100%' }}
                        />

                        <Typography variant='body2' color="text.secondary" marginTop={2}>
                            Si no la sabes, presiona la tecla "Enter" o haz clic en la imagen para ver la respuesta
                        </Typography>
                    </>
                    :
                    <h1>Felicitaciones</h1>
                }
            </Box>
        </Box>
    )
}
