// Открытие модального окна

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleCloseByEsc);
  popup.addEventListener('click', handlerCloseByOverlay);
}

// Закрытие модального окна

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleCloseByEsc);
  popup.removeEventListener('click', handlerCloseByOverlay);
}

// Закрытие модального окна при нажатии Esc

function handleCloseByEsc(evt) {
  if(evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpened);
  }
}

// Закрытие модального окна при клике на оверлей

function handlerCloseByOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}

export { openModal, closeModal };