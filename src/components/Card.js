//handleCardLike  handleDeleteCard - коллбэки ,через которые я делаю лайк и удаление карточки в index
class Card {
  constructor(data, template, handleZoomedPic, userData, { handleCardLike }, { handleDeleteCard }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._template = document.querySelector(template);
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._like = this._element.querySelector(".element__like");
    this._likeBox = this._element.querySelector(".element__like-box");
    this._trash = this._element.querySelector(".element__trash");
    this._counter = this._element.querySelector(".element__counter-like");
    this._handleZoomedPic = handleZoomedPic;
    this._handleCardLike = handleCardLike;
    this._handleDeleteCard = handleDeleteCard;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._myID = userData._id;

    this.setViewTrashButton();
  }

  setViewTrashButton() {
    this.isMyCard = this._ownerId === this._myID;
    this._trash.classList.toggle("element__trash_hidden", !this.isMyCard);
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

    const isPostWithMyLike = this._likes.some(
      (likeAuthor) => likeAuthor._id === this._myID
    );

    this._like.classList.toggle("element__like_active", isPostWithMyLike);

    this.setCountLikes(this._likes.length);
    return this._element;
  }

  //удаляем карточку
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  toggleLike() {
    this._like.classList.toggle("element__like_active");
    this.setCountLikes(this._likes.length);
  }

  isMyPostLike() {
    return this._likes.some((likeAuthor) => likeAuthor._id === this._myID);
  }

//установить количество лайков
  setCountLikes(count = this._likes.length) {
    this._counter.textContent = count;
  }

  updateData(data) {
    this._likes = data.likes;
    this._counter.textContent = data.likes.length;
  }

  toggleLike() {
    this._like.classList.toggle("element__like_active");
    //setCountLikes(data.likes.length);
  }

  isActive() {
    this._like.contains("element__like_active");
  }

  //навешиваем слушатели
  _setEventListeners() {
    //удаление
    this._trash.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    //поставить лайк
    this._like.addEventListener("click", () => {
      //this.putLike(event);
      this._handleCardLike(this._data);
    });

    //увеличение картинки
    this._cardImage.addEventListener("click", () => {
      this._handleZoomedPic(this._name, this._link);
    });
  }
}

export default Card;
