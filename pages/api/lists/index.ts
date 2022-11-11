import { ITranslation, IList, IListResponse } from './../../../interface';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { ListModel, WordModel } from '../../../models'

type Data =
    | { message: string }
    | IList
    | IList[]
    | IListResponse



export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return postList(req, res)

        case 'GET':
            return getList(res)

        default:
            res.status(400).json({ message: 'Endpoint no encontrada' })
    }
}


const getList = async (res: NextApiResponse<Data>) => {

    try {
        await db.connect()
        const list: IList[] = await ListModel.find()
        const hard: number = await WordModel.countDocuments({ points: { $gt: 2 } }) // mayores que 2
        const medium: number = await WordModel.countDocuments({ points: { $gt: 0, $lt: 3 } }) // entre 1 y 2
        const easy: number = await WordModel.countDocuments({ points: 0 })
        await db.disconnect()

        res.status(200).json({ list, hard, medium, easy })
    } catch (error) {
        console.log(error);
        await db.disconnect()
        res.status(500).json({ message: 'Error obtener las listas' })
    }

}

const postList = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name, icon, words } = req.body

    try {
        const new_list = new ListModel({ name, icon, createdAt: Date.now() })
        await db.connect()
        await new_list.save()

        await Promise.all(
            words.map(async (word: ITranslation) => {
                const new_word = new WordModel({ english: word.english, spanish: word.spanish })
                await new_word.save()
                await ListModel.findByIdAndUpdate(new_list._id, { $push: { words: new_word._id } })
            })
        )

        const list = await ListModel.findById(new_list._id).populate('words')
        await db.disconnect()

        res.status(200).json(list!)

    } catch (error) {
        console.log(error);
        await db.disconnect()
        res.status(500).json({ message: 'Error al crear la lista' })
    }
}