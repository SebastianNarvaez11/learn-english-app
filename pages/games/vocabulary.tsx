import { useState } from 'react'
import { NextPage } from 'next'
import { Box, IconButton, LinearProgress } from '@mui/material'
import KeyboardIcon from '@mui/icons-material/Keyboard';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { MainLayout } from '../../components/layouts'
import { LevelOptions, SpanishToEnglish } from '../../components/vocabulary'
import { useAppSelector } from '../../redux/hooks';
import { getListForGame } from '../../utils';

const VocabularyPage: NextPage = () => {

  const { words } = useAppSelector(state => state.word)
  const [position, setPosition] = useState(0)

  const [method, setMethod] = useState('nivel')


  return (
    <MainLayout>
      <Box>
        <IconButton onClick={() => setMethod('escritura')}>
          <KeyboardIcon />
        </IconButton>

        <IconButton onClick={() => setMethod('nivel')}>
          <AutoFixHighIcon />
        </IconButton>
      </Box>

      <Box style={{ maxWidth: 500, margin: '0px auto' }}>

        <LinearProgress variant="determinate" value={(position * 100 ) / words.length} sx={{height: 10, borderRadius: 3}}/>

        {method === 'escritura' && <SpanishToEnglish words={words} position={position} setPosition={setPosition} />}

        {method === 'nivel' && <LevelOptions words={words} position={position} setPosition={setPosition} />}
      </Box>



    </MainLayout>

  )
}

export default VocabularyPage