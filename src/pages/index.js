import './index.css';

import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  cardListSelector,
  editButton,
  addButton,
  formProfilePopup,
  formCardPopup,
  nameInput,
  jobInput,
  config,
} from '../utils/constants.js';

const formEditProfileValidator = new FormValidator(config, formProfilePopup);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formCardPopup);
formAddNewCardValidator.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  cardListSelector
);

const cardPopup = new PopupWIthForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (item) => {
    cardsList.addItem(createCard(item));
    cardPopup.close();
    formAddNewCardValidator.resetValidation();
  },
});

const userInfo = new UserInfo({
  userName: '.profile__title',
  about: '.profile__subtitle',
});

const profilePopup = new PopupWIthForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      userName: data.userName,
      about: data.about,
    });
    profilePopup.close();
    formEditProfileValidator.resetValidation();
  },
});

function createCard(item) {
  const card = new Card(item.name, item.link, '.template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function editProfileData({ userName, about }) {
  nameInput.value = userName;
  jobInput.value = about;
}

profilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  editProfileData({
    userName: userData.userName,
    about: userData.about,
  });
  formEditProfileValidator.resetValidation();
  profilePopup.open();
});

cardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  formAddNewCardValidator.resetValidation();
  cardPopup.open();
});

cardsList.renderItems();
