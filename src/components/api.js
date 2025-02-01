const config = {
  urlBase: 'https://mesto.nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: 'd6ce37eb-45b3-48c2-a710-50a452344d8f',
    'Content-Type': 'application/json'
  },
};

// Прооверка получения ответа с сервера

function getResponse(res) {
  if(res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status, res.statusText}`);
};

// Запрос данных о пользовтаеле с сервера

function getUserData() {
  return fetch(`${config.urlBase}/users/me`, {
    headers: config.headers
    })
    .then(getResponse);
};

// Загрузка карточек с сервера

function getInitialCards() {
  return fetch(`${config.urlBase}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(getResponse);
};

// Редактирование данных профиля

function updateUserData(name, about) {
  return fetch(`${config.urlBase}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then(getResponse);
};

// Добавление новой карточки

function postNewCard(name, link) {
  return fetch(`${config.urlBase}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(getResponse);
};

// Добавление лайка

function setLikeToCard(cardId, isLiked) {
  return fetch(`${config.urlBase}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  })
  .then(getResponse);
};

function removeCard(cardId) {
  return fetch(`${config.urlBase}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse);
};

function updateAvatar() {
  return fetch(`${config.urlBase}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar})
  })
  .then(getResponse);
};

export { getUserData, getInitialCards, updateUserData, postNewCard, setLikeToCard, removeCard, updateAvatar };