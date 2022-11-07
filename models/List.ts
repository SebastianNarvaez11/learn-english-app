import mongoose, { Model, Schema } from 'mongoose'
import { IList } from '../interface'

const ListSchema = new Schema({

    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    icon: { type: String },
    words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
    createdAt: { type: Number },
})


const ListModel: Model<IList> = mongoose.models.List || mongoose.model('List', ListSchema)

export default ListModel