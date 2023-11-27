require('dotenv').config()
const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
app.use(express.json())
const posts=[
    {
   user:"kim",
   post:"post1"
    },
    {
        user:"kill",
        post:"post2"
    },
]
app.post('/posts',authenticateToken,(req,res)=>{
     jwt.verify(req.token,process.env.ACCESS_SECRET_TOKEN,(err,posts)=>{
    if(err) {res.json("you are still forbidden here")}
    else{
    res.json(posts)}
   })
})
app.post('/login',(req,res)=>{
    const username=req.body.user
    const user={user:username}
  const accesstoken=  jwt.sign(user,process.env.ACCESS_SECRET_TOKEN,(err,accesstoken)=>{
    if(err){
      res.sendStatus(403) 
    }else{
      res.json({accesstoken:accesstoken})
    }
  })
})
function authenticateToken(req,res,next){
   const bearerHeader=req.header['authorization']
   if(typeof bearerHeader!=='undefined'){
     const token=bearerHeader.split(' ')[1]
     req.token=token
     next()
   }else{
    res.json({message:"you are not authorized to access this page"}).sendStatus(403)
   }
}

app.listen(4000)