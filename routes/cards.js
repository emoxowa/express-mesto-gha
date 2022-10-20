const cardsRouter = require("express").Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", deleteCard);
cardsRouter.put("/:cardId/likes", putLike);
cardsRouter.delete("/:cardId/likes", deleteLike);

module.exports = cardsRouter;