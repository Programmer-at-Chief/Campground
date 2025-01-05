import express from 'express'
import passport from 'passport'
import catchAsync from '../utils/catchAsync.mjs'
import user from '../controllers/user.mjs'

const router = express.Router({mergeParams: true})

router.get("/",(req,res)=>{
  res.render("custom/home.ejs")
})

router.get("/me",(req,res) =>{
  res.render('custom/profile.ejs')
})

export default router
