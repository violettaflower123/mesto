const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

 const someInput = document.querySelector(config.inputSelector);

 function handleInput (evt) {
  const form = evt.currentTarget;
  const input = evt.target;


  if(!input.validity.valid) {
    showError(input);
  } else {
    hideError(input);
  };

  toggleButton(form);
 };

 function showError (input) {
   const span = document.querySelector(`#${input.id}-error`);
   input.classList.add(config.inputErrorClass);
   span.textContent = input.validationMessage;
   span.classList.add(config.errorClass);
 };

 function hideError (input) {
  const span = document.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  span.classList.remove(config.errorClass);
  span.textContent = '';
 };
/*
 function hasInvalidInput () {
   const inputList = Array.from(document.querySelec)
 }
 */

 function toggleButton (form) {
   const buttons = document.querySelectorAll(config.submitButtonSelector);
   const isValid = form.checkValidity();

    buttons.forEach((button) => {

  if (isValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', false);
  }

});
 };


 function setEventListeners (evt) {
    const inputList = document.querySelectorAll(config.inputSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', handleInput);
    });

 };

 setEventListeners();
 someInput.addEventListener('input', handleInput);


 function enableValidation () {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    setEventListeners(form);
    toggleButton(form);
  });

};

enableValidation(config);
