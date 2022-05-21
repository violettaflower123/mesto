export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //проверка на ошибки
  _errorHandler = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Произошла ошибка');
  }


  //получение данных с сервера
  getData() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers
    }).then(this._errorHandler)
  }

  //добавить новую карточку
  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    }).catch(this._errorHandler)
  }

  //удалить карточку
  deleteCard(id) {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._errorHandler)
  }

  //поставить лайк
  putLike(id) {
    return fetch(`${this._url}/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._errorHandler)
  }
/*
    //убрать лайк
    removeLike(id) {
      return fetch(`${this._url}/${id}/likes`, {
        method: "DELETE",
        headers: this._headers
      }).then(this._errorHandler)
    }
    */
}

