import './pages/index.css';

import { createCard } from '../src/components/card';
import { closeModal, openModal } from '../src/components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserData, getInitialCards, updateUserData, postNewCard, updateAvatar } from './components/api';

const form = document.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const avatarImg = document.querySelector('.profile__image');
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
const popupEditAvatar = document.querySelector('.popup_type_new-avatar');
const formNewAvatar = popupEditAvatar.querySelector('.popup__form');
const inputNewAvatar = formNewAvatar.querySelector('.popup__input_type_avatar');
const closeButtonEditAvatar = popupEditAvatar.querySelector('.popup__close');
const modalDelete = document.querySelector('.popup_type_delete');
const confirmButton = modalDelete.querySelector('.popup__button');
const closeButtunModalDelete = modalDelete.querySelector('.popup__close');

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

function openImg(link, name) {
  popupImageImg.src = link;
  popupImageImg.alt = name;
  popupImageDescription.textContent = name;
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

  updateUserData(userData.name, userData.job)
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
      placesList.prepend(createCard(card.link, card.name, card._id, card.likes, openImg, card.owner._id, currentUserId, modalDelete, confirmButton));
      formNewCard.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupNewCard));
};

// Обработчик формы изменения аватара

function handleFormNewAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditAvatar);
  
  updateAvatar(inputNewAvatar.value)
    .then((avatar) => {
      avatarImg.style.backgroundImage = `url${avatar.avatar}`;
      formNewAvatar.reset();
      closeModal(popupEditAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, popupEditAvatar));
};

// Отрисовка карточек на странице

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatarImg.style.backgroundImage = `url(${userData.avatar}`;

    initialCards.forEach((card) => {
      placesList.append(createCard(card.link, card.name, card._id, card.likes, openImg, card.owner._id, currentUserId, modalDelete, confirmButton))
    })
  })
  .catch((err) => console.log(err));

// Открытие и закрытие модального окна редактирования аватара

avatarImg.addEventListener('click', () => {
  formNewAvatar.reset();
  clearValidation(formNewAvatar, validationSettings);
  openModal(popupEditAvatar);
});

closeButtonEditAvatar.addEventListener('click', () => closeModal(popupEditAvatar));

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

// Редактирование аватара

formNewAvatar.addEventListener('submit', handleFormNewAvatarSubmit);

// Закрытие модального окна подтверждения удаления карточки

closeButtunModalDelete.addEventListener('click', () => closeModal(modalDelete));

enableValidation(validationSettings);
