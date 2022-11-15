import { useRouter } from 'next/router'
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import { IDifficulty } from '../../interface'
import { fetchWordsByDifficulty } from '../../redux/actions/wordActions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export const ListByLevel = () => {

    const router = useRouter()
    const { easy_words, hard_words, medium_words } = useAppSelector(state => state.word)
    const dispatch = useAppDispatch()

    const onGetWords = (difficulty: IDifficulty) => {
        dispatch(fetchWordsByDifficulty(difficulty))
        router.push('/games/vocabulary')
    }


    return (

        <Box marginTop={2}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 300, borderRadius: 3, backgroundColor: '#FBE6EC' }} onClick={() => onGetWords('hard')}>
                        <CardActionArea>
                            <Box display='flex'>
                                <Box flex={1} alignSelf="center">
                                    <Typography fontSize={50} align="center">☠️</Typography>
                                </Box>
                                <Box flex={2}>
                                    <CardContent>
                                        <Typography fontSize={20} gutterBottom variant="h5" component="div">
                                            Dificiles
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {hard_words}  Palabras
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 300, borderRadius: 3, backgroundColor: '#EBF3FC' }} onClick={() => onGetWords('medium')}>
                        <CardActionArea>
                            <Box display='flex'>
                                <Box flex={1} alignSelf="center">
                                    <Typography fontSize={50} align="center">👀</Typography>
                                </Box>
                                <Box flex={2}>
                                    <CardContent>
                                        <Typography fontSize={20} gutterBottom variant="h5" component="div">
                                            Intermedias
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {medium_words}  Palabras
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 300, borderRadius: 3 }} onClick={() => onGetWords('easy')}>
                        <CardActionArea>
                            <Box display='flex'>
                                <Box flex={1} alignSelf="center">
                                    <Typography fontSize={50} align="center">💪</Typography>
                                </Box>
                                <Box flex={2}>
                                    <CardContent>
                                        <Typography fontSize={20} gutterBottom variant="h5" component="div">
                                            Faciles
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {easy_words}  Palabras
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Box>

    )
}
