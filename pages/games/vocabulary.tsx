import { useState } from 'react'
import { NextPage } from 'next'
import { Box, IconButton } from '@mui/material'
import KeyboardIcon from '@mui/icons-material/Keyboard';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { MainLayout } from '../../components/layouts'
import { LevelOptions, SpanishToEnglish } from '../../components/vocabulary'

const VocabularyPage: NextPage = () => {

  const [method, setMethod] = useState('escritura')

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

      {method === 'escritura' && <SpanishToEnglish />}

      {method === 'nivel' && <LevelOptions />}

      {/* TODO: HACER QUE DESDE ESTA PANTALLA SE MANEJAN LA PALABRAS Y PASARLAS COMO PROPS */}


    </MainLayout>

  )
}

export default VocabularyPage