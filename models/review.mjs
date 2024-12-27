import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const reviewSchema = Schema({
  body : String,
  rating : Number,
  author : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  camp : {
    type : Schema.Types.ObjectId,
    ref : 'Ground'
  }
})

export default mongoose.model('Review',reviewSchema)
