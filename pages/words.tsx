import { NextPage } from 'next'
import { MainLayout } from '../components/layouts'
import { SpanishToEnglish } from '../components/ui'
import { useAppSelector } from '../redux/hooks'

const Words: NextPage = () => {

  const { loadingWords } = useAppSelector(state => state.word)

  return (
    <MainLayout>
      {loadingWords ?
        <h1>Cargando...</h1>
        :
        <SpanishToEnglish />}
    </MainLayout>

  )
}

export default Words