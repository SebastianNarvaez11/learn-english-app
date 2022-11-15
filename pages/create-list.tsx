import { useState } from 'react';
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import { Grid, Box, Typography, TextField, Button, List, ListCard, ListCardButton, ListCardIcon, ListCardText } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import { EmojiClickData } from 'emoji-picker-react';
import { MainLayout } from '../components/layouts'
import { AddWord } from '../components/vocabulary';
import { ITranslation } from '../interface';
import { useAppDispatch } from '../redux/hooks';
import { createList } from '../redux/actions/listActions';

const EmojiPicker = dynamic(
    () => {
        return import('emoji-picker-react');
    },
    { ssr: false }
);



const CreateListPage: NextPage = () => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const [words, setWords] = useState<ITranslation[]>([])
    const [showEmoji, setShowEmoji] = useState(false)
    const [addingWord, setAddingWord] = useState(false)
    const [emoji, setEmoji] = useState('🤖')

    const formik = useFormik({
        initialValues: {
            name: '',
        },

        onSubmit: (values) => {
            dispatch(createList(values.name, emoji, words, router))

        },
    });


    const onAddWordList = (traslation: ITranslation) => {
        setWords([traslation, ...words])
        setAddingWord(false)
    }


    const onEmojiClick = (emoji: EmojiClickData) => {
        setEmoji(emoji.emoji)
        setShowEmoji(false)
    }



    return (
        <MainLayout>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4} display='flex' flexDirection='column'>
                        <Box style={{ backgroundColor: '#F1F6FC', borderRadius: 10 }}>
                            <Typography fontSize={80} align="center">{emoji}</Typography>
                        </Box>

                        {showEmoji ?
                            <EmojiPicker onEmojiClick={onEmojiClick} width={300} />
                            :
                            <Button style={{ marginTop: 10, marginBottom: 10 }} color='primary' variant="contained" onClick={() => setShowEmoji(true)}>
                                + Seleccionar Emoji
                            </Button>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} display='flex' flexDirection='column'>
                        <Typography fontSize={30} fontWeight={500}>{formik.values.name}</Typography>
                        <TextField
                            required
                            style={{ maxWidth: 400 }}
                            id="name"
                            name="name"
                            label="Nombre de la lista"
                            variant="standard"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        <Typography fontSize={15} color="text.secondary" marginTop={5}>Agrega palabras a esta lista:</Typography>



                        {addingWord ?
                            <AddWord onAddWordList={onAddWordList} />
                            :
                            <Box className='add_button' marginTop={2} onClick={() => setAddingWord(true)}>
                                <Typography align='center'>+ Agregar Palabra</Typography>
                            </Box>
                        }

                        <List>
                            {words.map(word => (
                                <ListCard disablePadding key={word.english}>
                                    <ListCardButton>
                                        <ListCardIcon>
                                            <DoneIcon />
                                        </ListCardIcon>
                                        <ListCardText>
                                            {word.english}
                                        </ListCardText>
                                        <ListCardText>
                                            {word.spanish}
                                        </ListCardText>
                                    </ListCardButton>
                                </ListCard>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='success' variant="contained" fullWidth type='submit'>Guardar Lista</Button>
                    </Grid>
                </Grid>
            </form>

        </MainLayout>
    )
}

export default CreateListPage