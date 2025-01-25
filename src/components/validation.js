//Добавление полю ввода класса с ошибкой

function showInputerror (formElement, inputElement, errorMessage, validationSettings) {
  
  //Находит элемент формы по Id для вывода текста ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.inputErrorClass);
 };

//Удаление класса с ошибкой у валидного поля ввода

function hideInputError (formElement, inputElement, validationSettings) {
  //Находит элемент формы по Id для вывода текста ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.textContent = '';
};

//Поиск невалидных полей ввода

function hasInvalidInput (inputList) {
  return inputList.some((input) => {return !input.validity.valid});
};

// Блокирование.разблокирование кнопки отправки данных формы

function toggleButtonState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

//Валидация формы и вывод текста ошибок

function isValid (formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputerror(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Добавление обработчиков событий всем фполям ввода в форме

function setEventListeners (formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));

  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(formElement, element);
      toggleButtonState(inputList, buttonElement);
    })
  })
};

//Поиск всех форм на странице и добавления им обработчиков событий

function enableValidation (validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((form) => {
    setEventListeners(form);
  })
};

// Очистка формы от текстов ошибок валидации

function clearValidation (formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  
  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });
  toggleButtonState(inputList, buttonElement);
};

export { enableValidation, clearValidation };