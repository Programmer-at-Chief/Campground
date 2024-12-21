import express, { Router } from 'express'
import {CampgroundSchema} from '../schemas.mjs'
import catchAsync from '../utils/catchAsync.mjs';
import Campground from '../models/campground.js'
import Review from '../models/review.js'
//import { defaults } from 'joi';

const router = Router()

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
function generateStars(rating) {
  let starsHTML = '';
  
  // Loop through 5 stars
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Filled star (gold color)
      starsHTML += `
        <svg width="20" height="20" fill="gold" class="star">
          <path d="M10 15l-3.09 1.63L7.91 12.45l-4.5-3.5 5.59-.41L10 0l2.91 8.17 5.59.41-4.5 3.5.91 4.68L10 15z"></path>
        </svg>`;
    } else {
      // Empty star (gray color)
      starsHTML += `
        <svg width="20" height="20" fill="gray" class="star">
          <path d="M10 15l-3.09 1.63L7.91 12.45l-4.5-3.5 5.59-.41L10 0l2.91 8.17 5.59.41-4.5 3.5.91 4.68L10 15z"></path>
        </svg>`;
    }
  }

  return starsHTML;
}

router.get('/',catchAsync(async (req,res,next)=> {
  const camps = await Campground.find({});
  res.render('campgrounds/index.ejs',{camps})
}))

router.get('/new', (req,res) => {
  res.render('campgrounds/new')
})

router.post('/' , validate_campground,catchAsync(async (req,res,next) => {
  const {title,city,state,description,image,price} = req.body
  const campground = new Campground({title: title, city: city,state: state,description: description,price : Number(price), image : image || 'https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwYXZhaWxhYmxlfGVufDB8fDB8fHww'})
  await campground.save()
  req.flash('success','Successfully registered campground.')
  res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id',catchAsync(async (req,res) =>{
  const {id} = req.params
  const camp = await Campground.findOne({ _id : id}).populate('reviews')
  res.render('campgrounds/show',{camp,generateStars})
}))

router.get('/:id/edit',catchAsync( async (req,res) => {
  const {id} = req.params
  const camp = await Campground.findOne({ _id : id})
  res.render('campgrounds/edit',{camp})
}))

router.put('/:id/edit',validate_campground,catchAsync(async (req,res,next) =>{
  const {id} = req.params
  const {title,city,state,price,description,image} =req.body
  await Campground.updateOne({_id : id},{title: title, city: city,state: state,description: description,price : price,image: image || 'https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwYXZhaWxhYmxlfGVufDB8fDB8fHww'})
  req.flash('success','Successfully updated campground.')
  res.redirect(`/campgrounds/${id}`)
}))

router.delete('/:id/delete',catchAsync( async (req,res) => {
  const {id} = req.params
  const camp = await Campground.findOneAndDelete({_id : id})
  req.flash('deleted',`Successfully deleted campground : ${camp.title}`)
  res.redirect('/campgrounds')
}))

export default router
