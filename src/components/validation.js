//Добавление полю ввода класса с ошибкой

function showInputerror(formElement, inputElement, errorMessage, validationSettings) {
  
  //Находит элемент формы по Id для вывода текста ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
 };

//Удаление класса с ошибкой у валидного поля ввода
function hideInputError(formElement, inputElement, validationSettings) {
  
  //Находит элемент формы по Id для вывода текста ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

//Поиск невалидных полей ввода
function hasInvalidInput(inputList) {
  return inputList.some((input) => {return !input.validity.valid});
};

// Блокирование.разблокирование кнопки отправки данных формы
function toggleButtonState (inputList, buttonElement, validationSettings) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

//Валидация формы и вывод текста ошибок
function isValid(formElement, inputElement, validationSettings) {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if(!inputElement.validity.valid) {
    showInputerror(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

//Добавление обработчиков событий всем фполям ввода в форме
function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  inputList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(formElement, element, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    })
  })
};

//Поиск всех форм на странице и добавления им обработчиков событий
function enableValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, validationSettings);
  })
};

// Очистка формы от текстов ошибок валидации
function clearValidation(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  
  inputList.forEach((input) => {
    hideInputError(formElement, input, validationSettings);
  });
  toggleButtonState(inputList, buttonElement, validationSettings);
};

export { enableValidation, clearValidation };