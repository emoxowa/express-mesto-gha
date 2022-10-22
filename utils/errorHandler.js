// eslint-disable-next-line no-unused-vars
const mongoose = require("mongoose");

const ERRORS = {
  ERROR_400: {
    CODE: 400,
    MESSAGE: "400 — Переданы некорректные данные",
  },
  ERROR_404: {
    CODE: 404,
    MESSAGE: "404 — Запрашиваемый ресурс не найден",
  },
  ERROR_500: {
    CODE: 500,
    MESSAGE: "500 — На сервере произошла ошибка",
  },
};

const handleError = (res, err) => {
  if (
    err instanceof mongoose.Error.CastError
    || err instanceof mongoose.Error.ValidationError
  ) {
    res
      .status(ERRORS.ERROR_400.CODE)
      .send({ message: ERRORS.ERROR_400.MESSAGE });
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res
      .status(ERRORS.ERROR_404.CODE)
      .send({ message: ERRORS.ERROR_404.MESSAGE });
  } else {
    res
      .status(ERRORS.ERROR_500.CODE)
      .send({ message: ERRORS.ERROR_500.MESSAGE });
  }
};

module.exports = { handleError };
