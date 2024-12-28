import express, { Router } from 'express'
import {isLoggedIn,validate_campground,verify_author_campground} from '../middleware.mjs'
import catchAsync from '../utils/catchAsync.mjs';
import campgrounds from '../controllers/campground.mjs'
import multer from 'multer';
import { storage } from '../cloudinary/index.mjs';

const upload = multer({ storage : storage })
//const upload = multer({ dest : 'uploads/'})

const router = Router()

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn ,upload.array('image',6),validate_campground,catchAsync(campgrounds.create_campground))

router.get('/new',isLoggedIn,campgrounds.new_form )

router.get('/:id/edit',isLoggedIn,catchAsync(campgrounds.edit_form))

router.route('/:id')
  .get(catchAsync(campgrounds.show_campground))
  .put(verify_author_campground,isLoggedIn,upload.array('image'),validate_campground,catchAsync(campgrounds.update_camp))
  .delete(verify_author_campground,isLoggedIn,catchAsync( campgrounds.delete_camp))

export default router
