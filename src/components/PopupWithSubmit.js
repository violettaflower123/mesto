import { Popup } from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._cardData = {};
  }

  openPopup(card) {
    super.openPopup();
    this._cardData = card;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      //обновить форму
      this._handleFormSubmit(this._cardData);
      //this.closePopup();
    });
  }
}
