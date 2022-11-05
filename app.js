const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const router = require("./routes/index");
const handleError = require("./middlewares/handle-error");

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

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
