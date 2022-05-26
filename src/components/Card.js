/*
//код, который закоменчен - это то, что было до того, как я все испоганила

//создание карточки
import PopupWithSubmit from "./PopupWithSubmit";

class Card {
  constructor(data, template, handleZoomedPic, userData, { handleCardClick }) {
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
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._myID = userData._id;

    this.setViewTrashButton()
  }

  setViewTrashButton() {
    this.isMyCard = this._ownerId === this._myID;
    this._trash.classList.toggle('element__trash_hidden', !this.isMyCard);
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

    const isPostWithMyLike = (this._likes.some((likeAuthor) => likeAuthor._id === this._myID));

    this._like.classList.toggle("element__like_active", isPostWithMyLike);

    return this._element;
  }
//сейчас не работает удаление, потому что я не передаю api
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

  //ставим лайк
  giveLike() {
    this._api
      .putLike(this._id)
      .then((data) => this.setCountLikes(data.likes.length))
      .catch((err) => alert(err));
  }

  _removeLike() {
    this._api
    .removeLike(this._id).then((data) => this.setCountLikes(data.likes.length))
    .catch((err) => alert(err));
  }

  setCountLikes(count = this._likes.length) {
    this._counter.textContent = count;
  }

  toggleLikes(isActive) {
    this._like.classList.toggle("element__like_active", !isActive);

    isActive ? this._removeLike() : this.giveLike();
  }

  //навешиваем слушатели
  _setEventListeners() {

    this._trash.addEventListener('click', () => {
      const delPopup = new PopupWithSubmit('.popup_type_delete ', {
        handleFormSubmit: () => {
          this._removeCard()
        }});

      delPopup.setEventListeners();
      delPopup.openPopup()
    })

  //поставить лайк
    this._likeBox.addEventListener("click", (event) => {
      const isActiveLike = event.target.classList.contains('element__like_active');
      this.toggleLikes(isActiveLike);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleZoomedPic(this._name, this._link);
    });
  }
}

export default Card;
*/

//создание карточки
import PopupWithSubmit from "./PopupWithSubmit";

//handleCardLike  handleDeleteCard - коллбэки ,через которые я делаю лайк и удаление карточки в index
//выглядеть должно именно так, через колбэки
class Card {
  constructor(data, template, handleZoomedPic, userData, { handleCardLike }, { handleDeleteCard }) {
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

    return this._element;
  }
  //сейчас не работает удаление, потому что я не передаю api
  //удаляем карточку
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  /*

  setCountLikes(count = this._likes.length) {
    this._counter.textContent = count;
  }
  */
  setCountLikes() {
    this._counter.textContent = this._likes.length;
  }
/*
  //ставим лайк
  giveLike() {
    setCountLikes(data.likes.length);
  }

  _removeLike() {
    this._api
      .removeLike(this._id)
      .then((data) => this.setCountLikes(data.likes.length))
      .catch((err) => alert(err));
  }

  toggleLikes(isActive) {
    this._like.classList.toggle("element__like_active", !isActive);

    isActive ? this._removeLike() : this.giveLike();
  }
*/
  toggleLike() {
    this._like.classList.toggle("element__like_active");
    setCountLikes(data.likes.length);
  }

  isActive() {
    this._like.contains("element__like_active");
  }
/*
  putLike() {
    const isActiveLike = this._like.contains("element__like_active");
    this.toggleLikes(isActiveLike);
    setCountLikes(data.likes.length);
  }
*/
  //навешиваем слушатели
  _setEventListeners() {
    /*
    this._trash.addEventListener('click', () => {
      const delPopup = new PopupWithSubmit('.popup_type_delete ', {
        handleFormSubmit: () => {
          this._removeCard()
        }});

      delPopup.setEventListeners();
      delPopup.openPopup()
    })
*/

    //удаление
    this._trash.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    //поставить лайк
    this._likeBox.addEventListener("click", () => {
      //this.putLike(event);
      this._handleCardLike();
    });

    //увеличение картинки
    this._cardImage.addEventListener("click", () => {
      this._handleZoomedPic(this._name, this._link);
    });
  }
}

export default Card;
