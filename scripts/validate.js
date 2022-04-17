/*
//показать ошибку
const showInputError = (form, input, errorMessage, settings) => {
  const span = form.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass );
  span.textContent = errorMessage;
  span.classList.add(settings.errorClass);
};

//скрыть ошибку
const  hideInputError = (form, input, settings) => {
  const span = form.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  span.classList.remove(settings.errorClass);
  span.textContent = '';
};

//есть ли невалидный инпут
const hasInvalidInput = ([...inputList]) => {
  return inputList.some(input => {

    return !input.validity.valid;
  })
};

//изменить состояние кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.classList.remove(settings.submitButtonSelector);
    buttonElement.setAttribute('disabled', false);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.classList.add(settings.submitButtonSelector);
    buttonElement.removeAttribute('disabled');
  }
};

//проверить валидность
const checkInputValidity = (form, input, settings) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
};

//слушатели
const setEventListeners = (form, settings) => {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);

  toggleButtonState (inputList, buttonElement, settings);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, settings);
      toggleButtonState (inputList, buttonElement, settings);
    });
  });
};

//валидация всех форм
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
      setEventListeners(form, settings);
    });
};

//вызов валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

*/



const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this.formSelector = settings.formSelector;
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
  }

  //показать ошибку
  _showInputError(input, errorMessage) {
    const span = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this.inputErrorClass);
    span.textContent = errorMessage;
    span.classList.add(this.errorClass);

    /*
    const span = this.form.querySelectorAll(this.errorClass);
    span.forEach((item) => {
      item.textContent = errorMessage;
      item.classList.add(this.errorClass);
    });

    const errorBorder = this.form.querySelectorAll(this.inactiveButtonClass);
    errorBorder.forEach((item) => {
      item.classList.add(this.inputErrorClass);
    });
    */

  }
}

const formList = Array.from(document.querySelectorAll(settings.formSelector));
formList.forEach((form) => {
    const validator = new FormValidator(form);
    validator._showInputError();
  });





