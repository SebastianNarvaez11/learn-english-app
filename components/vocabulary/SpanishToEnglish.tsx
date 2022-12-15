import { useState, ChangeEvent, useEffect, KeyboardEvent, Dispatch, SetStateAction, FC } from 'react'
import { Typography, Box, TextField, Card, CardActionArea, CardMedia, CardContent, FormControlLabel, Switch, IconButton } from '@mui/material'
import { useAppDispatch } from '../../redux/hooks'
import { getGif } from '../../redux/actions/uiActions'
import confetti from "canvas-confetti"
import { updateWord } from '../../redux/actions/wordActions'
import { IWord } from '../../interface'
import { add_word } from '../../redux/slices/wordSlice'
import { CardImage } from './CardImage'

interface Props {
    words: IWord[],
    position: number,
    setPosition: Dispatch<SetStateAction<number>>
}

export const SpanishToEnglish: FC<Props> = ({ words, position, setPosition }) => {

    const dispatch = useAppDispatch()


    const [inputValue, setInpuValue] = useState('')
    const [help, setHelp] = useState(false)
    const [showText, setShowText] = useState(true)
    const [showImage, setShowImage] = useState(true)


    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInpuValue(event.target.value)

        if (event.target.value === words[position].english) {
            if (help === false && words.filter(word => word._id === words[position]._id!).length === 1) {
                dispatch(updateWord(words[position]._id!, undefined, undefined, words[position].points === 0 ? 0 : words[position].points - 1))
            }
            setPosition(position + 1)
            listenWord()
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


    const listenWord = () => {
        let w = new SpeechSynthesisUtterance(words[position].english)
        w.lang = 'en-EN'
        speechSynthesis.speak(w)
    }

    return (
        <Box display='flex' padding={2} onKeyDown={onInputKeyDown}>
            <Box sx={{ margin: '0px auto', minWidth: 300, maxWidth: 300 }}>
                {position !== words.length ?
                    <>
                        <Card onClick={onClickHelp}>
                            <CardActionArea sx={{ padding: 2 }}>

                                {showImage && <CardImage word={words[position]} nextImageCome={position !== words.length} />}

                                <CardContent>
                                    {showText &&
                                        <Typography align='center' fontWeight={help ? 200 : 400} variant="h5" component="h5">
                                            {words[position].spanish}
                                        </Typography>
                                    }

                                    {help &&
                                        <Typography align='center' fontWeight={600} variant="h5" component="h5">
                                            {words[position].english}
                                        </Typography>
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        
                        <TextField
                            placeholder={showText ? `Traduce "${words[position].spanish}"` : "Que entiendes?"}
                            autoComplete='off'
                            value={inputValue}
                            onChange={onInputChange}
                            sx={{ marginTop: 2, width: '100%' }}
                        />

                        <FormControlLabel control={<Switch checked={showText} onClick={() => setShowText(!showText)} />} label="Mostrar texto" />
                        <FormControlLabel control={<Switch checked={showImage} onClick={() => setShowImage(!showImage)} />} label="Mostrar imagen" />

                        <Typography variant='body2' color="text.secondary" marginTop={2}>
                            Si no la sabes, presiona la tecla Enter o haz clic en la imagen para ver la respuesta
                        </Typography>
                    </>
                    :
                    <h1>Felicitaciones</h1>
                }
            </Box>
        </Box>
    )
}
