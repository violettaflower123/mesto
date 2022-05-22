import { Popup } from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    console.log(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  _renderLoading(isLoading) {
    if(isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = 'Сохранить';
    }
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  openPopup() {
    super.openPopup();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      //обновить форму
      this._handleFormSubmit();
      this.closePopup();
    });
  }
}
