const express = require('express');
const router = express.Router();
const postBank = require ('../postBank');
const timeAgo = require('node-time-ago');
// const postDetails = require ('../views/postDetails');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    next(err);
  } else {
    // res.send(postDetails(post));
    res.send(/*html*/`
      <!DOCTYPE html>
        <html>
        <head>
          <title>Wizard News</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <div class="news-list">
            <header><img src="/logo.png"/>Wizard News</header>
              <div class='news-item'>
                <p>
                  <span class="news-position">${post.id}. ▲</span>
                  ${post.title}
                  <small>(by ${post.name})</small>
                </p>
                <small class="news-info">
                  ${post.upvotes} upvotes | ${timeAgo(post.date)}
                </small>
                <p>
                  ${post.content}
                </p>
              </div>
          </div>
        </body>
      </html>
    `)
  };
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  next()
});

module.exports = router;
