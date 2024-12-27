import express, { Router } from 'express'
import Campground from '../models/campground.mjs'
import User from '../models/user.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import Review from '../models/review.mjs'
import { validate_review ,isLoggedIn,verify_author_review} from '../middleware.mjs';
import review from '../controllers/review.mjs';

const router = Router({mergeParams: true})

router.post('/',validate_review,isLoggedIn,catchAsync(review.create_review))

router.delete('/:review_id',isLoggedIn,verify_author_review, catchAsync(review.delete_review))

export default router
