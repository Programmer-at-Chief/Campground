import express, { Router } from 'express'
import {isLoggedIn,validate_campground,verify_author_campground} from '../middleware.mjs'
import catchAsync from '../utils/catchAsync.mjs';
import campgrounds from '../controllers/campground.mjs'

const router = Router()

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, validate_campground,catchAsync(campgrounds.create_campground))

router.get('/new',isLoggedIn,campgrounds.new_form )

router.get('/:id/edit',isLoggedIn,catchAsync(campgrounds.edit_form))

router.route('/:id')
  .get(catchAsync(campgrounds.show_campground))
  .put(verify_author_campground,isLoggedIn,validate_campground,catchAsync(campgrounds.update_camp))
  .delete(verify_author_campground,isLoggedIn,catchAsync( campgrounds.delete_camp))

export default router
