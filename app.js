const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const path = require("path");

const routers = require("./routers");
const { NotFoundError } = require("./errors/errors");
const { ResourceNotFoundMessage } = require("./errors/errorsMessages");
const errorsHandler = require("./middlewares/errorsHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT, dbURI } = require("./config");

const app = express();

//  Подключаемся к серверу mongo
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});

//  Успешно подключились к БД
mongoose.connection.on("connected", () => {
  console.log(`Mongoose запущен ${dbURI}`);
  app.listen(PORT, () => {
    console.log("Сервер запущен");
  });
});

//  Ошибка подключения к БД
mongoose.connection.on("error", (err) => {
  console.log(`Mongoose ошибка подключения: ${err}`);
  process.exit(1);
});

//  Отключились от БД
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose подключение завершено");
});

//  Заполняем req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//  логгер запросов
// app.use(requestLogger);

// app.use("/", routers);
// app.use("*", () => {
//   throw new NotFoundError(ResourceNotFoundMessage);
// });

// логгер ошибок
// app.use(errorLogger);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "front", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "_front", "build", "index.html"));
  });
}

//  Обработчик ошибок celebrate
// app.use(errors());

app.use(errorsHandler);
