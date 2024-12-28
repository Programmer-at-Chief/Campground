import express from 'express';
import session from 'express-session'
import flash from 'connect-flash'
import path from 'path';
import mongoose from 'mongoose';
import {CampgroundSchema,ReviewSchema} from './schemas.mjs'
import ExpressError from './utils/ExpressError.mjs'
import methodOverride from 'method-override'
import ejs_mate from 'ejs-mate'
import campgrounds from './routes/campgrounds.mjs';
import review from './routes/review.mjs'
import passport from 'passport';
import passport_local from 'passport-local'
import User from './models/user.mjs';
import user from './routes/user.mjs';
const key = process.env.SECRET_KEY

mongoose.connect('mongodb://localhost:27017/project')

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express()

app.engine('ejs',ejs_mate)

const sessionConfig = {
  secret : key ,
  resave : false,
  saveUninitialized : true,
  cookie : {
    httpOnly : true,
    expires : Date.now() + 1000*60*60*24*7, // a week 
    maxAge : 1000*60*60*24*7
  }
}

app.use(session(sessionConfig))

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',() => {
  console.log("Database Connected");
});

app.use(flash())
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.static(path.join(path.resolve(), 'views')));
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new passport_local(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next) =>{
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.warning = req.flash('warning')
  res.locals.deleted= req.flash('deleted')
  next()
})

app.use('/campgrounds',campgrounds)
app.use('/campgrounds/:id/reviews',review)
app.use('/',user)


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
