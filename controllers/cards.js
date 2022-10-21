const Card = require('../models/cards');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => console.log(err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((newCard) => res.send(newCard))
    .catch((err) => console.log(err));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => console.log(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
