import { Card, CardActionArea, Box, Typography, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IList } from '../../interface'
import { useAppDispatch } from '../../redux/hooks'
import { set_words } from '../../redux/slices/wordSlice'


interface Props {
    list: IList
}

export const ListItem: FC<Props> = ({ list }) => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const onSetWords = () => {
        dispatch(set_words(list.words))
        router.push('/games/vocabulary')
    }

    return (
        <Card sx={{ maxWidth: 300, borderRadius: 3 }} onClick={onSetWords}>
            <CardActionArea>
                <Box display='flex'>
                    <Box flex={1} alignSelf="center">
                        <Typography fontSize={50} align="center">{list.icon}</Typography>
                    </Box>
                    <Box flex={2}>
                        <CardContent>
                            <Typography fontSize={20} gutterBottom variant="h5" component="div">
                                {list.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {list.words.length}  Palabras
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
