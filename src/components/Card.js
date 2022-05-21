//создание карточки
class Card {
  constructor(data, template, handleCardClick, api) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._template = document.querySelector(template);
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._like = this._element.querySelector(".element__like");
    this._trash = this._element.querySelector(".element__trash");
    this._counter = this._element.querySelector(".element__counter-like");
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._likes = data.likes;
    this._owner = data.owner._id;
    //this._user.id = data.owner._id;
    //this._likes._id = data.likes._id;
  }

  //получаем шаблон
  _getTemplate() {
    const cardElement = this._template.content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //создаем карточку на основе шаблона
  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardText.textContent = this._name;
    this._cardImage.alt = this._name;


    if (this._likes.some((likeAuthor) => likeAuthor.id === this.owner)) {
      this._like.classList.add("element__like_active");
      //this.giveLike();
      }



    return this._element;
  }

  //удаляем карточку
  _removeCard() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => alert(err));
    //this._element.remove();
  }

  //количество лайков
  setNumberOfLikes() {
    this._counter.textContent = this._likes.length;
  }

  //ставим лайк
  giveLike() {
    this._api
      .putLike(this._id)
      .then(() => {
        this._like.classList.add("element__like_active");
        this._counter.textContent = this._likes.length + 1;
      })
      .catch((err) => alert(err));

      console.log(this._likes);

    //this._like.classList.toggle("element__like_active");
  }

  _removeLike() {
    this._api
    .removeLike(this._id)
    .then(() => {
      this._like.classList.remove("element__like_active");
      this._counter.textContent = this._likes.length - 1;
    }).catch((err) => alert(err));
  }

  //навешиваем слушатели
  _setEventListeners() {
    this._trash.addEventListener("click", () => {
      this._removeCard();
    });
//поставить лайк
    this._like.addEventListener("click", () => {
      this.giveLike();

    });
//убрать лайк
    //this._like.addEventListener("click", () => {
      //this._removeLike();
    //});


    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
