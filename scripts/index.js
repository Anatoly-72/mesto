let editButton = document.querySelector('.profile__edit-button');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('[name="last-name"]');
let jobInput = document.querySelector('[name="info"]');
let profileTitle = document.querySelector('.profile__title');
let profileSubitle = document.querySelector('.profile__subtitle');

function openPopup() {
  modalWindow.classList.add('popup_active');
}

function closePopup() {
  modalWindow.classList.remove('popup_active');
}

editButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubitle.textContent;
  openPopup();
});

modalCloseBtn.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubitle.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
