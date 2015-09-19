import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';

let appRoot = path.join(__dirname, '../../');
const templateFile = path.join(appRoot, 'src/server', 'react.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

const server = express();
server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(appRoot, 'src/server', 'public')));
server.use('/dist', express.static(path.join(appRoot, 'dist')));

server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: 'Redux Demo', description: '', css: '', body: '' };
    const html = template(data);
    res.status(statusCode).send(html);
  } catch (err) {
    next(err);
  }
});

export function startServer() {
  return new Promise(function(resolve, reject) {
    server.listen(server.get('port'), () => {
      if (process.send) {
        process.send('online');
      }
      resolve();
      console.log('The server is running at http://localhost:' + server.get('port'));
    });
  })
}