export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const popups = document.querySelectorAll('.popup');
export const profilePopup = document.querySelector('.popup_type_edit');
export const cardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');

export const cardListSelector = '.cards__list';
export const listContainer = document.querySelector('.cards__list');

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

export const formProfilePopup = profilePopup.querySelector('.popup__form');
export const formCardPopup = cardPopup.querySelector('.popup__form_new-card');

export const nameInput = formProfilePopup.querySelector('[name="last-name"]');
export const jobInput = formProfilePopup.querySelector('[name="info"]');

export const imageBig = imagePopup.querySelector('.popup__image');
export const imageCaption = imagePopup.querySelector('.popup__figcaption');

export const inputValueTitle = formCardPopup.querySelector('[name="title"]');
export const inputValueLink = formCardPopup.querySelector('[name="link"]');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__error_visible',
};
