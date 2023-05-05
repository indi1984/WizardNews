const express = require('express');

module.exports.errorHandler = (err, req, res, next) => {
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
};
