import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { WordModel } from '../../models'

type Data =
    | { message: string }


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este servicio estando en produccion' })
    }

    try {
        await db.connect()
        await WordModel.deleteMany()
        await WordModel.insertMany(seedData.words)
        await db.disconnect()

        res.status(200).json({ message: 'Proceso realizado correctamente' })
    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error' })
    }

}