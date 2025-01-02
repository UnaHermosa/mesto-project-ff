import '../src/pages/index.css';

import './vendor/fonts/Inter-Black.woff2';
import './vendor/fonts/Inter-Medium.woff2';
import './vendor/fonts/Inter-Regular.woff2';

import './images/add-icon.svg';
import './images/avatar.jpg';
import './images/card_1.jpg';
import './images/card_2.jpg';
import './images/card_3.jpg';
import './images/close.svg';
import './images/delete-icon.svg';
import './images/edit-icon.svg';
import './images/like-active.svg';
import './images/like-inactive.svg';
import './images/logo.svg';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (link, name, onDelete) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', () => deleteCard(card));
  
  return card;
}

function deleteCard (card) {
  card.remove();
}

initialCards.forEach(item => placesList.append(createCard(item.link, item.name, deleteCard)));

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу