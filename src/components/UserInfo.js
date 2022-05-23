import { profileInfo } from "../utils/constants.js";

export default class UserInfo {
  constructor(data) {

    this._name = document.querySelector(profileInfo.name);
    this._about = document.querySelector(profileInfo.about);
    this._avatar = document.querySelector(profileInfo.avatar);

    this.setUserInfo(data.name, data.about);
    this.setId(data._id);
    this.setAvatar(data.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setId(id) {
    this._id = id;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
