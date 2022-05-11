import { Popup } from './Popup.js';
//попап с формой
class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._profileName = document.querySelector(".profile__title");
    this._profileJob = document.querySelector(".profile__subtitle");
    this._form = this._popup.querySelector(".popup__form");
  }


  getInputValues() {
    console.log(this._popup);

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  //установить значения полей в форме
  setInputValues() {
    this._inputList[0].value = this._profileName.textContent;
    this._inputList[1].value = this._profileJob.textContent;

  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());

      //обновить форму
      this.closePopup();
    });
  }
}

export { PopupWithForm };
