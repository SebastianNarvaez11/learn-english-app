import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IList } from '../../../interface'
import { ListModel } from '../../../models'
import { selectIdealWords } from '../../../utils'

type Data =
    | { message: string }
    | IList

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getListById(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}


const getListById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    try {
        await db.connect()
        const list = await ListModel.findById(id).populate('words')
        await db.disconnect()

        list!.words = selectIdealWords(list?.words!)
        return res.status(200).json(list!)
        
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(500).json({ message: 'Error al obtener la lista por id' })
    }


}