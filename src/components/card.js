import { setLikeToCard, removeCard } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки

function createCard (link, name, cardId, like, openImg, ownerId, userId) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likesCount = card.querySelector('.card__like-counter');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likesCount.textContent = like.length;
  
  if(ownerId !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => deleteCard(card));
  }

  likeButton.addEventListener('click', () => likeCard(likeButton, cardId, likesCount));
  
  cardImage.addEventListener('click', openImg);

  return card;
}

// Удаление карточки

function deleteCard (card) {
  card.remove();
}

// Лайк

function likeCard(likeButton, cardId, likesCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  setLikeToCard(cardId, isLiked)
    .then((renewCard) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCount.textContent = renewCard.likes.length;
    })
    .catch((err) => console.log(err));
}

export { createCard, deleteCard, likeCard };