import express from 'express'
import passport from 'passport'
import flash from 'connect-flash'
import User from '../models/user.mjs'
import catchAsync from '../utils/catchAsync.mjs'

const router = express.Router({mergeParams: true})

router.get('/register',(req,res) =>{
  res.render("users/register.ejs")
})

router.post('/register',catchAsync(async (req,res) =>{
  const {username,firstname,lastname,password,c_password,email} = req.body
  if (password !==c_password){
    req.flash('error','Password and confirmed password are not same')
    return res.redirect('/register')
  }
  const user = new User({
    username : username,
    firstname : firstname,
    lastname : lastname,
    email : email
  })
  try{
  const registered_user = await User.register(user,password)
  }
  catch (e){
    req.flash('error',e.message)
    return res.redirect('/register')
  }
  req.flash('success','Welcome to YelpCamp!')
  res.redirect('/login')
}))

router.get('/login',(req,res)=>{
  res.render('users/login.ejs')
})

router.post('/login',passport.authenticate('local',{failureFlash : true,failureRedirect: '/login'}) ,async (req,res) => {
  //const redirectURL = req.session.returnTo || '/campgrounds'
  req.flash('success','Welcome back')
  //res.redirect(redirectURL)
  res.redirect('/campgrounds')
})

router.get('/logout',(req,res)=>{
  req.logout;
  res.locals.currentUser = null
  req.flash("success",'Goodbye !!')
  res.redirect('/')
})

export default router
