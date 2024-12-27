import express from 'express'
import passport from 'passport'
import catchAsync from '../utils/catchAsync.mjs'
import user from '../controllers/user.mjs'

const router = express.Router({mergeParams: true})

router.route('/register')
  .get(user.register_page)
  .post(catchAsync(user.register_user))

router.route('/login')
  .get( user.login_page)
  .post(passport.authenticate('local',{failureFlash : true,failureRedirect: '/login'}) ,user.login_user)

router.get('/logout',user.logout_user)

router.get('/:id',catchAsync( user.user_profile))

export default router
