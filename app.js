const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const NotFoundError = require("./utils/errors/not-found-err");
const { validateLogin, validateUserCreate } = require("./middlewares/validate-user");

mongoose
  .connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

app.post("/signup", validateUserCreate, createUser);
app.post("/signin", validateLogin, login);

app.use("*", () => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
