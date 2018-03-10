const express = require('express');
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT;

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, error => {
      if (error) throw error;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(exception => {
    console.log(exception.stack);
    process.exit(1);
  });
