import Campground from "../models/campground.mjs";
import Review from "../models/review.mjs";
import User from '../models/user.mjs'
import { cloudinary } from "../cloudinary/index.mjs";
import Radar from "../radar.mjs";
import time_difference from "../utils/time_difference.mjs"

const radar = new Radar()

const index = async (req,res,next)=> {
  const camps = await Campground.find({});
  res.render('campgrounds/index.ejs',{camps})
}

const new_form = (req,res) => {
  res.render('campgrounds/new')
}

const create_campground = async (req,res,next) => {
  try{
    const {title,state,country,description,price} = req.body
    const campground = new Campground({title: title, country: country,state: state,description: description,price : Number(price),author : res.locals.currentUser._id,geometry : {type : 'Point',coordinates : [25.000000, -71.000000]},createdOn : Date(),lastEdited : Date()})
    campground.images = await req.files.map(f => ({ url : f.path,filename : f.filename }))
    if (campground.images.length > 6) {
      req.flash('warning','Only upto 6 images can be registered with a campground')
      campground.images = campground.images.splice(6)
    }

    const output= await radar.get_coordinates(`${country}, ${state}`)

    campground.geometry = { 
      type : 'Point',
      coordinates : [output.data.addresses[0].latitude,output.data.addresses[0].longitude]
    }

    await Promise.all([
      res.locals.currentUser.camps.push(campground),
      campground.save(),
      res.locals.currentUser.save(),
    ]);

    req.flash('success','Successfully registered campground.')
    res.redirect(`/campgrounds/${campground._id}`)
  }
  catch {
    req.flash('error','Some error occured, could not register camp.')
    res.redirect('/campgrounds/')
  }
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

  const time = time_difference(camp.createdOn);

  res.render('campgrounds/show',{camp,time})
}

const edit_form =  async (req,res) => {
  const {id} = req.params
  const camp = await Campground.findOne({ _id : id})
  res.render('campgrounds/edit',{camp})
}

const update_camp = async (req,res,next) =>{
  const {id} = req.params
  const {title,country,state,price,description} =req.body
  const camp = await Campground.findById(id)
  let images = camp.images
  if (req.body.deletedImages){
    for (let file of req.body.deletedImages){
      await cloudinary.uploader.destroy(file)
    }
    //Campground.updateOne({$pull : {images : {filename : { $in : req.body.deletedImages}}}})
    images = images.filter(obj => !req.body.deletedImages.includes(obj.filename))
  }
  for (let image of req.files){
    images.push({url: image.path, filename : image.filename})
  }
  const cur_date = new Date()
  await Campground.updateOne({_id : id},{title: title, country: country,state: state,description: description,price : price,images: images, lastEdited: cur_date.toDateString()})
  req.flash('success','Successfully updated campground.')
  res.redirect(`/campgrounds/${id}`)
}

const delete_camp = async (req,res) => {
  const {id} = req.params
  const camp = await Campground.findOneAndDelete({_id : id})
  for (let image of camp.images){
    await cloudinary.uploader.destroy(image.filename)
  }
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
