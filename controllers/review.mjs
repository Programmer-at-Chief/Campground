import Campground from '../models/campground.mjs'
import Review from '../models/review.mjs'
import User from '../models/user.mjs'

const create_review = async (req,res) => {
  const {id} = req.params
  const campground = await Campground.findOne({_id : id})
  const review = new Review(req.body.review)
  review.camp = id
  review.author = req.user._id
  campground.reviews.push(review)
  await res.locals.currentUser.reviews.push(review)
  await review.save();
  await campground.save();
  await res.locals.currentUser.save()
  res.redirect(`/campgrounds/${id}`)
}

const delete_review = async (req,res) =>{
  const {id,review_id} = req.params
  await Campground.findOneAndUpdate({_id : id}, { $pull : {reviews : review_id}})
  await User.findOneAndUpdate({_id : res.locals.currentUser._id}, { $pull : {reviews : review_id}})
  await Review.deleteOne({_id : review_id})
  res.redirect(`/campgrounds/${id}`)
}

export default {create_review,delete_review}
