class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscUp = this._handleEscUp.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');
  }

  //close popups
  closePopup() {
  this._popupSelector.classList.remove("popup_opened");
  document.addEventListener("keydown", this._handleEscUp);
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

  this._popupSelector.addEventListener('click', this._handleOverlay);
}
}

//попап с картинкой
class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
      this._img = this._popupSelector.querySelector('.popup__big-image');
    this._caption = this._popupSelector.querySelector('.popup__text-fullscreen');
  }

  openPopup({ link, name}) {
    this._img.src = link;
    this._caption.textContent = name;
    super.openPopup();
  }
}

//попап с формой
class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit){
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    //this._inputList = this._popupSelector.querySelectorAll('.form__input');
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popupSelector.querySelectorAll('.form__input');

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit(this._getInputValues());

      //обновить форму
      this._popupSelector.reset();
    });
  }
}

export { Popup, PopupWithForm, PopupWithImage };


