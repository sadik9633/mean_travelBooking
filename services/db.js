const mongoose =require('mongoose')
const { review } = require('./dataService')

mongoose.connect('mongodb://127.0.0.1:27017/travels',{useNewUrlParser:true})

const Tour = mongoose.model('Tour',
{
    id: Number,
    title:String,
    city:String,
    address: String,
    distance:Number,
    price:Number,
    maxGroupSize:Number,
    desc:String,
    reviews: 
        {
            name:String,
            rating:Number
        },
    
    photo:String, 
    featured:String
  }
)

  const User=mongoose.model('User',{
    username:String,
    email:String,
    password:String,
    booking:
      [{Name : String,
      Email :String,
      PassangerCount :String,
      Date : String,
      id: Number,
      title:String,
      city:String,
      address: String,
      distance:Number,
      price:Number,
      maxGroupSize:Number,
      desc:String,
      photo:String, 
      featured:String
    }],
    review:[{
       Name:String,
       Review:String

    }]
  })



module.exports = {
    Tour,User,
}


