import mongoose from 'mongoose';
import path from 'path';
import Campground from '../models/campground.mjs'
import fs from 'fs';
import cities from './cities.js';
import {places,descriptors} from './seedHelpers.js'
import axios from 'axios'
import { LoremIpsum } from "lorem-ipsum";
const key = process.env.KEY
const url = process.env.URL
const default_url = process.env.DEFAULT


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});



const getImage= async (query) =>{
  const config = { params:  {
    'client_id' : key,
    query: query ,
    orientation: 'landscape'
    }
  }
  let img;
  try {
    img = await axios.get(url,config)
    return img.data.urls.raw
  }
  catch(e) {
    return default_url
  }
}

mongoose.connect('mongodb://localhost:27017/project')

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',() => {
  console.log("Database Connected");
});

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0 ;i<40;i++){
    const random_1000 = Math.floor( Math.random() * 1000 )
    const place = Math.floor(Math.random()*places.length)
    const descriptor = Math.floor(Math.random()*descriptors.length)
    const price = Math.floor(Math.random()*3000 )+ 2000
    const title = `${places[place]} ${descriptors[descriptor]}`;
    const imageURL = await getImage(title)
    const camp = new Campground({
      title : title,
      city : `${cities[random_1000].city}`,
      state: `${cities[random_1000].state}`,
      description: lorem.generateParagraphs(1),
      price: price,
      image: imageURL,
      author : '676d9b8d986109e55015d2f0'
    })
    await camp.save();
  }
}

seedDB().then(res => {
  mongoose.connection.close();
  console.log("Connection closed")
})

