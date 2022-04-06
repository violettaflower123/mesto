//показать ошибку
function showError (form, input, errorMessage, settings) {
  const span = form.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  span.textContent = errorMessage;
  span.classList.add(settings.errorClass);
};

//скрыть ошибку
function hideError (form, input, settings) {
 const span = form.querySelector(`#${input.id}-error`);
 input.classList.remove(settings.inputErrorClass);
 span.classList.remove(settings.errorClass);
 span.textContent = '';
};

//изменение состояние кнопки
 function toggleButton (form, settings) {
   const button = form.querySelector(settings.submitButtonSelector);
   const isValid = form.checkValidity();

  //если форма невалидна - скрыть кнопку
  if (isValid) {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', false);
  }

 };


 //слушатели
 function setEventListeners (form, settings) {
    const inputList = form.querySelectorAll(settings.inputSelector);
    toggleButton(form, settings);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
      if(!input.validity.valid) {
      showError(form, input, input.validationMessage, settings);
      } else {
      hideError(form, input, settings);

      };
      toggleButton(form, settings);
      });
    });

 };

 //все формы
 function enableValidation (settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((form) => {
    setEventListeners(form, settings);
    toggleButton(form, settings);
  });

};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


/*
const form = document.querySelector('.popup');
const formInput = form.querySelector('.popup__input');
const formError = form.querySelector(`.${formInput.id}-error`);

const showInputError = (formEl, inputElement, errorMessage) => {
  const errorElement = formEl.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formEl, inputElement) => {
  const errorElement = formEl.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formEl, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formEl, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formEl, inputElement);
  }
};

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity(form, formInput);
});

function setEventListeners(formEl) {
  const inputList = Array.from(formEl.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(formEl, inputElement);
  });
});

};

setEventListeners(form);
*/
