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

//запрос данных пользователя с сервера
const userApi = new Api({
  url: "https://nomoreparties.co/v1/cohort-41/users/me",
  headers: {
    "Content-Type": "application/json",
    authorization: "a0ee0daa-dcb0-4304-ba97-98bdc5d8faf1",
  },
});

userApi.getData().then(userData => {
  runMyApp(userData);
});

//функция, которая запускает весь сайт с данными пользователя с сервера
function runMyApp(userData) {
//инфо о пользователе
  const userInfo = new UserInfo(userData);
/*
  const userInfo = new UserInfo({ name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__photo" });
*/
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
    const card = new Card(data, "#addPlace-template", handleCardClick, cardListApi, userData);
    const cardElement = card.generateCard();
    card.setCountLikes();

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

    //ПРИ ОТКРЫТИИ ФОРМЫ ПОЛЬЗОВАТЕЛЯ И ВВЕДЕНИИ ДАННЫХ ОНИ ДОЛЖНЫ ОТПРАВЛЯТЬСЯ НА СЕРВЕР И МЕНЯТЬСЯ - НЕ РАБОТАЕТ
//редактирование информации о пользователе
  const personalInfoForm = new PopupWithForm(".popup_type_name", {
    handleFormSubmit: (name, about) => {
      const userUpdate = userApi.changeUser(name , about);

      userUpdate.then(data => {
        userInfo.setUserInfo({ name: data.name, about: data.about });
      })
      .catch((err) => alert(err));


    },
  });

  personalInfoForm.setEventListeners();
  //при клике на карандашик - открытие формы + валидация + заполнение полей инпутов данными со страницы
  profileEditButton.addEventListener("click", () => {
    personalInfoForm.openPopup();
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
    zoomedPic.openPopup({link, name});
  }
/*
  const updateAvatar = () => {

    new Api({
      url: "https://nomoreparties.co/v1/cohort-41/users/me",
      headers: {
        "Content-Type": "application/json",
        authorization: "a0ee0daa-dcb0-4304-ba97-98bdc5d8faf1",
      },
    }).changeData().then(userData => {

    });
  }
  */

  ////ПРИ КЛИКЕ НА АВАТАРКУ И ВВЕДЕНИИ ССЫЛКИ ОНА ДОЛЖНА ОТПРАВЛЯТЬСЯ НА СЕРВЕР И МЕНЯТЬСЯ - НЕ РАБОТАЕТ
//попап для изменения аватарки пользователя
  const avatarPopup = new PopupWithForm(".popup_type_new-avatar", {
    handleFormSubmit: (avatar) => {
      const avatarApi = userApi.changeAvatar(avatar);

      avatarApi.then(avatar => {
        userInfo.setUserInfo(avatar);
      })
      .catch((err) => alert(err));


    },
  });

  avatarPopup.setEventListeners();

  avatarEdit.addEventListener("click", () => {
    avatarPopup.openPopup();
  });
}
