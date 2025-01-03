import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки

function createCard (link, name, onDelete, like, openImg) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', () => deleteCard(card));

  likeButton.addEventListener('click', likeCard);
  
  cardImage.addEventListener('click', openImg);
  
  return card;
}

// Удаление карточки

function deleteCard (card) {
  card.remove();
}

// Лайк

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };