import refs from './refs';
import { createSelectOptins } from './select-options';
import CatApi from './cat-api';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './style.css';
import './node_modules/slim-select/dist/slimselect.css';

const catApi = new CatApi();

catApi
  .fetchBreeds()
  .then(createSelectOptins)
  .catch((err) => {
    Notify.failure(
      err?.message || 'Oops! Something went wrong! Try reloading the page!'
    );
    refs.select.hidden = true;
    refs.error.hidden = false;
  })
  .finally(() => {
    refs.loader.hidden = true;
  });

refs.select.addEventListener('change', onSelectChange);

function onSelectChange(e) {
  if (e.target.value === 'Choose a cat') {
    return;
  }

  refs.loader.hidden = false;
  const breedId = e.target.value;

  catApi
    .fetchCatByBreed(breedId)
    .then(renderCatInfo)
    .catch((err) => {
      refs.container.innerHTML = '';
      refs.error.hidden = false;

      Notify.failure(
        err?.message || 'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      refs.loader.hidden = true;
    });
}

function renderCatInfo(obj) {
  refs.error.hidden = true;

  const catInfo = {
    url: obj.url,
    name: obj.breeds[0].name,
    desc: obj.breeds[0].description,
    temp: obj.breeds[0].temperament,
  };

  const cat = catInfoMarkUp(catInfo);

  refs.container.innerHTML = cat;
}

function catInfoMarkUp({ url, name, desc, temp }) {
  return `
    <div>
      <img src="${url}" alt="${name}">
    </div>
    <div class="about">
      <h1>${name}</h1>
      <p><b>Temperament:</b> ${temp}</p>
      <p>${desc}</p>
    </div>
    `;
}
