// Открытие модального окна

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

// Закрытие модального окна

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

export { openModal, closeModal };