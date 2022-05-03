import { popupBigImage, textFullScreen } from "./index.js";

class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscUp = this._handleEscUp.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');
    console.log(this);
    document.addEventListener("keydown", this._handleEscUp);
    this._popupSelector.addEventListener('click', this._handleOverlay);
  }

  //close popups
  closePopup() {
  this._popupSelector.classList.remove("popup_opened");
  document.addEventListener("keydown", this._handleEscUp);
  this._popupSelector.addEventListener('click', this._handleOverlay);
}

  handleCloseButtonClick(evt) {
  closePopup(evt.target.closest(".popup"));
}

//закрытие попапа при клике на ESC
_handleEscUp(evt) {
  if (evt.key == "Escape") {
    this.closePopup();
  }
}

_handleOverlay(evt) {
  if (evt.target.classList.contains("popup") ||
  evt.target.classList.contains("popup__close")) {
    this.closePopup();
  }
}

setEventListeners() {
  this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
    this.closePopup();
  })
}
}

//попап с картинкой
class PopupWithImage extends Popup {
  constructor(popupSelector, name, link){
    super(popupSelector);
      this._name = name;
    this._link = link;
  }

  openPopup() {
    popupBigImage.src = this._link;
    textFullScreen.textContent = this._name;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }
}

//попап с формой
class PopupWithForm extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

}

export { Popup, PopupWithForm, PopupWithImage };


