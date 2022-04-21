
const settings = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}

class FormValidator {
	constructor(settings, form) {
    this._form = form;
		this.buttonElement = this._form.querySelector(settings.submitButtonSelector);
		this.inputList = this._form.querySelectorAll(settings.inputSelector);

		this._inactiveButtonClass = settings.inactiveButtonClass;
		this._inputErrorClass = settings.inputErrorClass;
		this._errorClass = settings.errorClass;
	}

   //слушатели
	_setEventListeners() {
		this.toggleButtonState();

		this.inputList.forEach((input) => input.addEventListener('input', this._handlerInput.bind(this, input)))
	};

	_handlerInput(input) {
		this._checkInputValidity(input);
		this.toggleButtonState();
	}

  //изменение состояния кнокпи
	toggleButtonState() {
		// Если есть хотя бы один невалидный инпут
		if (this.hasInvalidInput()) {
			// сделай кнопку неактивной
			this.buttonElement.classList.add(settings.inactiveButtonClass);
			//this.buttonElement.classList.remove(settings.submitButtonSelector);
			this.buttonElement.setAttribute('disabled', false);
		} else {
			// иначе сделай кнопку активной
			this.activateBtn();
			//this.buttonElement.classList.remove(settings.inactiveButtonClass);
			//this.buttonElement.classList.add(settings.submitButtonSelector);
			//this.buttonElement.removeAttribute('disabled');
		}
	}

  //есть ли невалидный импут
	hasInvalidInput() {
		return [...this.inputList].some(input => !input.validity.valid)
	};

  //проверить валидность и показать скрыть ошибку
	_checkInputValidity(input) {
		if (!input.validity.valid) {
			this._showInputError(input);
		} else {
			this._hideInputError(input);
		}
	}

	//показать ошибку
	_showInputError(input) {
		const span = this._form.querySelector(`#${input.id}-error`);
		input.classList.add(this._inputErrorClass);
		span.textContent = input.validationMessage;
		span.classList.add(this._errorClass);
	}
  //спрятать ошибку
  _hideInputError(input) {
		const span = this._form.querySelector(`#${input.id}-error`);
		input.classList.remove(this._inputErrorClass);
		span.classList.remove(this._errorClass);
		span.textContent = '';
	}

  //очистить текст ошибок
  clearErrors() {
  this.inputList.forEach((error) => {
  this._hideInputError(error);
  });
  }

  //сделать кнопку активной после перезагрузки
  activateBtn() {
    this.buttonElement.removeAttribute('disabled');
    this.buttonElement.classList.remove(this._inactiveButtonClass);
  }

  //запуск валидации
	enableValidation() {
		this._setEventListeners();

		this.inputList.forEach(input => {
			this._checkInputValidity(input);
		})
	}

}

export { settings, FormValidator };
