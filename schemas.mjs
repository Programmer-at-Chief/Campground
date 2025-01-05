import Base_joi from 'joi'
import sanitize from 'sanitize-html'

const extension = (joi)=> ({
  type : 'string',
  base : joi.string(),
  messages : {
    'string.escapeHTML' : '{{#label}} must not include html'
  },
  rules: {
    escapeHTML: {
      validate(value,helpers){
        const clean = sanitize(value,{
          allowedTags: [],
          allowedAttributes: {}
        });
        if (clean !== value){
          return helpers.error('string.escapeHTML',{value})
        }
        return clean;
      }
    }
  }
})

const Joi = Base_joi.extend(extension)

export const CampgroundSchema = Joi.object({
  title : Joi.string().required().max(40).escapeHTML(),
  state : Joi.string().required().max(20).escapeHTML(),
  country : Joi.string().required().max(20).escapeHTML(),
  price : Joi.number().required().min(0),
  //images : Joi.array().max(10).allow('', null),
  description: Joi.string().allow('',null).max(1500).escapeHTML(),
  deletedImages : Joi.array()
})


export const ReviewSchema = Joi.object({
  body : Joi.string().required().max(800).escapeHTML(),
  rating : Joi.number().required().min(1).max(5)
})
