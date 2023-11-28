require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const posts = [
  {
    user: "abebe",
    article: ["article1"],
  },
  {
    user: "kebede",
    article: ["article2"],
  },
  {
    user: "ayele",
    article: ["article3"],
  },
];

app.get('/posts', authenticateToken, (req, res) => {
  const loggedUser = req.body.user;
  if (loggedUser == null) {
    res.sendStatus(404);
  } else {
    const filteredArticles = posts.filter((post) => post.user === loggedUser);
    res.json(filteredArticles);
  }
});

app.post('/login', (req, res) => {
  const username = req.user;
  const user = { user: username };
  jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, (err, accessToken) => {
    if (err) {
      res.json("An error occurred");
      res.sendStatus(500);
    } else {
      res.json({ accessToken: accessToken });
    }
  });
});

function authenticateToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

app.listen(4000, () => {
  console.log("Server started listening on port 4000");
});

