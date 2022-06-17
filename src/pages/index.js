import './index.css';

import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  cardListSelector,
  editButton,
  addButton,
  avatarImage,
  formProfilePopup,
  formCardPopup,
  formAvatarPopup,
  nameInput,
  jobInput,
  avatarInput,
  config,
  token,
  url,
} from '../utils/constants.js';

// let currentUserId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'a6f0e7d8-069f-4cc1-84f0-7d4967254933',
    'Content-Type': 'application/json',
  },
});

const formEditProfileValidator = new FormValidator(config, formProfilePopup);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formCardPopup);
formAddNewCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(config, formAvatarPopup);
formAvatarValidator.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardPopup = new PopupWIthForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (item) => {
    api
      .createCard(item)
      .then((data) => {
        cardsList.addItem(createNewCard(data));
        cardPopup.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
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
  },
});

const avatarPopup = new PopupWIthForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (item) => {
    api
      .setAvatar(item)
      .then((data) => {
        avatarImage.style.backgroundImage = `url(${data.avatar})`;
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }
});

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addCard(createNewCard(item));
    },
  },
  cardListSelector
);

function createNewCard(data) {
  const card = new Card(data, '.template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// function newCardMaker(data, currentUserId, cardsList) {
//   const newCard = new Card(
//     data,
//     handleCardClick,
//     {
//       handleLikeClick: () => handleLikeClick(newCard, data),
//       handleCardDelete: () => handleCardDelete(newCard),
//     },
//     currentUserId,
//     picturesTemplateSelector
//   );
//   const cardElement = newCard.generateCard();
//   newCard.setLike(data);
//   cardsList.addItem(cardElement);
// }

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

avatarPopup.setEventListeners();

avatarImage.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  avatarPopup.open();
});

  Promise.all([api.getInitialCards()])
    .then(([initialCards]) => {
      cardsList.renderItems(initialCards);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });


