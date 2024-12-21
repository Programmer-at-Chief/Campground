import express from 'express';
import flash from 'connect-flash'
import path from 'path';
import mongoose from 'mongoose';
import {CampgroundSchema,ReviewSchema} from './schemas.mjs'
import ExpressError from './utils/ExpressError.mjs'
import methodOverride from 'method-override'
import ejs_mate from 'ejs-mate'
import campgrounds from './routes/campgrounds.mjs';
import review from './routes/review.mjs'

mongoose.connect('mongodb://localhost:27017/project')

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express()

app.engine('ejs',ejs_mate)
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',() => {
  console.log("Database Connected");
});

//app.use(flash())
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.static(path.join(path.resolve(), 'views')));
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))

app.use((req,res,next) =>{
  //res.locals.success = req.flash('success')
  //res.locals.error = req.flash('error')
  next()
})

app.use('/campgrounds',campgrounds)
app.use('/campgrounds/:id/reviews',review)


app.all('/:url',(req,res,next) => {
  const {url} = req.params
  next(new ExpressError(`/${url} not found`,404,url));
})

app.get('/',(req,res) =>{
  res.render("campgrounds/home.ejs")
})


app.use((err,req,res,next) => {
  const {message ,status = 500,url} = err
  if (!err.message){
    err.message = 'Somethign went wrong'
  }
  if (status == 404){
    res.status(status).render("campgrounds/404",{url})
  }
  else{
    res.status(status).render("campgrounds/error",{err})
  }
})

app.listen(3000,()=>{
  console.log("Listening on 3000")
})
