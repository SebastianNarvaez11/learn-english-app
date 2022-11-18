import { Card, CardActionArea, Box, Typography, CardContent, LinearProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'
import { IList } from '../../interface'
import { getList } from '../../redux/actions/listActions'
import { useAppDispatch } from '../../redux/hooks'


interface Props {
    list: IList
}

export const CartItemList: FC<Props> = ({ list }) => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const onGetList = () => {
        dispatch(getList(list._id!))
        router.push('/games/vocabulary')
    }


    const easy_words = useMemo(() => list.words.filter(word => word.points === 0).length, [list.words])

    // TODO: colocar gif en los verbos
    
    return (
        <Card sx={{ maxWidth: 300, borderRadius: 3 }} onClick={onGetList}>
            <CardActionArea>
                <Box display='flex'>
                    <Box flex={1} alignSelf="center">
                        <Typography fontSize={50} align="center">{list.icon}</Typography>
                    </Box>
                    <Box flex={2}>
                        <CardContent>
                            <Typography fontSize={15} fontWeight={500}>
                                {list.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {list.words.length}  Palabras
                            </Typography>
                            <LinearProgress variant="determinate" value={(easy_words * 100) / list.words.length} color='success' sx={{ marginTop: 1, height: 8, borderRadius: 5}} />
                        </CardContent>

                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
