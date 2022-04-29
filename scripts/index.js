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

const inputValueTitle = formCardPopup.querySelector('[name="title"]').value;
const inputValueLink = formCardPopup.querySelector('[name="link"]').value;

function handleEscUp(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
};

function openPopup(popup) {
  document.addEventListener('keyup', handleEscUp);
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  document.removeEventListener('keyup', handleEscUp);
  popup.classList.remove('popup_active');
}

function render() {
  const html = initialCards.map(getElement);
  listContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const link = getElementTemplate.querySelector('.card__img');
  const name = getElementTemplate.querySelector('.card__title');
  const cardElement = getElementTemplate.querySelector('.card__trash');
  const likeBtn = getElementTemplate.querySelector('.card__icon');

  name.textContent = item.name;
  link.src = item.link;
  link.alt = item.name;

  cardElement.addEventListener('click', handleRemoveElement);

  link.addEventListener('click', () => {
    imageBig.src = item.link;
    imageBig.alt = item.name;
    imageCaption.textContent = item.name;
    openPopup(imagePopup);
  });

  likeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__icon_active');
  });

  return getElementTemplate;
}

function handleRemoveElement(evt) {
  const element = evt.target.closest('.cards__item');
  element.remove();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleCardAddFormSubmit(evt) {
  const element = getElement({ name: inputValueTitle, link: inputValueLink });
  evt.preventDefault();
  listContainer.prepend(element);
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

render();
