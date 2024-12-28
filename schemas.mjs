import Joi from 'joi'

export const CampgroundSchema = Joi.object({
  title : Joi.string().required(),
  city : Joi.string().required(),
  state: Joi.string().required(),
  price : Joi.number().required().min(0),
  //images : Joi.array().max(10).allow('', null),
  description: Joi.string().allow('',null).max(1500),
  deletedImages : Joi.array()
})


export const ReviewSchema = Joi.object({
  body : Joi.string().required().max(800),
  rating : Joi.number().required().min(1).max(5)
})
