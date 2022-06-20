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
  config,
  buttonSubmitList,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'a6f0e7d8-069f-4cc1-84f0-7d4967254933',
    'Content-Type': 'application/json',
  },
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
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
    renderLoading(true);
    api
      .createCard(item)
      .then((data) => {
        cardsList.addItem(createNewCard(data));
        cardPopup.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        renderLoading(false);
      });
  },
});

const userInfo = new UserInfo({
  name: '.profile__title',
  about: '.profile__subtitle',
  avatar: '.profile__avatar',
});

const profilePopup = new PopupWIthForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (item) => {
    renderLoading(true);
    api
      .setUserInfo(item)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        renderLoading(false);
      });
  },
});

const avatarPopup = new PopupWIthForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (item) => {
    renderLoading(true);
    api
      .setAvatar(item)
      .then((data) => {
        avatarImage.style.backgroundImage = `url(${data.avatar})`;
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        renderLoading(false);
      });
  },
});

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_prevent',
});

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addCard(createNewCard(item));
    },
  },
  cardListSelector
);

function renderLoading(isLoading) {
  if (isLoading) {
    buttonSubmitList.forEach((submit) => {
      submit.textContent = 'Сохранение...';
    });
  } else {
    buttonSubmitList.forEach((submit) => {
      submit.textContent = 'Сохранить';
    });
  }
}

function createNewCard(data) {
  const card = new Card({
    data: data,
    userId: userId,
    cardSelector: '.template',
    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    },
    handleDeleteCard: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },

    handleSetLike: (cardId) => {
      api
        .setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api
        .deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
}

function editProfileData({ name, about }) {
  nameInput.value = name;
  jobInput.value = about;
}

profilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  editProfileData({
    name: userData.name,
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

deleteCardPopup.setEventListeners();
