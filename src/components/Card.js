export class Card {
  constructor({
    data,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    userId,
    handleSetLike,
    handleRemoveLike,
  }) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._likes = data.likes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _hasDeleteCard() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteCard.remove();
    }
  }

  _setEventListeners() {
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteCard.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId);
    });

    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('card__icon_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    });
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likeBtn.classList.toggle('card__icon_active');
    this._likesNumber.textContent = this._likes.length;
  }

  _isCardLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._likeBtn.classList.add('card__icon_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeBtn = this._element.querySelector('.card__icon');
    this._imageCard = this._element.querySelector('.card__img');
    this._deleteCard = this._element.querySelector('.card__trash');
    this._hasDeleteCard();
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._isCardLiked();
    this._likesNumber = this._element.querySelector('.card__like');
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }
}







