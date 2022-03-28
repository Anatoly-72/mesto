let editButton = document.querySelector('.profile__edit-button');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = document.querySelector('.popup__close');

editButton.addEventListener('click', function () {
  modalWindow.classList.add('popup_active');
});

modalCloseBtn.addEventListener('click', function () {
  modalWindow.classList.remove('popup_active');
});

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('[name="last-name"]');
let jobInput = document.querySelector('[name="info"]');
let profileTitle = document.querySelector('.profile__title');
let profileSubitle = document.querySelector('.profile__subtitle');
nameInput.value = profileTitle.textContent;
jobInput.value = profileSubitle.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubitle.textContent = jobInput.value;
  modalWindow.classList.remove('popup_active');
}

formElement.addEventListener('submit', formSubmitHandler);
