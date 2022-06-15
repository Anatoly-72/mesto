export const profilePopup = document.querySelector('.popup_type_edit');
export const cardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
export const avatarPopup = document.querySelector('.popup_type_avatar');

export const cardListSelector = '.cards__list';
export const listContainer = document.querySelector('.cards__list');

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const avatarImage = document.querySelector('.profile__avatar');

export const formProfilePopup = profilePopup.querySelector('.popup__form');
export const formCardPopup = cardPopup.querySelector('.popup__form_new-card');
export const formAvatarPopup = avatarPopup.querySelector('.popup__form_avatar');

export const nameInput = formProfilePopup.querySelector('[name="userName"]');
export const jobInput = formProfilePopup.querySelector('[name="about"]');
export const avatarInput = formProfilePopup.querySelector('[name="avatar"]');

export const imageBig = imagePopup.querySelector('.popup__image');
export const imageCaption = imagePopup.querySelector('.popup__figcaption');

export const token = 'a6f0e7d8-069f-4cc1-84f0-7d4967254933';
export const url = 'https://mesto.nomoreparties.co/v1/cohort-43/';

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__error_visible',
};
