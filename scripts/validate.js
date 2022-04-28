function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('input', (evt) => handleFormInput(evt, form, config));
    form.addEventListener('submit', (evt) => handleFormSubmit(evt, form));
    toggleButton(form, config);
  });
}

function toggleButton(form, config) {
  const buttonList = Array.from(
    document.querySelectorAll(config.submitButtonSelector)
  );

  buttonList.forEach((button) => {
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
  });
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorNode = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorNode.textContent = '';
    input.classList.remove(config.inputErrorClass);
  } else {
    errorNode.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
  toggleButton(form, config);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__form-input_type_error'
});
