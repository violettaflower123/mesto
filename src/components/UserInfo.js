

export default class UserInfo {
  constructor(profileInfo) {

    this._name = document.querySelector(profileInfo.name);
    this._about = document.querySelector(profileInfo.about);
    this._avatar = document.querySelector(profileInfo.avatar);

    //this.setUserInfo(profileInfo.name, profileInfo.about);
    this.setId(profileInfo._id);
    //this.setAvatar(profileInfo.avatar);
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
