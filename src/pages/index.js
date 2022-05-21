import "./index.css";
import {
  settings,
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
  placeForm,
  avatarEdit
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

//валидация формы добавления нового места

const placeFormValidated = new FormValidator(settings, placeForm);
placeFormValidated.enableValidation();

//валидация формы изменения личной информации

const nameFormValidated = new FormValidator(settings, nameJobPopup);
nameFormValidated.enableValidation();

const cardList = new Section();

//получение данных о карточках с сервера
const cardListApi = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41/cards",
  headers: {
    "Content-Type": "application/json",
    authorization: "a0ee0daa-dcb0-4304-ba97-98bdc5d8faf1",
  },
});

const createCardsApi = cardListApi.getData();

//создать новую карточку
function createCard(data) {
  const card = new Card(data, "#addPlace-template", handleCardClick, cardListApi);
  const cardElement = card.generateCard();
  card.setNumberOfLikes();

  return cardElement;
}

//добавление карточек с сервера
createCardsApi
  .then((data) => {
    cardList.init(
      {
        items: data,
        renderer: (data) => {
          const cardElement = createCard(data);
          cardList.addItem(cardElement);
        },
      },
      ".elements__box",
      cardListApi
    );
    cardList.renderItems();
  })
  .catch((err) => alert(err));


//получим инфо о пользователе с сервера
const userInfoApi = new Api({
  url: "https://nomoreparties.co/v1/cohort-41/users/me",
  headers: {
    "Content-Type": "application/json",
    authorization: "a0ee0daa-dcb0-4304-ba97-98bdc5d8faf1",
  },
});

const userData = userInfoApi.getData();
console.log(userData)

//инфо о пользователе
const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
});

const personalInfoForm = new PopupWithForm(".popup_type_name", {
  handleFormSubmit: (data) => {
    //const newProfileInfoApi = userData.addCard(data);

    //newProfileInfoApi.then((data) => {
    //userInfo.setUserInfo(data);
    //}).catch((err) => {alert(err)
     //});
    //userInfo.setUserInfo(data);
  },
});

personalInfoForm.setEventListeners();
profileEditButton.addEventListener("click", () => {
  personalInfoForm.openPopup(userInfo.getUserInfo());
  //наполняем инпуты при открытии формы
  personalInfoForm.setInputValues();
  //userInfo.getUserInfo(personalInfoForm);
  nameFormValidated.clearErrors();
  nameFormValidated.activateBtn();
});


//добавление новой карточки
const placeAddForm = new PopupWithForm(".popup_type_place", {
  handleFormSubmit: (data) => {
    const newCardApi = cardListApi.addCard(data);
    console.log("placeAddForm");
    newCardApi.then((data) => {
      const card = createCard(data);
      cardList.addItem(card);

    }).catch((err) => alert(err));

  },
});

placeAddForm.setEventListeners();
addingPlaceButton.addEventListener("click", () => {
  placeAddForm.openPopup();
  placeFormValidated.toggleButtonState();
  placeFormValidated.clearErrors();
});

//увеличенная картинка
const zoomedPic = new PopupWithImage(".popup_type_image");
zoomedPic.setEventListeners();
function handleCardClick(name, link) {
  zoomedPic.openPopup({ link, name });
}

//попап для изменения аватарки пользователя
const avatarPopup = new PopupWithForm(".popup_type_new-avatar", {
  handleFormSubmit: () => {},
});

avatarPopup.setEventListeners();

avatarEdit.addEventListener("click", () => {
  avatarPopup.openPopup();

});
