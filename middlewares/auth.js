const jwt = require("jsonwebtoken");
const UnauthError = require("../utils/errors/unauth-err");

const auth = (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    throw new UnauthError("Необходима авторизация");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    next(new UnauthError("Необходима авторизация"));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
