import './index.css';
import { settings, FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from '../components/PicturePopup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";


const initialCards = [
  {
    name: "Cappadocia",
    link: "https://images.unsplash.com/photo-1569530593440-e48dc137f7d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Bozcaada",
    link: "https://images.unsplash.com/photo-1583059934814-1c5043178d25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Santorini",
    link: "https://images.unsplash.com/photo-1560703649-e3055f28bcf8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Tbilisi",
    link: "https://images.unsplash.com/photo-1589786381692-3a58c80b3f9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80",
  },
  {
    name: "Phuket",
    link: "https://images.unsplash.com/photo-1494949360228-4e9bde560065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Great Wall of China",
    link: "https://images.unsplash.com/photo-1571822325911-c01620a65e86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
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

//валидация формы добавления нового места

const placeFormValidated = new FormValidator(settings, placeForm);
placeFormValidated.enableValidation();

//валидация формы изменения личной информации

const nameFormValidated = new FormValidator(settings, nameJobPopup);
nameFormValidated.enableValidation();


//создать новую карточку
function createCard(name, link) {
  const card = new Card(name, link, "#addPlace-template", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

//создание карточек из исходного массива
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#addPlace-template",
        handleCardClick
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements__box"
);
cardList.renderItems();


const userInfo = new UserInfo({ name: ".profile__title",profession: ".profile__subtitle" });

const personalInfoForm = new PopupWithForm(nameJobPopup, {
  handleFormSubmit: ({ name, profession }) => {
    userInfo.setUserInfo({ name, profession });

  },
});

personalInfoForm.setEventListeners();
profileEditButton.addEventListener("click", () => {
  personalInfoForm.openPopup();
//наполняем инпуты при открытии формы
personalInfoForm.setInputValues();

nameFormValidated.clearErrors();
nameFormValidated.activateBtn();

});


//добавление новой карточки
const placeAddForm = new PopupWithForm(newPlaceForm, {
  handleFormSubmit: ({ name, link }) => {

    const card = createCard(name, link);
    cardList.addItem(card);
  } });

placeAddForm.setEventListeners();
addingPlaceButton.addEventListener("click", () => {
  placeAddForm.openPopup();
  placeFormValidated.toggleButtonState();
  placeFormValidated.clearErrors();
});

//placeFormValidated.clearErrors();


//открыть большую картинку
function handleCardClick(name, link) {
  popupBigImage.src = link;
  textFullScreen.textContent = name;
  popupBigImage.alt = name;

  const zoomedPic = new PopupWithImage(bigImageForm);
  zoomedPic.openPopup({ link, name });
  zoomedPic.setEventListeners();
}
