import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageBig = this._popup.querySelector('.popup__image');
    this._imageCaption = this._popup.querySelector('.popup__figcaption');
  }

  open(name, link) {
    this._imageCaption.textContent = name;
    this._imageBig.src = link;
    this._imageBig.alt = name;
    super.open();
  }
}
