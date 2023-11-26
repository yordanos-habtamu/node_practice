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
app.get('/posts',authenticateToken,(req,res)=>{
 res.json(posts)
})
app.post('/login',(req,res)=>{
    const username=req.body.user
    const user={user:username}
  const accesstoken=  jwt.sign(user,process.env.ACCESS_SECRET_TOKEN)
  res.json({accesstoken:accesstoken})
})
function authenticateToken(req,res,next){
    const authHeader=req.headers[authorization]
    const token=authHeader && authHeader.split(' ')[1]
    if (token==null) return res.sendStatus(401)
   jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,user)=>{
   if(err) return res.sendStatus(403)
   req.user=user
   next()
})
}
app.listen(3000)