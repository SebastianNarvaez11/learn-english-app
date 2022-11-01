import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IWord } from '../../../interface'
import { WordModel } from '../../../models'

type Data =
    | { message: string }
    | IWord

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'PUT':
            return putWord(req, res)
    
        default:
            return res.status(400).json({message : 'Endpoint no encontrado'})
    }
}



const putWord = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    try {
        await db.connect()

        const word = await WordModel.findById(id)
        const { spanish = word?.spanish, english = word?.english, points = word?.points } = req.body

        const new_word = await WordModel.findByIdAndUpdate(id, { spanish, english, points }, { runValidators: true, new: true })

        await db.disconnect()

        return res.status(200).json(new_word!)
    } catch (error) {
        console.log(error);
        await db.disconnect()
        return res.status(500).json({message: 'Ocurrio un error al actualizar la palabra'})
    }
} 