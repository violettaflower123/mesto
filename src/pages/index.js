import "./index.css";
import {
  settings,
  profileEditButton,
  nameJobPopup,
  addingPlaceButton,
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

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-41/",
  headers: {
    "Content-Type": "application/json",
    authorization: "a0ee0daa-dcb0-4304-ba97-98bdc5d8faf1",
  },
});

const userApi = api
  .getDataUser()
  .then((userData) => {
    //userInfo.setUserInfo(userData.name, userData.about);
    //userInfo.setAvatar(userData.avatar);
    runMyApp(userData);
  })
  .catch((err) => console.log(`Ошибка.....: ${err}`));

//функция, которая запускает весь сайт с данными пользователя с сервера
function runMyApp(userData) {
  //валидация формы добавления нового места

  const placeFormValidated = new FormValidator(settings, placeForm);
  placeFormValidated.enableValidation();

  //валидация формы изменения личной информации

  const nameFormValidated = new FormValidator(settings, nameJobPopup);
  nameFormValidated.enableValidation();

  //запрос всех карточек с сервера
  const cardListApi = api.getDataInitialCards();

  //попап подтверждения удаления
  const preDelPopup = new PopupWithSubmit(".popup_type_delete ", {
    handleFormSubmit: (card) => {
      api
        .deleteCard(card._id)

        .then(() => {
          card.removeCard();
          preDelPopup.closePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  preDelPopup.setEventListeners();

  //создать новую карточку
  function createCard(data) {
    const card = new Card(
      data,
      "#addPlace-template",
      handleZoomedPic,
      userData,
      //лайк по карточке и удаление лайка
      {
        handleCardLike: (likeUpdate) => {
          api
            .toggleLike(likeUpdate._id, card.isMyPostLike())
            .then((newCard) => {
              card.updateData(newCard);
              card.toggleLike(likeUpdate._id, card.isMyPostLike());
            })
            .catch((err) => console.log(err));
        },
      },

      //удаление карточки
      {
        handleDeleteCard: (card) => {
          preDelPopup.openPopup(card);
        },
      }
    );

    //создаем карточку
    const cardElement = card.generateCard();
    //card.setCountLikes();

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
    ".elements__box"
  );

  /*
  //добавление карточек с сервера
  cardListApi
    .then((items) => {
      cardList.renderItems(items.reverse());
    })
    .catch((err) => alert(err));
*/
  Promise.all([
    //в Promise.all передаем массив промисов которые нужно выполнить
    api.getDataUser(),
    api.getDataInitialCards(),
  ])

    .then(([userData, items]) => {
      //попадаем сюда когда оба промиса будут выполнены

      // у нас есть все нужные данные, отрисовываем страницу
      userInfo.setUserInfo(userData.name, userData.about);
      userInfo.setAvatar(userData.avatar);
      cardList.renderItems(items.reverse());
    })

    .catch((err) => {
      //попадаем сюда если один из промисов завершаться ошибкой

      console.log(err);
    });

  //редактирование информации о пользователе
  const personalInfoForm = new PopupWithForm(".popup_type_name", {
    handleFormSubmit: (data) => {
      const userUpdate = api.changeUser(data);
      personalInfoForm.renderLoading(true);

      userUpdate
        .then((data) => {
          personalInfoForm.renderLoading(true);
          userInfo.setUserInfo(data.name, data.about);
        })
        .then(() => {
          personalInfoForm.closePopup();
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
      const newCardApi = api.addCard(data);
      placeAddForm.renderLoading(true);
      newCardApi
        .then((data) => {
          const card = createCard(data);
          cardList.addItem(card);
        })
        .then(() => {
          placeAddForm.closePopup();
          placeFormValidated.toggleButtonState();
        })
        .catch((err) => alert(err));
    },
  });

  placeAddForm.setEventListeners();
  addingPlaceButton.addEventListener("click", () => {
    placeAddForm.openPopup();
    //placeFormValidated.toggleButtonState();
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
      const avatarApi = api.changeAvatar(data);
      avatarPopup.renderLoading(true);

      avatarApi
        .then((data) => {
          userInfo.setAvatar(data.avatar);
        })
        .then(() => {
          avatarPopup.closePopup();
          avatarPopupValidated.toggleButtonState();
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
