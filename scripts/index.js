// import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


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

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const listContainer = document.querySelector('.cards__list');
const template = document.querySelector('.template');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const formProfilePopup = profilePopup.querySelector('.popup__form');
const formCardPopup = cardPopup.querySelector('.popup__form_new-card');

const nameInput = formProfilePopup.querySelector('[name="last-name"]');
const jobInput = formProfilePopup.querySelector('[name="info"]');

const imageBig = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__figcaption');

const inputValueTitle = formCardPopup.querySelector('[name="title"]');
const inputValueLink = formCardPopup.querySelector('[name="link"]');

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

class Card {
  constructor(title, image, cardSelector, openPopup, closePopup) {
    this._title = title;
    this._image = image;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
  }
  //метод, который возвращает разметку
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }
  // метод слушателя по кнопке - "лайк"
  _handleLikeCard() {
    this._likeBtn.classList.toggle('card__icon_active');
  }
  // метод слушателя по кнопке - "удалить"
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
  // метод слушателя по картинке для просмотра изображения
  _handleOpenPopup() {
    imageBig.src = this._image;
    imageBig.alt = this._title;
    imageCaption.textContent = this._title;
    this._openPopup(imagePopup);
  }
  //метод добавления всех обработчиков
  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.card__icon');
    // открытие попапа просмотра изображения кликом по изображению
    this._imageSmall.addEventListener('click', () => {
      this._handleOpenPopup();
    });
    // слушатель кнопки удаления карточки
    this._element
      .querySelector('.card__trash')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });
    // слушатель кнопки лайка
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeCard();
    });
  }
  //метод создания карточки
  generateCard() {
    this._element = this._getTemplate();
    this._imageSmall = this._element.querySelector('.card__img');
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._title;
    this._imageSmall.src = this._image;
    this._imageSmall.alt = this._title;
    // Вернём элемент наружу
    return this._element;
  }
}

const renderInitialCards = (array) => {
  array.forEach((item) => {
    addCard(item.name, item.link);
  });
};

function createCard(title, image) {
  const card = new Card(title, image, 'template');
  const cardElement = card.generateCard();
  return cardElement;
}

const addCard = (title, image) => {
  const card = createCard(title, image);
  listContainer.prepend(card);
};

// function render() {
//   const html = initialCards.map(new Card);
//   listContainer.append(...html);
// }



// function getElement(item) {
//   const getElementTemplate = template.content.cloneNode(true);
//   const link = getElementTemplate.querySelector('.card__img');
//   const name = getElementTemplate.querySelector('.card__title');
//   const cardElement = getElementTemplate.querySelector('.card__trash');
//   const likeBtn = getElementTemplate.querySelector('.card__icon');

//   name.textContent = item.name;
//   link.src = item.link;
//   link.alt = item.name;

//   cardElement.addEventListener('click', handleRemoveElement);

//   link.addEventListener('click', () => {
//     imageBig.src = item.link;
//     imageBig.alt = item.name;
//     imageCaption.textContent = item.name;
//     openPopup(imagePopup);
//   });

//   likeBtn.addEventListener('click', (evt) => {
//     evt.target.classList.toggle('card__icon_active');
//   });

//   function handleRemoveElement(evt) {
//     const element = evt.target.closest('.cards__item');
//     element.remove();
//   }

//   return getElementTemplate;
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


// render();

renderInitialCards(initialCards);









