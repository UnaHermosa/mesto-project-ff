import '../src/pages/index.css';

import { createCard } from '../src/components/card';
import { closeModal, openModal } from '../src/components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserData, getInitialCards, patchUserData, postNewCard } from './components/api';

import '../src/vendor/fonts/Inter-Black.woff2';
import '../src/vendor/fonts/Inter-Regular.woff2';

import '../src/images/add-icon.svg';
import '../src/images/card_1.jpg';
import '../src/images/card_2.jpg';
import '../src/images/card_3.jpg';
import '../src/images/close.svg';
import '../src/images/delete-icon.svg';
import '../src/images/edit-icon.svg';
import '../src/images/like-active.svg';
import '../src/images/like-inactive.svg';
import '../src/images/logo.svg';

const form = document.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');
const popupImg = document.querySelector('.popup_type_image');
const popupImageImg = popupImg.querySelector('.popup__image');
const popupImageDescription = popupImg.querySelector('.popup__caption');
const closeButtonImage = popupImg.querySelector('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = popupEdit.querySelector('.popup__close');
const profileName = form.querySelector('.popup__input_type_name');
const profileInputDescription = form.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const closeButtonNewCard = popupNewCard.querySelector('.popup__close');
const urlNewCard = popupNewCard.querySelector('.popup__input_type_url');
const placeNameNewCard = popupNewCard.querySelector('.popup__input_type_card-name');
const formNewCard = popupNewCard.querySelector('.popup__form');

let currentUserId = "";

// Объект с настройками валидации

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция для изменения текста кнопки сохранения в зависимости от процесса загрузки

function renderLoading(isLoading, formElement) {
  const buttonElement = formElement.querySelector('.popup__button')
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
}

// Реализация открытия и закрытия модального окна с изображением

function openImg(evt) {
  popupImageImg.src = evt.target.src;
  popupImageImg.alt = evt.target.alt;
  popupImageDescription.textContent = evt.target.alt;
  openModal(popupImg);
}

// Обработчик формы редактирования профиля

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEdit);

  const userData = {
    name: profileName.value,
    job: profileInputDescription.value
  };

  patchUserData(userData.name, userData.job)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileJob.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(false, popupEdit));
}

// Обработчик формы добавления новой карточки

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupNewCard);

  const userData = {
    link: urlNewCard.value,
    place: placeNameNewCard.value
  };

  postNewCard(userData.place, userData.link)
    .then((card) => {
      console.log(card);
      placesList.prepend(createCard(card.link, card.name, card._id, card.likes, openImg, card.owner._id, currentUserId));
      formNewCard.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupNewCard));
};

// Отрисовка карточек на странице

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatar.style.backgroundImage = `url(${userData.avatar}`;

    initialCards.forEach((card) => {
      placesList.append(createCard(card.link, card.name, card._id, card.likes, openImg, card.owner._id, currentUserId))
    });
  });

// Открытие и закрытие модального окна редактирования профиля

editProfileButton.addEventListener('click', () => {
  profileName.value = profileTitle.textContent;
  profileInputDescription.value = profileJob.textContent;
  clearValidation(popupEdit, validationSettings);
  openModal(popupEdit);
});

closeButtonEdit.addEventListener('click', () => closeModal(popupEdit));

// Открытие и закрытие модального окна добавления карточки

addButton.addEventListener('click', () => {
  formNewCard.reset();
  clearValidation(popupNewCard, validationSettings);
  openModal(popupNewCard);
});
closeButtonNewCard.addEventListener('click', () => closeModal(popupNewCard));

// Добавление новой карточки

formNewCard.addEventListener('submit', handleFormNewCardSubmit);

// Закрытие модального окна с изображением

closeButtonImage.addEventListener('click', () => closeModal(popupImg));

// Редактирование профиля

form.addEventListener('submit', handleFormEditSubmit);

enableValidation(validationSettings);
