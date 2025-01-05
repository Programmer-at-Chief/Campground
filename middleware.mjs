import {CampgroundSchema} from './schemas.mjs'
import ExpressError from './utils/ExpressError.mjs'
import { ReviewSchema } from './schemas.mjs'
import Campground from './models/campground.mjs'
import Review from './models/review.mjs'

const isLoggedIn = (req,res,next) => {
  if (!req.isAuthenticated()){
    req.flash('error', 'Not logged in ')
    return res.redirect('/user/login')
  }
  next()
}

const validate_campground = (req,res,next) => {
  const {error} = CampgroundSchema.validate(req.body)
  if (error){
    const msg = error.details.map(el => el.message).join(",")
    throw new ExpressError(msg,400);
  }
  else{
    next();
  }
}

const verify_author_campground = async (req,res,next) =>{
  const id = req.params.id
  const campground = await Campground.findById(id)
  if (!campground.author.equals(req.user._id)){
    req.flash('error','Not your camp!!')
    return res.redirect(`/campgrounds/${id}`)
  }
  next();
}

const validate_review = (req,res,next) => {
  const {error} = ReviewSchema.validate(req.body.review)
  if (error){
    const msg = error.details.map(el => el.message).join(",")
    throw new ExpressError(msg,400);
  }
  else{
    next();
  }
}

const verify_author_review = async (req,res,next) => {
  const {id,review_id} = req.params
  const review = await Review.findById(review_id)
  if (!review.author.equals(req.user._id)){
    req.flash('error','Not your review!!')
    return res.redirect(`/campgrounds/${id}`)
  }
  next();
}


export {isLoggedIn,validate_campground,verify_author_campground,validate_review,verify_author_review}
