const express = require('express');
const router = express.Router();
const postBank = require ('../seeds/postBank');
const timeAgo = require('node-time-ago');
// const postList = require ('../views/postList');

router.get("/", (req, res) => {
  const posts = postBank.list();
  // res.send(postList(posts));
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
          ${posts.map(post => /*html*/`
            <div class='news-item'>
              <p>
                <span class="news-position">${post.id}. ▲</span>
                  <a href="/posts/${post.id}">${post.title}</a>
                <small>(by ${post.name})</small>
              </p>
              <small class="news-info">
                ${post.upvotes} upvotes | ${timeAgo(post.date)}
              </small>
            </div>`
          ).join('')}
        </div>
      </body>
    </html>
  `)
});

module.exports = router;
