import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const reviewSchema = Schema({
  body : String,
  rating : Number
})

export default mongoose.model('Review',reviewSchema)
