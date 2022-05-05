import { settings, FormValidator } from "./FormValidator.js";
import Section from './Section.js';
import Card from "./Card.js";
import { Popup, PopupWithForm, PopupWithImage } from './Popup.js';
import UserInfo from "./UserInfo.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const placesList = document.querySelector(".elements__box");
const cardTemplate = document.querySelector("#addPlace-template").content;
const container = document.querySelector(".page");
const profile = container.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const nameJobPopup = document.querySelector(".popup_type_name");
const profileCloseButton = nameJobPopup.querySelector(".popup__close_name");
const newPlaceForm = container.querySelector(".popup_type_place");
const addingPlaceButton = profile.querySelector(".profile__add-button");
const closingPlaceForm = newPlaceForm.querySelector(".popup__close_place");
const newPlaceSubmit = newPlaceForm.querySelector(".popup__button_place-add");
const profileForm = document.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_el_heading");
const jobInput = profileForm.querySelector(".popup__input_el_subheading");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const bigImageForm = document.querySelector(".popup_type_image");
const bigImageClose = document.querySelector(".popup__close_image");
export const popupBigImage = bigImageForm.querySelector(".popup__big-image");
export const textFullScreen = bigImageForm.querySelector(".popup__text-fullscreen");
const popupList = document.querySelectorAll(".popup");
const popupFormPlace = document.querySelector(".popup__form_place");
const profileSaveButton = profileForm.querySelector(".popup__button");
const image = document.querySelector(".element__image");
const element = document.querySelector(".element");
const placeBox = document.querySelector(".element");
const inputPlace = document.querySelector(".popup__item-place");
const inputLink = document.querySelector(".popup__item-link");
const placeForm = document.querySelector(".popup__form_place");

//создание карточки
const cardList = new Section({ data: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, "#addPlace-template", handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
   }, '.elements__box');
  cardList.renderItems();


//добавить новую карточку
function addNewPlace(evt) {
  evt.preventDefault();

  const newCard = inputPlace.value;
  const newLink = inputLink.value;

  const cardElement = createCard(newCard, newLink);
  placesList.prepend(cardElement);

  placeForm.reset();
  handleCloseButtonClick(evt);
}

placeForm.addEventListener("submit", addNewPlace);


/*
//name and job form
function openPopupName() {
  //const userInfo = new UserInfo(profileName, profileJob);
  //userInfo.getUserInfo();


  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;


  //очищение текста ошибки
  nameFormValidated.clearErrors();
  nameFormValidated.activateBtn();

  //открываем попап
  const personalInfoForm = new PopupWithForm(nameJobPopup, {
    handlerFormSubmit: (evt) => {
      //evt.preventDefault();

      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
    }
  });
  personalInfoForm.openPopup();
  personalInfoForm.setEventListeners();
}

profileEditButton.addEventListener("click", openPopupName);
//profileForm.addEventListener("submit", handlerProfileSubmit);
//profileForm.addEventListener("submit", handlerFormSubmit);
*/

const personalInfoForm = new PopupWithForm(nameJobPopup, {
  handlerFormSubmit: (evt) => {
    //evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }
});

personalInfoForm.setEventListeners();
profileEditButton.addEventListener('click', () => {
  personalInfoForm.openPopup();
});

//add-new-place form
function openPopupPlace() {
  popupFormPlace.reset();
  //openPopup(newPlaceForm);

  //открываем попап
  const openPlaceForm = new PopupWithForm(popupFormPlace);
  openPlaceForm.openPopup();
  openPlaceForm.setEventListeners();


  placeFormValidated.clearErrors();
  placeFormValidated.toggleButtonState();
}

addingPlaceButton.addEventListener("click", openPopupPlace);

/*
//изменение информации о пользователе
function handlerProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  //handleCloseButtonClick(evt);
}
*/
//открыть большую картинку
function handleCardClick(name, link) {

  popupBigImage.src = link;
  textFullScreen.textContent = name;
  popupBigImage.alt = name;

  const zoomedPic = new PopupWithImage(bigImageForm);
  zoomedPic.openPopup({ link, name });
  zoomedPic.setEventListeners();

}


//валидация формы добавления нового места

const placeFormValidated = new FormValidator(settings, placeForm);
placeFormValidated.enableValidation();

//валидация формы изменения личной информации

const nameFormValidated = new FormValidator(settings, nameJobPopup);
nameFormValidated.enableValidation();


