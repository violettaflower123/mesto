import {
  bigImageForm,
  openPopup,
  popupBigImage,
  textFullScreen,
} from "./index.js";

//создание карточки
class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = document.querySelector("#addPlace-template");
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._like = this._element.querySelector(".element__like");
    this._trash = this._element.querySelector(".element__trash");
  }

  //получаем шаблон
  _getTemplate() {
    const cardElement = this._template.content.querySelector(".element").cloneNode(true);

    return cardElement;
  }
  //создаем карточку на основе шаблона
  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardText.textContent = this._name;
    this._cardImage.alt = this._name;

    return this._element;
  }

  //открываем картинку big size
  _openBigPicture() {
    popupBigImage.src = this._link;
    textFullScreen.textContent = this._name;
    popupBigImage.alt = this._name;

    openPopup(bigImageForm);
  }

  //удаляем карточку
  _removeCard() {
    this._element.remove();
  }

  //ставим лайк
  _giveLike() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  //навешиваем слушатели
  _setEventListeners() {

    this._trash.addEventListener("click", () => {
        this._removeCard();
      });

    this._like.addEventListener("click", () => {
      this._giveLike();
    });

    this._cardImage.addEventListener("click", () => {
        this._openBigPicture();
      });
  }
}

export default Card ;

