export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
    .then(this._getResponseData);
  }

  setAvatar() {
    return fetch(`${this.baseUrl}/users/me/`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist',
      }),
    }).then(this._getResponseData);
  }

  // createCard(newCard) {
  //   return fetch(`${this.baseUrl}cards`, {
  //     method: 'POST',
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       name: newCard.name,
  //       link: newCard.link,
  //     }),
  //   }).then(this._getResponseData);
  // }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
