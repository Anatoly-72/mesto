export default class UserInfo {
  constructor({ userName, about }) {
    this._userName = document.querySelector(userName);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.userName;
    this._about.textContent = data.about;
  }
}
