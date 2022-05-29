export class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard() {
    this._likeBtn.classList.toggle('card__icon_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element
      .querySelector('.card__trash')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });

    this._likeBtn.addEventListener('click', () => {
      this._handleLikeCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeBtn = this._element.querySelector('.card__icon');
    this._imageCard = this._element.querySelector('.card__img');
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._setEventListeners();

    return this._element;
  }
}
