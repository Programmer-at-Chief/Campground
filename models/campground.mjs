import mongoose from "mongoose";
import Review from "./review.mjs"
const Schema = mongoose.Schema;

const ground = new Schema({
  title : String,
  price: Number,
  city: String,
  state: String,
  description: String,
  image: String,
  reviews: [
    {
    type : Schema.Types.ObjectId,
    ref : 'Review'
    }
  ]
})

ground.post('findOneAndDelete',async function (campground) {
  if (campground.reviews.length){
    await Review.deleteMany({_id : { $in : campground.reviews}})
  }
})

export default mongoose.model('Ground',ground)
