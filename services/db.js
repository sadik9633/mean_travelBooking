const mongoose =require('mongoose')

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
        [         
          {
            username:String,
            email:String,
            review:String,
            tourId:Number
        }],
    
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
      tourId: Number,
      title:String,
      city:String,
      address: String,
      distance:Number,
      price:Number,
      maxGroupSize:Number,
      desc:String,
      photo:String, 
      featured:String
    }]
  })

  const Review=mongoose.model('Review',
    {tourId:Number,
      reviews:
      [{username: String,
    email: String,
    date:String,
    review: String,
    rating:String,
    tourId: Number}]
  }
  )


module.exports = {
    Tour,User,Review
}


