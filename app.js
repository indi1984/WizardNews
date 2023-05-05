const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const homeRoutes = require ('./routes/home');
const postRoutes = require ('./routes/posts');
const errorHandler = require ('./middleware/errorHandler');

const app = express();
const { PORT = 3000 } = process.env;

app.use(volleyball);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);
app.use('/posts', postRoutes);
// app.use(errorHandler);

//! Error Handler middleware
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
  console.log(`Listening on port: ${PORT}`)
});
