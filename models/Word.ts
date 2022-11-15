import mongoose, { Model, Schema } from 'mongoose'
import { IWord } from '../interface'

const WordSchema = new Schema({

    spanish: {type: String, required: [ true, 'El significado en español es obligatorio']},
    english: {type: String, required: [ true, 'El significado en español es obligatorio']},
    image: {type: String, default: ''},
    points: { type: Number, default: 3},
    createdAt: { type: Number },
})


const WordModel: Model<IWord> = mongoose.models.Word || mongoose.model('Word', WordSchema)

export default WordModel