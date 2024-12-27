import Campground from "../models/campground.mjs";
import Review from "../models/review.mjs";
import User from '../models/user.mjs'
import generateStars from '../utils/generateStars.mjs'
import flash from 'connect-flash'

const index = async (req,res,next)=> {
  const camps = await Campground.find({});
  res.render('campgrounds/index.ejs',{camps})
}

const new_form = (req,res) => {
  res.render('campgrounds/new')
}

const create_campground = async (req,res,next) => {
  const {title,city,state,description,image,price} = req.body
  const campground = new Campground({title: title, city: city,state: state,description: description,price : Number(price), image : image || 'https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwYXZhaWxhYmxlfGVufDB8fDB8fHww',author : res.locals.currentUser._id})
  res.locals.currentUser.camps.push(campground)
  await campground.save()
  await res.locals.currentUser.save()
  req.flash('success','Successfully registered campground.')
  res.redirect(`/campgrounds/${campground._id}`)
}
const show_campground = async (req,res) =>{
  const {id} = req.params
  const camp = await Campground.findOne({ _id : id}).populate({
    path : 'reviews',
    populate : {
      path : 'author',
      select : 'username'
    }
  }).populate({
      path : 'author',
      select : 'username'
    }
    )
  if (!camp){
    req.flash("error",'Campgroud not found')
    return res.redirect('/campgrounds')
  }
  for (let review of camp.reviews){
    review.stars = generateStars(review.rating)
  }
  res.render('campgrounds/show',{camp})

}

const edit_form =  async (req,res) => {
  const {id} = req.params
  const camp = await Campground.findOne({ _id : id})
  res.render('campgrounds/edit',{camp})
}

const update_camp = async (req,res,next) =>{
  const {id} = req.params
    const {title,city,state,price,description,image} =req.body
  await Campground.updateOne({_id : id},{title: title, city: city,state: state,description: description,price : price,image: image || 'https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwYXZhaWxhYmxlfGVufDB8fDB8fHww'})
  req.flash('success','Successfully updated campground.')
  res.redirect(`/campgrounds/${id}`)
}

const delete_camp = async (req,res) => {
  const {id} = req.params
  const camp = await Campground.findOneAndDelete({_id : id})
  await User.findOneAndUpdate({_id : res.locals.currentUser._id}, { $pull : {camps : id}})
  //for (let review of camp.reviews){
  //const review_of_camp = await Review.findOne({_id : review})
  //await User.findOneAndUpdate({ _id : review_of_camp.author },{$pull : {reviews : review_of_camp._id}})

  const reviewsToDelete = camp.reviews;

  const userUpdates = reviewsToDelete.map(async (reviewId) => {
    const review = await Review.findById(reviewId);
    if (review) {
      await User.findOneAndUpdate(
        { _id: review.author },
        { $pull: { reviews: reviewId } }
      );
    }
  });

  // Wait for all user updates to finish
  await Promise.all(userUpdates);

  await Review.deleteMany({_id : { $in : reviewsToDelete}})

  req.flash('success',`Successfully deleted campground : ${camp.title}`)
  res.redirect('/campgrounds')
}

export default {index,new_form,create_campground,show_campground,edit_form,update_camp,delete_camp}
