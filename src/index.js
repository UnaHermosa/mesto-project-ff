import '../src/pages/index.css';
import {initialCards} from '../src/scripts/cards';

import { createCard, deleteCard, likeCard } from '../src/components/card';
import { closeModal, openModal } from '../src/components/modal';

import '../src/vendor/fonts/Inter-Black.woff2';
import '../src/vendor/fonts/Inter-Regular.woff2';

import '../src/images/add-icon.svg';
import '../src/images/avatar.jpg';
import '../src/images/card_1.jpg';
import '../src/images/card_2.jpg';
import '../src/images/card_3.jpg';
import '../src/images/close.svg';
import '../src/images/delete-icon.svg';
import '../src/images/edit-icon.svg';
import '../src/images/like-active.svg';
import '../src/images/like-inactive.svg';
import '../src/images/logo.svg';

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');


// Реализация открытия и закрытия модального окна с изображением

const popupImg = document.querySelector('.popup_type_image');
const popupImageImg = popupImg.querySelector('.popup__image');
const popupImageDescription = popupImg.querySelector('.popup__caption');
const closeButtonImage = popupImg.querySelector('.popup__close');

function openImg(evt) {
  popupImageImg.src = evt.target.src;
  popupImageImg.alt = evt.target.alt;
  popupImageDescription.textContent = evt.target.alt;
  openModal(popupImg);
}

closeButtonImage.addEventListener('click', () => closeModal(popupImg));

// Отрисовка карточек на странице

initialCards.forEach(item => placesList.append(createCard(item.link, item.name, deleteCard, likeCard, openImg)));

// Открытие и закрытие модального окна редактирования профиля

const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = popupEdit.querySelector('.popup__close');

editProfileButton.addEventListener('click', () => {
  profileName.value = profileTitle.textContent;
  profileInputDescription.value = profileJob.textContent;
  openModal(popupEdit);
});
closeButtonEdit.addEventListener('click', () => closeModal(popupEdit));

// Обработчик формы редактирования профиля

const formEdit = popupEdit.querySelector('.popup__form');
const profileName = formEdit.querySelector('.popup__input_type_name');
const profileInputDescription = formEdit.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.value = profileTitle.textContent;
  profileInputDescription.value = profileJob.textContent;
}

formEdit.addEventListener('submit', handleFormSubmit);

// Открытие и закрытие модального окна добавления карточки

const popupNewCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const closeButtonNewCard = popupNewCard.querySelector('.popup__close');
const urlNewCard = popupNewCard.querySelector('.popup__input_type_url');
const placeNameNewCard = popupNewCard.querySelector('.popup__input_type_card-name');

addButton.addEventListener('click', () => openModal(popupNewCard));
closeButtonNewCard.addEventListener('click', () => closeModal(popupNewCard));

// Добавление карточки
const formNewCard = popupNewCard.querySelector('.popup__form');

function addCard() {
  const cardData = {
    url: urlNewCard.value,
    place: placeNameNewCard.value
  }
  
  placesList.prepend(createCard(cardData.url, cardData.place, deleteCard, likeCard, openImg));
}

formNewCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addCard();
  formNewCard.reset();
  closeModal(popupNewCard);
});