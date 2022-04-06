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
  if (!isValid) {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', false);
  } else {
    //если валидна - показать
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
 };


 //очистить попап
 function toggleButtonView (button, settings) {
  button.toggleAttribute('disabled');
  button.classList.toggle('popup__button_disabled');
};


 //слушатели
 function setEventListeners (form, settings) {
    const inputList = form.querySelectorAll(settings.inputSelector);
    const button = form.querySelector(settings.submitButtonSelector);

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


