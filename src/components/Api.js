export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _errorHandler = (res) => {
    if (res.ok) {
      return res.json();
    }
    return;
    Promise.reject("Произошла ошибка");
  };

  //получение данных с сервера
  getData() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  //добавить новую карточку
  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._errorHandler);
  }

  //удалить карточку
  deleteCard(id) {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  toggleLike(id, status) {
    return fetch(`${this._url}/${id}/likes`, {
      method: status ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  //два разных метода patch , потому что разные url

  //смена аватарки пользователя
  changeAvatar(data) {
    return fetch(`${this._url}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._errorHandler);
  }

  //смена данных пользователя
  changeUser(data) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._errorHandler);
  }
}
