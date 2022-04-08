const editButton = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('[name="last-name"]');
const jobInput = document.querySelector('[name="info"]');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openModalWindow() {
  modalWindow.classList.add('popup_active');
}

function closeModalWindow() {
  modalWindow.classList.remove('popup_active');
}

editButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openModalWindow();
});

modalCloseBtn.addEventListener('click', closeModalWindow);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeModalWindow();
}

formElement.addEventListener('submit', formSubmitHandler);

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

  return getElementTemplate;
}

render();
