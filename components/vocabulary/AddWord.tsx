import { FC } from 'react';
import { useFormik } from 'formik';
import { Grid, TextField, Button } from "@mui/material"
import { ITranslation } from '../../interface';

interface Props {
    onAddWordList: (traslation: ITranslation) => void
}


export const AddWord: FC<Props> = ({ onAddWordList }) => {

    const formik = useFormik({
        initialValues: {
            english: '',
            spanish: ''
        },

        onSubmit: values => {
            const traslation = {
                english: values.english,
                spanish: values.spanish
            }

            onAddWordList(traslation)
        },
    });


    return (
        <Grid container spacing={1} marginTop={1}>
            <Grid item xs={6}>
                <TextField
                    required
                    size='small'
                    label="Ingles"
                    variant="outlined"
                    style={{ width: '100%' }}
                    id="english"
                    name="english"
                    onChange={formik.handleChange}
                    value={formik.values.english}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    size='small'
                    label="Español"
                    variant="outlined"
                    style={{ width: '100%' }}
                    id="spanish"
                    name="spanish"
                    onChange={formik.handleChange}
                    value={formik.values.spanish}
                />
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth color='success' variant="contained" size='small' onClick={() => formik.handleSubmit()}>Agregar</Button>
            </Grid>
        </Grid>
    )
}
