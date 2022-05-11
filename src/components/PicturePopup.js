import { Popup } from './Popup.js';

//попап с картинкой
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popupSelector.querySelector(".popup__big-image");
    this._caption = this._popupSelector.querySelector(
      ".popup__text-fullscreen"
    );
  }

  openPopup({ link, name }) {
    this._img.src = link;
    this._caption.textContent = name;
    super.openPopup();
  }
}

export { PopupWithImage };
