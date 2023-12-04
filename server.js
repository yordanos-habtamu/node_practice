require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const posts = [
  {
    username: "abebe",
    title:"article1",
  },
  {
    username: "kebede",
    title:"article2",
  },
  {
    username: "ayele",
    title: "article3",
  },
];

app.get('/posts', authenticateToken, (req, res) => {
 res.json( posts.filter(post=>post.username === req.user.name));
    
});

app.post('/login', (req, res) => {
  var username = req.body.username;
  var user = { name: username };
  const accesstoken=jwt.sign(user, process.env.ACCESS_SECRET_TOKEN);
  res.json({accesstoken:accesstoken})
});

function authenticateToken(req, res, next) {
 const authHeader=req.headers['authorization']
 const token=authHeader && authHeader.split(' ')[1]
 if(token==null) res.sendStatus(401)
 jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,user)=>{
   if(err) res.sendStatus(403)
   req.user=user
  next()
})
}

app.listen(5000, () => {
  console.log("Server started listening on port 5000");
});

