import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  popups,
  profilePopup,
  cardPopup,
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

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      // const card = new Card(item.name, item.link, '.template', handleCardClick);
      // const cardElement = card.generateCard();
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

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;
//   closePopup(profilePopup);
// }

function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  addItem(inputValueTitle.value, inputValueLink.value);
  closePopup(cardPopup);
  formCardPopup.reset();
  formAddNewCardValidator.resetValidation();
}

// formProfilePopup.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => {
  open(cardPopup);
});

formCardPopup.addEventListener('submit', handleCardAddFormSubmit);

const user = new UserInfo({
  userNameElement: profileTitle,
  userInfoElement: profileSubtitle,
});

const popupTypeEdit = new PopupWIthForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    console.log(data)
        user.setUserInfo(data);
        popupTypeEdit.close();
      }
      // .catch((err) => {
      //   console.log(`${err}`);
      // })
      // .finally(() => {
      //   renderLoading(false);
      // });
  },
);

popupTypeEdit.setEventListeners();

editButton.addEventListener('click', () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupTypeEdit.open();
});

// const user = new UserInfo({
//   userName: '.profile__title',
//   userInfo: '.profile__subtitle',
// });

function addInfoFormProfile(userNameElement, userInfoElement) {
  nameInput.value = userNameElement;
  jobInput.value = userInfoElement;
}

const popupTypeAdd = new PopupWIthForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (item) => {
    cardsList.addItem(createCard(item));
  },
});

popupTypeAdd.setEventListeners();

addButton.addEventListener('click', () => {
popupTypeAdd.open();
});



// const profilePopup = new PopupWIthForm({
//   popupSelector: '.popup_type_edit',
//   handleFormSubmit: (data) => {
//     user.setUserInfo({
//       userName: data.userName,
//       userInfo: data.userInfo,
//     });
//     profilePopup.close();
//   },
// });

// profilePopup.setEventListeners();

// editButton.addEventListener('click', () => {
//   const info = userInfo.getUserInfo();
//   addInfoFormProfile({
//     userName: info.userName,
//     userInfo: info.userInfo,
//   });
//   open(profilePopup);
// });

const formEditProfileValidator = new FormValidator(config, formProfilePopup);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formCardPopup);
formAddNewCardValidator.enableValidation();

