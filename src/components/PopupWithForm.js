import { Popup } from './Popup.js';
//попап с формой
class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }


  getInputValues() {
    console.log(this._popupSelector);
    // достаём все элементы полей
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');

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
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');

    const profileName = document.querySelector(".profile__title");
    const profileJob = document.querySelector(".profile__subtitle");

    this._inputList[0].value = profileName.textContent;
    this._inputList[1].value = profileJob.textContent;

  }

/*
  getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");

    const formValues = [...this._inputList].reduce((accum, input) => {
      return {
        ...accum,
        [input.name]: input.value,
      };
    }, {});

    // возвращаем объект значений
    return formValues;
  }
*/
  closePopup() {
    super.closePopup();
    this._popupSelector.querySelector(".popup__form").reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());

      //обновить форму
      this.closePopup();
    });
  }
}

export { PopupWithForm };
