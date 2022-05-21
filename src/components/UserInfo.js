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
