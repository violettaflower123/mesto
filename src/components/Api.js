export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

_errorHandler = (res) => {
  if (res.ok) {
    return res.json();
  } return
  Promise.reject('Произошла ошибка');
}

//тут тоже сказали все переделать
/*
  _successHandler(success) {
    return success.json();
  }

  //проверка на ошибки
  _errorHandler = (error) => {
    return Promise.reject("Произошла ошибка");
  };
*/
  //получение данных с сервера
  getData() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._errorHandler)
  }

  //добавить новую карточку
  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._errorHandler)
  }

  //удалить карточку
  deleteCard(id) {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._errorHandler)
  }

  //тут получается должен быть один метод из двух? как toggle?
  //поставить лайк
  putLike(id) {
    return fetch(`${this._url}/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._errorHandler)
  }

  //убрать лайк
  removeLike(id) {
    return fetch(`${this._url}/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._errorHandler)
  }

  //два разных метода patch , потому что разные url

  //смена аватарки пользователя https://mesto.nomoreparties.co/v1/cohort-41/users/me/avatar
  changeAvatar(data) {
    return fetch(`${this._url}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._errorHandler)
  }

  //смена данных пользователя https://mesto.nomoreparties.co/v1/cohort-41/users/me
  changeUser(data) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._errorHandler)
  }
}
