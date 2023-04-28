const dataService = require('./services/dataService')

const express = require('express')

const cors =require('cors')

const jwt=require('jsonwebtoken')


const server = express()

server.use(cors({
    origin:'http://localhost:4200'
}))

server.use(express.json())

server.listen(3000,()=>{
    console.log('server is running at port number 3000');
})

const jwtMiddleware=(req,res,next)=>{
    try { const token=req.headers['access_token']
      //verify token
      const data=jwt.verify(token,"superkey123")
      console.log(".....middleware....");
      console.log(data);
     
      next()
  }
  catch{
  res.status(422).json({
      statusCode:422,
      status:false,
      message:'please login first'
  })
  }
  }

//------


server.post('/register',(req,res)=>{

    dataService.register(req.body.username,req.body.email,req.body.password).then(result=>{
     res.status(result.statusCode).json(result)
    })
    //convert object to json and send as response
     //console.log(req.body);
     //res.send("success")
 })

 server.post('/login',(req,res)=>{

    dataService.login(req.body.email,req.body.password).then(result=>{
        //convert object to json and send
    res.status(result.statusCode).json(result) 
    })
})

//newsletter
server.post('/newLett',(req,res)=>{
    dataService.nLett(req.body.email).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//booking
server.post('/booking',jwtMiddleware,(req,res)=>{
    dataService.booking(req.body.fullName,req.body.email,req.body.numOm,req.body.date,req.body.tour).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//getbooking
server.post('/getbooking',jwtMiddleware,(req,res)=>{

    dataService.getbooking(req.body.email).then(result=>{
//convert object to json and send
res.status(result.statusCode).json(result)
    })
})

//review
server.post('/review',jwtMiddleware,(req,res)=>{

     dataService.review(req.body.review,req.body.email,req.body.name).then(result=>{
        res.status(result.statusCode).json(result)

     })
})

 
//all-tourlist Api
server.get('/all-tours',(req,res)=>{
dataService.allTours().then((result)=>{
    res.status(result.statusCode).json(result)
})
})

//view-tour/tourId Api
server.get('/view-tour/:tourId',(req,res)=>{
    dataService.viewTour(req.params.tourId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
    })

