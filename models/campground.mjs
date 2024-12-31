import mongoose from "mongoose";
import Review from "./review.mjs"
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url : String,
  filename : String,
})

ImageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload','/upload/w_200');
})

const ground = new Schema({
  title : String,
  price: Number,
  city: String,
  state: String,
  description: String,
  images: [ImageSchema],
  reviews: [
    {
      type : Schema.Types.ObjectId,
      ref : 'Review'
    }
  ],
  author : {
    type : Schema.Types.ObjectId,
    ref: 'User'
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

//ground.post('findOneAndDelete',async function (campground) {
//  if (campground.reviews.length){
//await Review.deleteMany({_id : { $in : campground.reviews}})
//  }
//})

export default mongoose.model('Ground',ground)
