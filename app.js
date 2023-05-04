const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const timeAgo = require('node-time-ago');
const postBank = require ('./postBank');
// const postList = require ('./views/postList.js');
// const postDetails = require ('./views/postDetails.html');
// const errorHandler = require ('./views/errorHandler.html');

const app = express();
const PORT = 3000;

app.use(volleyball);
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
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
                ${post.title}
                <small>(by ${post.name})</small>
              </p>
              <small class="news-info">
                ${post.upvotes} upvotes | ${post.date}
              </small>
            </div>`
          ).join('')}
        </div>
      </body>
    </html>
  `)
});

app.get('/posts/:id', (req, res, next) => {
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
                  ${post.upvotes} upvotes | ${post.date}
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

app.use((err, req, res, next) => {
  res.status(404);
  // res.send(errorHandler());
  res.send(/*html*/`
    <!DOCTYPE html>
      <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <header><img src="/logo.png"/>Wizard News</header>
        <div class="not-found">
          <p>404: Page Not Found</p>
        </div>
      </body>
    </html>
  `)
});

app.listen(PORT, () => {
  console.log(`Listening on port, ${PORT}`)
});
