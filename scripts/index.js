//Массив карточек и их вставка

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

function render() {
  const html = initialCards.map(getElement);
  listContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const name = getElementTemplate.querySelector('.card__title');
  const link = getElementTemplate.querySelector('.card__img');
  name.textContent = item.name;
  link.src = item.link;
  link.alt = item.name;

  return getElementTemplate;
}

render();

//Функции открытия/закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    } if (evt.target.classList.contains('popup__form-btn')) {
      closePopup(popup);
    }
  });
});


//Попап редактирования профиля

const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('[name="last-name"]');
const jobInput = document.querySelector('[name="info"]');
const popupCloseBtn = document.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

const popupForm = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

popupForm.addEventListener('submit', formSubmitHandler);

//Попап добавления карточки

const addButton = document.querySelector('.profile__add-button');
const popupNevCard = document.querySelector('.popup_type_new-card');
const popupFormNevCard = document.querySelector('.popup__form_new-card');

addButton.addEventListener('click', () => {
  openPopup(popupNevCard);
});

function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
}

popupFormNevCard.addEventListener('submit', handleCardAddFormSubmit);












