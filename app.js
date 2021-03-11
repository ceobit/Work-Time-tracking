const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const path = require('path');

const routers = require('./routers');
const { NotFoundError } = require('./errors/errors');
const { ResourceNotFoundMessage } = require('./errors/errorsMessages');
const errorsHandler = require('./middlewares/errorsHandler');

const { PORT, dbURI } = require('./config');

const app = express();

//  Connect to mongo
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: false,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose запущен ${dbURI}`);
  app.listen(PORT, () => {
    console.log('Сервер запущен');
  });
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose ошибка подключения: ${err}`);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose подключение завершено');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/', routers);
app.use('*', () => {
  throw new NotFoundError(ResourceNotFoundMessage);
});

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'front', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '_front', 'build', 'index.html'));
  });
}

app.use(errorsHandler);
