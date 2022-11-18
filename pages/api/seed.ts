import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { ListModel, WordModel } from '../../models'

type Data =
    | { message: string }


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // if (process.env.NODE_ENV === 'production') {
    //     return res.status(401).json({ message: 'No tiene acceso a este servicio estando en produccion' })
    // }

    try {
        await db.connect()

        await ListModel.deleteMany()
        await WordModel.deleteMany()

        await Promise.all(
            seedData.lists.map(async list => {
                const { name, icon, words } = list

                const new_list = new ListModel({ name, icon })
                await new_list.save()

                const new_words = await WordModel.insertMany(words)
                await ListModel.findByIdAndUpdate(new_list._id, { words: new_words })
            })
        )
        await db.disconnect()

        res.status(200).json({ message: 'Proceso realizado correctamente' })
    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error' })
    }

}