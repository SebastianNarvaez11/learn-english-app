import { Box, Card, Typography } from '@mui/material';
import { useEffect } from 'react'
import { MainLayout } from "../components/layouts";
import { SpanishToEnglish } from "../components/ui";
import { fetchWords } from '../redux/actions/wordActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function Home() {

  const { loadingWords } = useAppSelector(state => state.word)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWords())
  }, [dispatch])


  return (
    <MainLayout>
      <Box>
        <Card>
          <Typography>Aprendidas</Typography>
        </Card>
        <Card>
          <Typography>Por Aprender</Typography>
        </Card>
      </Box>
      {loadingWords ?
        <h1>Cargando...</h1>
        :
        <SpanishToEnglish />}
    </MainLayout>
  )
}
