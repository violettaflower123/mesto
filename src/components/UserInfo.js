/*
export default class UserInfo {
  constructor(userInfo) {
    this._name = document.querySelector(userInfo.name);
    this._profession = document.querySelector(userInfo.profession);
  }

  //получает данные пользователя
  getUserInfo() {
    return { name: this._name.textContent, profession: this._profession.textContent };

  }

  //установить новые данные для пользователя
  setUserInfo({name, profession}) {
    this._name.textContent = name;
    this._profession.textContent = profession;
  }
}
*/
export default class UserInfo {
  constructor(personInfo) {
    this._name = document.querySelector(personInfo.name);
    this._about = document.querySelector(personInfo.about);
    //this._avatar = document.querySelector(personInfo.avatar);
  }

getUserInfo() {
  return {
    user: this._name.textContent,
    about: this._about.textContent,
  };
}

setUserInfo(data) {
  this._name.textContent = data.user;
  this._about.textContent = data.about;
  //this._avatar = data.avatar;
  //this._id = data._id;
}
}
