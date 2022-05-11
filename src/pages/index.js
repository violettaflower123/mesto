import './index.css';
import { settings,
  initialCards,
  container,
  profile,
  profileEditButton,
  nameJobPopup,
  newPlaceForm,
  addingPlaceButton,
  profileForm,
  bigImageForm,
  popupBigImage,
  textFullScreen,
  placeForm } from '../utils/constants.js';
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";

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
      const cardElement = createCard(item.name, item.link);
      cardList.addItem(cardElement);
    },
  },
  ".elements__box"
);
cardList.renderItems();

//инфо о пользователе
const userInfo = new UserInfo({ name: ".profile__title",profession: ".profile__subtitle" });

const personalInfoForm = new PopupWithForm('.popup_type_name', {
  handleFormSubmit: ({ name, profession }) => {
    userInfo.setUserInfo({ name, profession });

  },
});

personalInfoForm.setEventListeners();
profileEditButton.addEventListener("click", () => {
  personalInfoForm.openPopup(userInfo.getUserInfo());
//наполняем инпуты при открытии формы
personalInfoForm.setInputValues();

nameFormValidated.clearErrors();
nameFormValidated.activateBtn();

});


//добавление новой карточки
const placeAddForm = new PopupWithForm('.popup_type_place', {
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

//увеличенная картинка
const zoomedPic = new PopupWithImage('.popup_type_image');
zoomedPic.setEventListeners();
function handleCardClick(name, link) {
  zoomedPic.openPopup({ link, name });
}
