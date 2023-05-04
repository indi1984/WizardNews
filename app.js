const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const postBank = require ('./postBank');

const app = express();
const PORT = 3000;

app.use(volleyball);
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = (/*html*/`
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
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Listening on port, ${PORT}`)
});
