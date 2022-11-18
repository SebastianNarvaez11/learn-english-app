import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Typography, Box, Card, CardActionArea, CardContent, Grid, Button, IconButton } from '@mui/material'
import SoundIcon from '@mui/icons-material/GraphicEq';
import { useAppDispatch } from '../../redux/hooks'
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

export const LevelOptions: FC<Props> = ({ words, position, setPosition }) => {

    const dispatch = useAppDispatch()

    const [help, setHelp] = useState(false)

    const onClickHelp = () => {
        if (help === false) return setHelp(true)
    }

    const onHard = () => {
        dispatch(updateWord(words[position]._id!, undefined, undefined, words[position].points + 2))
        if (position !== (words.length - 1)) {
            dispatch(add_word(words[position]))
        }

        setHelp(false)
        setPosition(position + 1)
    }

    const onMedium = () => {
        if (words[position].points === 0) {
            dispatch(updateWord(words[position]._id!, undefined, undefined, words[position].points + 1))
        }
        setPosition(position + 1)
        setHelp(false)
    }

    const onEasy = () => {
        dispatch(updateWord(words[position]._id!, undefined, undefined, words[position].points === 0 ? 0 : words[position].points - 1))
        setPosition(position + 1)
        setHelp(false)
    }

    useEffect(() => {
        if (position !== words.length) {
            let w = new SpeechSynthesisUtterance(words[position].english)
            w.lang = 'en-EN'
            speechSynthesis.speak(w)
        }
    }, [position])


    const listenWord = () => {
        let w = new SpeechSynthesisUtterance(words[position].english)
        w.lang = 'en-EN'
        speechSynthesis.speak(w)
    }

    return (
        <Box display='flex' padding={2}>
            <Box sx={{ margin: '0px auto', minWidth: 300, maxWidth: 800 }}>

                {position !== words.length ?
                    <>
                        <Card onClick={onClickHelp}>
                            <CardActionArea sx={{ padding: 2 }}>
                                {/* <CardImage word={words[position]} nextImageCome={position !== words.length} /> */}
                                <CardContent>
                                    <Typography align='center' fontWeight={help ? 200 : 400} variant="h1" component="h1">
                                        {words[position].english}
                                    </Typography>
                                    {help &&
                                        <Typography align='center' fontWeight={600} variant="h5" component="h5">
                                            {words[position].spanish}
                                        </Typography>
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <IconButton onClick={listenWord} color="success" sx={{ marginTop: 2}}>
                            <SoundIcon />
                        </IconButton>

                        <Grid container marginTop={1} spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <Button fullWidth color='error' variant="contained" onClick={onHard}>
                                    Dificil
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button fullWidth color='primary' variant="contained" onClick={onMedium}>
                                    Medio
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button fullWidth color='success' variant="contained" onClick={onEasy}>
                                    Facil
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                    :
                    <h1>Felicitaciones</h1>
                }
            </Box>
        </Box>
    )
}
