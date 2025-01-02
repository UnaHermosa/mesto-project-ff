import '../src/pages/index.css';
import {initialCards} from '../src/scripts/cards';

import { createCard, deleteCard } from '../src/components/card';
import { closeModal, openModal } from '../src/components/modal';

import './vendor/fonts/Inter-Black.woff2';
import './vendor/fonts/Inter-Medium.woff2';
import './vendor/fonts/Inter-Regular.woff2';

import './images/add-icon.svg';
import '../src/images/avatar.jpg';
import './images/card_1.jpg';
import './images/card_2.jpg';
import './images/card_3.jpg';
import './images/close.svg';
import './images/delete-icon.svg';
import './images/edit-icon.svg';
import './images/like-active.svg';
import './images/like-inactive.svg';
import './images/logo.svg';

// Отрисовка карточек на странице

const placesList = document.querySelector('.places__list');

initialCards.forEach(item => placesList.append(createCard(item.link, item.name, deleteCard)));

// Открытие и закрытие попапа редактирования профиля

const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupClose = popup.querySelector('.popup__close');

editProfileButton.addEventListener('click', () => openModal(popupEdit));
popupClose.addEventListener('click', () => closeModal(popupEdit));

// Открытие и закрытие попапа изображения карточки

