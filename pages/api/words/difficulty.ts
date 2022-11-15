import { IDifficulty, IWord } from '../../../interface';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { WordModel } from '../../../models';

type Data =
    | { message: string }
    | IWord[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getWordsByDifficulty(req, res)

        default:
            return res.status(400).json({ message: 'enpoint no encontrado' })
    }

}


const getWordsByDifficulty = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { difficulty } = req.query as { difficulty: IDifficulty }

    try {
        switch (difficulty) {
            case 'easy':
                await db.connect()
                const easy_words = await WordModel.find({ points: 0 })
                await db.disconnect()
                return res.status(200).json(easy_words)

            case 'medium':
                await db.connect()
                const medium_words = await WordModel.find({ points: { $gt: 0, $lt: 3 } }) // entre 1 y 2
                await db.disconnect()
                return res.status(200).json(medium_words)

            case 'hard':
                await db.connect()
                const hard_words = await WordModel.find({ points: { $gt: 3 } }) // mayores que 3
                await db.disconnect()
                return res.status(200).json(hard_words)

            default:
                return res.status(400).json({ message: 'esa dificultad no existe' })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'error al obtener la palabras por nivel de dificultad' })
    }

}