const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { ERRORS } = require("../utils/constants");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(ERRORS.ERROR_500.CODE)
        .send({ message: ERRORS.ERROR_500.MESSAGE });
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error("notValidId"))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("notValidId"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(ERRORS.ERROR_400.CODE)
          .send({ message: ERRORS.ERROR_400.MESSAGE });
      } else if (err.message === "notValidId") {
        res
          .status(ERRORS.ERROR_404.CODE)
          .send({ message: ERRORS.ERROR_404.MESSAGE });
      } else {
        res
          .status(ERRORS.ERROR_500.CODE)
          .send({ message: ERRORS.ERROR_500.MESSAGE });
      }
    });
};

const createUser = (req, res) => {
  console.log(req.body);
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((newUser) => res.send({
      newUser,
    }))
    .catch((err) => {
      console.log(err);
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error("notValidId"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res
          .status(ERRORS.ERROR_400.CODE)
          .send({ message: ERRORS.ERROR_400.MESSAGE });
      } else if (err.message === "notValidId") {
        res
          .status(ERRORS.ERROR_404.CODE)
          .send({ message: ERRORS.ERROR_404.MESSAGE });
      } else {
        res
          .status(ERRORS.ERROR_500.CODE)
          .send({ message: ERRORS.ERROR_500.MESSAGE });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error("notValidId"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res
          .status(ERRORS.ERROR_400.CODE)
          .send({ message: ERRORS.ERROR_400.MESSAGE });
      } else if (err.message === "notValidId") {
        res
          .status(ERRORS.ERROR_404.CODE)
          .send({ message: ERRORS.ERROR_404.MESSAGE });
      } else {
        res
          .status(ERRORS.ERROR_500.CODE)
          .send({ message: ERRORS.ERROR_500.MESSAGE });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        "some-secret-key",
        { expiresIn: "7d" },
      );
      res.cookie("authorization", token, {
        httpOnly: true,
        maxAge: 3600000 * 24 * 7,
        sameSite: true,
      });
      console.log("ti jopa");
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
