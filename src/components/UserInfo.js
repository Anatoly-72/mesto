export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(data) {
    if (data.name && data.about && data.avatar) {
      this._name.textContent = data.name;
       this._about.textContent = data.about;
       this._avatar.src = data.avatar;
    }
  }
}
