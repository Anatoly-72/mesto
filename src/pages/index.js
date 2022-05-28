import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
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

const formEditProfileValidator = new FormValidator(config, formProfilePopup);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formCardPopup);
formAddNewCardValidator.enableValidation();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '.template', openPopup);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

// function handleCardClick(name, link) {
//   imageBig.src = link;
//   imageBig.alt = name;
//   imageCaption.textContent = name;
//   openPopup(imagePopup);
// }

// function renderInitialCards(arr) {
//   arr.forEach((item) => {
//     addCard(item.name, item.link);
//   });
// }

// function createCard(title, image) {
//   const card = new Card(title, image, '.template', openPopup);
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// function addCard(title, image) {
//   const card = createCard(title, image);
//   listContainer.prepend(card);
// }

function handleEscUp(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}

function openPopup(popup) {
  document.addEventListener('keyup', handleEscUp);
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  document.removeEventListener('keyup', handleEscUp);
  popup.classList.remove('popup_active');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  addItem(inputValueTitle.value, inputValueLink.value);
  closePopup(cardPopup);
  formCardPopup.reset();
  formAddNewCardValidator.resetValidation();
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(profilePopup);
});

formProfilePopup.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

formCardPopup.addEventListener('submit', handleCardAddFormSubmit);

cardsList.renderItems();

// renderInitialCards(initialCards);
