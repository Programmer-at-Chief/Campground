import {ReviewSchema} from '../schemas.mjs'
import express, { Router } from 'express'
import Campground from '../models/campground.mjs'
import catchAsync from '../utils/catchAsync.mjs';
import Review from '../models/review.mjs'

const router = Router({mergeParams: true})

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

router.post('/',validate_review,catchAsync(async (req,res) => {
  const {id} = req.params
  const campground = await Campground.findOne({_id : id})

  const review = new Review(req.body.review)
  campground.reviews.push(review)
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${id}`)
}))

router.delete('/:review_id', catchAsync(async (req,res) =>{
  const {id,review_id} = req.params
  await Campground.findOneAndUpdate({_id : id}, { $pull : {reviews : review_id}})
  await Review.deleteOne({_id : review_id})
  res.redirect(`/campgrounds/${id}`)
}))

export default router
