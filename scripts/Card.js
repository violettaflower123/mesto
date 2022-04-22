import openPopup from "./index.js";

//создание карточки
class Card {
  constructor(name, link, template, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = document.querySelector(template);
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._like = this._element.querySelector(".element__like");
    this._trash = this._element.querySelector(".element__trash");
    this._handleCardClick = handleCardClick;
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

  //удаляем карточку
  _removeCard() {
    this._element.remove();
  }

  //ставим лайк
  _toggleLike() {
    this._like.classList.toggle("element__like_active");
  }
  //навешиваем слушатели
  _setEventListeners() {
    this._trash.addEventListener("click", () => {
      this._removeCard();
    });

    this._like.addEventListener("click", () => {
      this._toggleLike();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
