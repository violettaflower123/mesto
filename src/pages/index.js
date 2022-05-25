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
  avatarEdit,
  avatarForm,
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

//инфо о пользователе
const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__photo",
});

//запрос данных пользователя с сервера
const userApi = new Api({
  url: "https://nomoreparties.co/v1/cohort-41/users/me",
  headers: {
    "Content-Type": "application/json",
    authorization: "a0ee0daa-dcb0-4304-ba97-98bdc5d8faf1",
  },
});

userApi
  .getData()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    runMyApp(userData);
  })
  .catch((err) => console.log(`Ошибка.....: ${err}`));

//функция, которая запускает весь сайт с данными пользователя с сервера
function runMyApp(userData) {
  //инфо о пользователе

  //валидация формы добавления нового места

  const placeFormValidated = new FormValidator(settings, placeForm);
  placeFormValidated.enableValidation();

  //валидация формы изменения личной информации

  const nameFormValidated = new FormValidator(settings, nameJobPopup);
  nameFormValidated.enableValidation();

  //попап подтверждения удаления
  const preDelPopup = new PopupWithSubmit(".popup_type_delete ", {
    handleFormSubmit: () => {},
  });

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
    const card = new Card(
      data,
      "#addPlace-template",
      handleZoomedPic,
      userData,
      //лайк по карточке и удаление лайка
      {
        handleCardLike: (card) => {
          console.log(card.id);
          //отправляем запрос поставить лайк на сервер
          const likesApi = cardListApi.putLike(card.id, !card.isActive);
          //при успехе - сердечко черное и +1
          likesApi.then((data) => console.log(data))
          .catch((err) => alert(err));
        },
      },

      //удаление карточки
      {
        handleDeleteCard: (card) => {
          console.log(card);
          //устанавливаем, что произойдет при сабмите формы подтверждения удаления
          preDelPopup.setSubmitAction(() => {});

          //при клике на корзину открывается попап подтверждения удаления
          preDelPopup.openPopup();
          //идет запрос на сервер удалить карточку
          const delApi = cardListApi.deleteCard(card.id);
          //при успехе элемент удаляется и закрывается попап подтверждения удаления
          delApi
            .then(() => {
              card.removeCard();
              preDelPopup.closePopup();
            })
            .catch((arr) => alert(arr));
        },
      }
    );

    //создаем карточку
    const cardElement = card.generateCard();
    card.setCountLikes();

    return cardElement;
  }

  //экземпляр класса section, чтобы cardList была в глобальном доступе
  const cardList = new Section(
    {
      renderer: (data) => {
        const cardElement = createCard(data);
        cardList.addItem(cardElement);
      },
    },
    ".elements__box",
    cardListApi
  );

  //добавление карточек с сервера
  createCardsApi
    .then((items) => {
      cardList.renderItems(items.reverse());
    })
    .catch((err) => alert(err));

  //редактирование информации о пользователе
  const personalInfoForm = new PopupWithForm(".popup_type_name", {
    handleFormSubmit: (data) => {
      const userUpdate = userApi.changeUser(data);

      userUpdate
        .then((data) => {
          personalInfoForm.renderLoading(true);
          userInfo.setUserInfo(data.name, data.about);
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

    nameFormValidated.clearErrors();
    nameFormValidated.activateBtn();
  });

  //добавление новой карточки
  const placeAddForm = new PopupWithForm(".popup_type_place", {
    handleFormSubmit: (data) => {
      const newCardApi = cardListApi.addCard(data);
      placeAddForm.renderLoading(true);
      newCardApi
        .then((data) => {
          const card = createCard(data);
          cardList.addItem(card);
        })
        .catch((err) => alert(err));
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

  function handleZoomedPic(name, link) {
    zoomedPic.openPopup({ link, name });
  }

  //попап для изменения аватарки пользователя
  const avatarPopup = new PopupWithForm(".popup_type_new-avatar", {
    handleFormSubmit: (data) => {
      const avatarApi = userApi.changeAvatar(data);

      avatarApi
        .then((data) => {
          userInfo.setAvatar(data.avatar);
        })
        .catch((err) => alert(err));
    },
  });

  avatarPopup.setEventListeners();

  avatarEdit.addEventListener("click", () => {
    avatarPopup.openPopup();

    avatarPopupValidated.clearErrors();
    avatarPopupValidated.toggleButtonState();
  });

  //валидация формв смены аватарки
  const avatarPopupValidated = new FormValidator(settings, avatarForm);
  avatarPopupValidated.enableValidation();
}
