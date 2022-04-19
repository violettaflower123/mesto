import {settings, FormValidator, placeForm, nameJobPopup , placeFormValidated , nameFormValidated } from "./FormValidator.js";
import {Card, initialCards} from "./Card.js";

const placesList = document.querySelector(".elements__box");
const cardTemplate = document.querySelector("#addPlace-template").content;
const container = document.querySelector(".page");
const profile = container.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileCloseButton = nameJobPopup.querySelector(".popup__close_name");
const newPlaceForm = container.querySelector(".popup_type_place");
const addingPlaceButton = profile.querySelector(".profile__add-button");
const closingPlaceForm = newPlaceForm.querySelector(".popup__close_place");
const newPlaceSubmit = newPlaceForm.querySelector('.popup__button_place-add');
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_el_heading");
const jobInput = formElement.querySelector(".popup__input_el_subheading");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const popupCloseButtons = document.querySelectorAll('.popup__close');
const bigImageForm = document.querySelector('.popup_type_image');
const bigImageClose = document.querySelector('.popup__close_image');
export const popupBigImage = bigImageForm.querySelector('.popup__big-image');
export const textFullScreen = bigImageForm.querySelector('.popup__text-fullscreen');
const popupList = document.querySelectorAll('.popup');
const popupFormPlace = document.querySelector('.popup__form_place');
const profileSaveButton = formElement.querySelector('.popup__button');
const image = document.querySelector('.element__image');
const element = document.querySelector('.element');
const placeBox = document.querySelector(".element");
const form = document.querySelector('.popup__form');

//open popups
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
};

//close popups
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp);
};

function handleCloseButtonClick (evt) {
  closePopup(evt.target.closest('.popup'));
};


//добавить новую карточку
function addNewPlace(evt) {
  evt.preventDefault();

  const newCard = document.querySelector('.popup__item-place').value;
  const newLink = document.querySelector('.popup__item-link').value;


  const card = new Card(newCard, newLink);
  const cardElement = card.generateCard();

  placesList.prepend(cardElement);

  placeForm.reset();
  handleCloseButtonClick (evt);

}

placeForm.addEventListener("submit", addNewPlace);

//сабмит при клике на Enter
form.addEventListener('keydown', function (evt) {
  if(evt.code === "Enter") {
    form.submit();
  }
});

//закрытие попапа при клике на ESC
const handleEscUp = (evt) => {

  if (evt.code == 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

//закрытие попапа по клику на оверлей
popupList.forEach((modalWindow) => {
  modalWindow.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(modalWindow);
  }
});
});

//name and job form
function openPopupName() {

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;


//очищение текста ошибки
  nameFormValidated.clearErrors();
/*
  profileSaveButton.removeAttribute('disabled');
  profileSaveButton.classList.remove('popup__button_disabled');
*/
  nameFormValidated.activateBtn(nameJobPopup);

  openPopup(nameJobPopup);
};

profileEditButton.addEventListener("click", openPopupName);

//add-new-place form
function openPopupPlace() {
  popupFormPlace.reset();
  openPopup(newPlaceForm);

  const inputList = popupFormPlace.querySelectorAll('.popup__input');
  const errorText = popupFormPlace.querySelectorAll('.popup__error');
  const submitButton = popupFormPlace.querySelector('.popup__button');

  errorText.forEach((error) => {
    error.textContent = '';
  });

  inputList.forEach((errorInput) => {
    errorInput.classList.remove('popup__input_type_error');
  });

  placeFormValidated.toggleButtonState(inputList, submitButton, popupFormPlace);
};

addingPlaceButton.addEventListener("click", openPopupPlace);


function handlerProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  handleCloseButtonClick (evt);
};

formElement.addEventListener("submit", handlerProfileSubmit);

export { bigImageForm, openPopup };
