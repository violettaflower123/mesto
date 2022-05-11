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
