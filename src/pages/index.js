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
  // initialCards,
  cardListSelector,
  editButton,
  addButton,
  avatarImg,
  formProfilePopup,
  formCardPopup,
  formAvatarPopup,
  nameInput,
  jobInput,
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
    cardsList.addItem(createCard(item));
    cardPopup.close();
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
  handleFormSubmit: () => {
    avatarPopup.close();
  },
});

avatarPopup.setEventListeners();

avatarImg.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  avatarPopup.open();
});

function createCard(item) {
  const card = new Card(item.name, item.link, '.template', handleCardClick);
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

 api.getInitialCards()
   .then((item) => {
    const cardsList = new Section(
      {
        renderer: (item) => {
          cardsList.addItem(createCard(item));
        },
      },
      cardListSelector
    );
    cardsList.renderItems(item);
   })
   .catch((err) => {
     console.log(err);
   });

   api
     .setAvatar()
     .then((res) => {
       console.log(res);
     })
     .catch((err) => {
       console.log(err);
     });




// Promise.all([api.getInitialCards()])
//   .then(([cards]) => {
//     // user.setUserInfo(userData);
//     // avatarImg.style.backgroundImage = `url(${userData.avatar})`;
//     // currentUserId = userData._id;

//     cardsList.renderItems(cards);
//   })
//   .catch((err) => {
//     console.log(`${err}`);
//   });
