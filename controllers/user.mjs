import User from "../models/user.mjs"
import flash from 'connect-flash'

const register_page = (req,res) =>{
  res.render("users/register.ejs")
}

const register_user = async (req,res) =>{
  const {username,firstname,lastname,password,c_password,email} = req.body
  if (password !==c_password){
    req.flash('error','Password and confirmed password are not same')
    return res.redirect('/user/register')
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
    return res.redirect('/user/register')
  }
  req.flash('success','Welcome to YelpCamp!')
  res.redirect('/user/login')
}

const login_page = (req,res)=>{
  res.render('users/login.ejs')
}

const login_user = async (req,res) => {
  //const redirectURL = req.session.returnTo || '/campgrounds'
  req.flash('success','Welcome back')
  //res.redirect(redirectURL)
  res.redirect('/campgrounds')
}

const logout_user = (req,res)=>{
  req.logout((err) => {
    if (err) {
      return next(err); 
    }
    res.locals.currentUser = null; 
    req.flash('success', 'Goodbye !!');
    res.redirect('/user/login');
  });
}

const user_profile = async (req,res)=>{
  const user = await User.findOne({_id : req.params.id}).populate({
    path : 'reviews',
    populate : {
      path : 'camp',
      select : 'title'
    }
  }).populate('camps')
  //user.email = null
  user.firstname = null
  user.lastname = null
  res.render('users/user.ejs',{user})
}

export default {register_page,register_user,login_page,login_user,logout_user,user_profile}
