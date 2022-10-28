import { useState, FC, ChangeEvent } from 'react'
import { Typography, Paper, Box, TextField } from '@mui/material'
import { IWorld } from '../../interface'


interface Props {
    worlds: IWorld[]
}

export const SpanishToEnglish: FC<Props> = ({ worlds }) => {

    const [value, setValue] = useState('')


    const world = worlds[0]

    const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <Box style={{ padding: 20 }}>
            <Box sx={{ margin: '0px auto', minWidth: 300, maxWidth: 800 }}>
                <Paper elevation={1}>
                    <Typography>Aqui va la imagen</Typography>
                </Paper>
                <Typography textTransform='capitalize'>{world.spanish}</Typography>
                <TextField
                    label="Escribe"
                    value={value}
                    onChange={handlerChange}
                />
                {value === world.english &&
                    <Typography textTransform='uppercase'>CORRECTO</Typography>
                }
            </Box>
        </Box>
    )
}
