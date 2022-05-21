import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {
  popups,
  profilePopup,
  cardPopup,
  listContainer,
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
} from './constants.js';

const initialCards = [
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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__error_visible',
};

const formEditProfileValidator = new FormValidator(config, formProfilePopup);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formCardPopup);
formAddNewCardValidator.enableValidation();

function renderInitialCards(arr) {
  arr.forEach((item) => {
    addCard(item.name, item.link);
  });
}

function createCard(title, image) {
  const card = new Card(title, image, '.template', openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

function addCard(title, image) {
  const card = createCard(title, image);
  listContainer.prepend(card);
}

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

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(inputValueTitle.value, inputValueLink.value);
  closePopup(cardPopup);
  formCardPopup.reset();
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

formProfilePopup.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

formCardPopup.addEventListener('submit', handleCardAddFormSubmit);

renderInitialCards(initialCards);
