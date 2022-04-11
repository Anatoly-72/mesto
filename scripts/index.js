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

const listContainer = document.querySelector('.cards__list');
const template = document.querySelector('.template');
const popupImage = document.querySelector('.popup_type_image');
const largeImage = document.querySelector('.popup__image');

const captionImage = document.querySelector('.popup__figcaption');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('[name="last-name"]');

const jobInput = document.querySelector('[name="info"]');
const popupCloseBtn = document.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupForm = document.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const popupNevCard = document.querySelector('.popup_type_new-card');
const popupFormNevCard = document.querySelector('.popup__form_new-card');

const popups = document.querySelectorAll('.popup');
const formBtnNewCard = document.querySelector('.popup__form-btn_type_new-card');

function render() {
  const html = initialCards.map(getElement);
  listContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const link = getElementTemplate.querySelector('.card__img');
  const name = getElementTemplate.querySelector('.card__title');
  const removeCard = getElementTemplate.querySelector('.card__trash');
  const likeBtn = getElementTemplate.querySelector('.card__icon');

  name.textContent = item.name;
  link.src = item.link;
  link.alt = item.name;

  removeCard.addEventListener('click', handleRemoveElement);

  link.addEventListener('click', () => {
    largeImage.src = item.link;
    largeImage.alt = item.name;
    captionImage.textContent = item.name;
    openPopup(popupImage);
  });

  function removeElement(evt) {
    const element = evt.target.closest('.cards__item');
    element.remove();
  }

  likeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__icon_active');
  });

  return getElementTemplate;
}

function handleRemoveElement(evt) {
  const element = evt.target.closest('.cards__item');
  element.remove();
}

function openPopup(popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__form-btn')) {
      closePopup(popup);
    }
  });
});

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

popupForm.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', () => {
  openPopup(popupNevCard);
});

function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
}

popupFormNevCard.addEventListener('submit', handleCardAddFormSubmit);

function handleAddCard() {
  const inputValueTitle = document.querySelector('[name="title"]').value;
  const inputValueLink = document.querySelector('[name="link"]').value;
  const element = getElement({ name: inputValueTitle, link: inputValueLink });
  listContainer.prepend(element);
  addCardForm.reset();
}

formBtnNewCard.addEventListener('click', handleAddCard);

render();
