import Link from 'next/link';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { MainLayout } from "../components/layouts";
import { ListForLevel, ListItem } from '../components/vocabulary';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { fetchList } from '../redux/actions/listActions';

export default function Home() {

  const { loadingLists, lists } = useAppSelector(state => state.list)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])



  // TODO: cargar al inicio las listas sin popular las palabras
  //       solo con las cantidades para saber cuantas tiene cada lista
  //       contar en el backend cuantas son hard, medium y easy: response = {LISTAS: [], hard: number, medium: number, easy: number }
  //       al hacer click en la lista se cargan las palabras populadas


  return (
    <MainLayout>
      {loadingLists ?
        <h1>Cargando Listas...</h1>
        :
        <>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant='h1' component='h1' fontSize={40} fontWeight={400} color='#494969'>Vocabulario</Typography>
            </Grid>
            <Grid item xs={12} sm={6} display='flex' justifyContent='end'>
              <Link href="/create-list" style={{ textDecoration: 0 }}>
                <Button color='primary' variant="contained">
                  + Crear lista
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Box display='flex' alignItems='flex-end' marginTop={1}>
            <StarIcon style={{ color: '#74C730', marginRight: 5 }} />
            <Typography variant='h1' component='h1' fontSize={20} fontWeight={500} color='#494969' marginRight={1}>50</Typography>
            <Typography variant='h1' component='h1' fontSize={15} fontWeight={100} color='#494969'>Palabras aprendidas</Typography>
          </Box>

          <ListForLevel />

          <Typography variant='h1' component='h1' fontSize={20} fontWeight={100} color='#494969' marginTop={3}>Tus listas:</Typography>

          <Grid container spacing={1} marginTop={1}>
            {lists.map(list => (
              <Grid key={list._id} item xs={12} sm={6} md={4} lg={3}>
                <ListItem list={list} />
              </Grid>
            ))}
          </Grid>
        </>
      }

    </MainLayout>
  )
}
