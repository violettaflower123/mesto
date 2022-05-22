//сделаю тот новый метод позже, пока непонятно

export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _successHandler(success) {
    return success.json();
  }

  //проверка на ошибки
  _errorHandler = (error) => {
    return Promise.reject("Произошла ошибка");
  };

  //получение данных с сервера
  getData() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    })
      .then((success) => this._successHandler(success))
      .catch((error) => this._errorHandler(error));
  }

  //добавить новую карточку
  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((success) => this._successHandler(success))
      .catch((error) => this._errorHandler(error));
  }

  //удалить карточку
  deleteCard(id) {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((success) => this._successHandler(success))
      .catch((error) => this._errorHandler(error));
  }

  //поставить лайк
  putLike(id) {
    return fetch(`${this._url}/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((success) => this._successHandler(success))
      .catch((error) => this._errorHandler(error));
  }

  //убрать лайк
  removeLike(id) {
    return fetch(`${this._url}/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((success) => this._successHandler(success))
      .catch((error) => this._errorHandler(error));
  }

  //два разных метода patch , потому что разные url

  //смена аватарки пользователя
  changeAvatar(data) {
    return fetch(`${this._url}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((success) => this._successHandler(success))
      .catch((error) => this._errorHandler(error));
  }

  //смена аватарки пользователя
  changeUser(name, about) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(name, about),
    })
      .then((success) => this._successHandler(success))
      .catch((error) => this._errorHandler(error));
  }
}
