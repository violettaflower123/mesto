class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //close popups
  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  handleCloseButtonClick(evt) {
    closePopup(evt.target.closest(".popup"));
  }

  //закрытие попапа при клике на ESC
  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.closePopup();
    }
  }

  _handleOverlay(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.closePopup();
      });

      this._popup.addEventListener("click", this._handleOverlay);
  }
}

export { Popup };
