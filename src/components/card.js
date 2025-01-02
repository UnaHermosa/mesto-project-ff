const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки

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

// Удаление карточки

function deleteCard (card) {
  card.remove();
}

export { createCard, deleteCard };