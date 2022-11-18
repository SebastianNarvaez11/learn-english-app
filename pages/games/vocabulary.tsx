import { useState } from 'react'
import { NextPage } from 'next'
import { Box, IconButton, LinearProgress } from '@mui/material'
import KeyboardIcon from '@mui/icons-material/Keyboard';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SoundIcon from '@mui/icons-material/GraphicEq';
import { MainLayout } from '../../components/layouts'
import { LevelOptions, Listening, SpanishToEnglish } from '../../components/vocabulary'
import { useAppSelector } from '../../redux/hooks';

const VocabularyPage: NextPage = () => {

  const { words, isLoadingWords } = useAppSelector(state => state.word)
  const [position, setPosition] = useState(0)

  const [method, setMethod] = useState('escritura')


  return (
    <MainLayout>
      {!isLoadingWords ?
        <>
          <Box>
            <IconButton onClick={() => setMethod('escritura')}>
              <KeyboardIcon />
            </IconButton>

            <IconButton onClick={() => setMethod('nivel')}>
              <AutoFixHighIcon />
            </IconButton>

            <IconButton onClick={() => setMethod('listen')}>
              <SoundIcon />
            </IconButton>
          </Box>

          <Box style={{ maxWidth: 500, margin: '0px auto' }}>

            <LinearProgress variant="determinate" value={(position * 100) / words.length} sx={{ height: 10, borderRadius: 3 }} />

            {method === 'escritura' && <SpanishToEnglish words={words} position={position} setPosition={setPosition} />}

            {method === 'nivel' && <LevelOptions words={words} position={position} setPosition={setPosition} />}

            {method === 'listen' && <Listening words={words} position={position} setPosition={setPosition} />}
          </Box>
        </>
        :
        <h1>Cargando palabras...</h1>
      }
    </MainLayout>
  )
}

export default VocabularyPage