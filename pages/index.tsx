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
      {loadingWords ?
        <h1>Cargando...</h1>
        :
        <SpanishToEnglish />}
    </MainLayout>
  )
}
