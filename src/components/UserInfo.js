const SEL = {
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__photo"
};

export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(SEL.name);
    this._about = document.querySelector(SEL.about);
    this._avatar = document.querySelector(SEL.avatar);

    this.setUserInfo(data)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar = data.avatar;
    this._id = data._id;
  }

  setUserAvatar(data) {
    this._avatar.src = data;
  }
}
