const config = {
  urlBase: 'https://mesto.nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: 'd6ce37eb-45b3-48c2-a710-50a452344d8f',
    'Content-Type': 'application/json'
  },
};

// Прооверка получения ответа с сервера

function getResponse (res) {
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
    .then(getResponse)
    .then((res) => console.log(res));
};

export { getUserData };