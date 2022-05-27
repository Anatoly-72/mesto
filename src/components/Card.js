import { imagePopup, imageBig, imageCaption } from '../utils/constants.js';

export class Card {
  constructor(title, image, cardSelector, openPopup) {
    this._title = title;
    this._image = image;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
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

  _handleOpenPopup() {
    imageBig.src = this._image;
    imageBig.alt = this._title;
    imageCaption.textContent = this._title;
    this._openPopup(imagePopup);
  }

  _setEventListeners() {
    this._imageSmall.addEventListener('click', () => {
      this._handleOpenPopup();
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
    this._element.querySelector('.card__title').textContent = this._title;
    this._likeBtn = this._element.querySelector('.card__icon');
    this._imageSmall = this._element.querySelector('.card__img');
    this._imageSmall.src = this._image;
    this._imageSmall.alt = this._title;
    this._setEventListeners();

    return this._element;
  }
}
