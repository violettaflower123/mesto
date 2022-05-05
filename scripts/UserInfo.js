export default class UserInfo {
  constructor(name, profession) {
    this._name = document.querySelector(name);
    this._profession = document.querySelector(profession);
  }

  getUserInfo() {
    return { userName: this._name, profession: this._profession };
  }

  setUserInfo() {

  }
}
