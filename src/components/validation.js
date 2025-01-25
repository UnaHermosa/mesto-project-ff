//Добавление полю ввода класса с ошибкой

function showInputerror (formElement, inputElement, errorMessage) {
  
  //Находит элемент формы по Id для вывода текста ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
 };

//Удаление класса с ошибкой у валидного поля ввода

function hideInputError (formElement, inputElement) {
  //Находит элемент формы по Id для вывода текста ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
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

function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(formElement, element);
      toggleButtonState(inputList, buttonElement);
    })
  })
};

//Поиск всех форм на странице и добавления им обработчиков событий

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((form) => {
    setEventListeners(form);
  })
};

// Очистка формы от текстов ошибок валидации

function clearValidation (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  
  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });
  toggleButtonState(inputList, buttonElement);
};

export { enableValidation, clearValidation };