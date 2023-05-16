const  request  = require("express")
const jwt = require("jsonwebtoken")

const db = require('./db.js')

 //all tours
const allTours = ()=>{
return db.Tour.find().then(
    (result)=>{
        if(result){
           return{
            statusCode:200,
            tours:result
           } 
        }else{
            return{
                statusCode:404,
                message:"no data is present"
            } 

        }
    }
)
}

//view-tour
const viewTour = (id)=>{
    return db.Tour.findOne( {id} ).then((result)=>{
        if(result){
            return{
                statusCode:200,
                tours:result
            }
        }else{
            return{
                statusCode:404,
                message:"Tour is unavailable" 
            }
        }
    })
}



//-------------

const register = (username,email,password) => {
    //if(acno in userDetails){
    return db.User.findOne({ email }).then(user => {
      if (user) {
        return {
          status: false,
          message: 'user alredy present',
          statusCode: 401
        }
      }
      else {
        // create new user object in db
        const newuser = new db.User({
          username:username,
          email:email,
          password:password,
          booking:[]
          
        })
        //save in db
        newuser.save()
        return {
          status: true,
          message: 'registered',
          statusCode: 200
        }
      }
    })
  
  }
const  login = (email,password) => {
    //if (acno in userDetails) {
    return db.User.findOne({ email:email,password:password }).then(user => {
      if (user) {
        currentUser = user.username
        //console.log(this.currentUser);
        currentEmail = email
  
        //token generation
        const token = jwt.sign({ currentEmail }, "superkey123"
        )
  
  
        return {
          status: true,
          message: 'login success',
          statusCode: 200,
          currentUser,
          currentEmail,
          token
        }
      }
      else {
        return {
          status: false,
          message: 'incurrect email or password',
          statusCode: 401
        }
      }
    })
  }

const  nLett = (email) => {
    //if(acno in userDetails){
    return db.User.findOne({ email }).then(user => {
      if (user) {
        
        return {
          status: true,
          message: 'Subscribed',
          statusCode: 401
        }
      }
      else {
     return {  
        status:false,
        message: 'You are not authorised',
        statusCode:401
}
      }
    })
  
  }

  //booking

const booking = (fullName,email,numOm,date,tour)=> {
var numOm = parseInt(numOm)
return db.User.findOne({email}).then(user=> {
  if(user){
          user.booking.push({

            Name : fullName,
            Email :email,
            PassangerCount : numOm,
            Date : date,
            tourId:tour.id,
            title:tour.title,
      city:tour.city,
      address:tour.address,
      distance:tour.distance,
      price:tour.price,
      maxGroupSize:tour.maxGroupSize,
      desc:tour.desc,
      photo:tour.photo, 
      featured:tour.featured
           
        })
        user.save()
        return{
            status:true,
            statusCode:200,
            message: `${fullName} your booking confirmed on ${date} Happy journy in advance`
        }
       
    }
    else{
        return{
            status:false,
            message: "please register or login before booking ",
            statusCode:401
        }
    }
})
}
//getbooking
const getbooking = (email) => {
  return db.User.findOne( {email} ).then(user=>{
    if(user){
      return {
        status: true,
        statusCode: 200,
        booking:user.booking
      }
    }else{
      return {
        status: false,
        statusCode: 401,
        message:"booking is empty"
      }
    }
  })
}
const getreview=(tourId)=>{
  return db.Review.findOne({tourId}).then(result=>{
if(result){
  
  return{
        status: true,
        statusCode: 200,
       reviews:result.reviews
  }
}else{
  return {
    status: false,
    statusCode: 401,
    message:"not review yet"
  }
} })
}




//review
const review=(username,email,date,review,rating,tourId)=>{
  return db.Review.findOne({tourId}).then(user =>{
    if(user){
      user.reviews.push({
        username: username,
        email: email,
        date:date,
        review: review,
        rating:rating,
        tourId:tourId,
      })
      user.save()
      return {
        status: true,
        message: `${username} thank you for sharing your experience you Rated ${rating} out 5`,
        statusCode: 200
      }
    }else{
      const newReview =new db.Review(
      {tourId:tourId,
      
        reviews:[{
          username: username,
        email: email,
        date:date,
        review: review,
        rating:rating,
        tourId:tourId,
        }]}
      )
      newReview.save()
      return {
        status: true,
        message: `${username} thank you for sharing your experience you Rated ${rating} out 5`,
        statusCode: 200
      }
    }
  })
}

module.exports = {
   allTours,viewTour,register,login,nLett,booking,review,getbooking,getreview,
}