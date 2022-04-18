import { bigImageForm, openPopup } from "./index.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const placesList = document.querySelector(".elements__box");

//создание карточки
class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
  }
//получаем шаблон
  _getTemplate () {
    const cardElement = document
    .querySelector("#addPlace-template")
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }
//создаем карточку на основе шаблона
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  //открываем картинку big size
  _openBigPicture () {
    popupBigImage.src = this._link;
    textFullScreen.textContent = this._name;
    popupBigImage.alt = this._name;

    openPopup(bigImageForm);

  };

  //удаляем карточку
  _removeCard() {
    this._element.remove();
  };

  //ставим лайк
  _giveLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  };


  //навешиваем слушатели
  _setEventListeners() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
     this._removeCard();
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
     this._giveLike();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openBigPicture();
    });

  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();

  placesList.prepend(cardElement);
});

export { Card, initialCards };
