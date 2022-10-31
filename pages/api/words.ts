import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { IWord } from '../../interface'
import { WordModel } from '../../models'

type Data =
    | { message: string }
    | IWord[]



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getWords(res)
    
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }
}



const getWords = async (res: NextApiResponse<Data>) => {

    try {
        await db.connect()
        const words: IWord[] = await WordModel.find()
        await db.disconnect()

        return res.status(200).json(words)

    } catch (error) {
        console.log(error);
        db.disconnect()
        return res.status(500).json({ message: 'Error al obtener las palabras' })
    }
}