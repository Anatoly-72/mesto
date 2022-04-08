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
