import { buttonSubmitList } from './constants.js';

export function renderLoading(isLoading) {
  if (isLoading) {
    buttonSubmitList.forEach((submit) => {
      submit.textContent = 'Сохранение...';
    });
  } else {
    buttonSubmitList.forEach((submit) => {
      submit.textContent = 'Сохранить';
    });
  }
}
