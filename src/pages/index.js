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
  profileTitle,
  profileSubtitle,
  formProfilePopup,
  formCardPopup,
  nameInput,
  jobInput,
  inputValueTitle,
  inputValueLink,
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

cardsList.renderItems();

function createCard(item) {
  const card = new Card(item.name, item.link, '.template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

const user = new UserInfo({
  userNameElement: profileTitle,
  userInfoElement: profileSubtitle,
});

const profilePopup = new PopupWIthForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    user.setUserInfo(data);
    profilePopup.close();
  },
});

profilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  profilePopup.open();
});

const cardPopup = new PopupWIthForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (item) => {
    cardsList.addItem(createCard(item));
    cardPopup.close();
  },
});

cardPopup.setEventListeners();

addButton.addEventListener('click', () => {
cardPopup.open();
});




