import refs from './refs';
import SlimSelect from 'slim-select';

function createSelectOptionsMarkUp({ name, reference_image_id }) {
  return {
    text: `${name}`,
    value: `${reference_image_id}`,
  };
}

function createSelectOptins(arr) {
  refs.select.hidden = false;

  const breeds = arr.map(createSelectOptionsMarkUp);

  const placeholder = { placeholder: true, text: 'Choose a cat' };

  new SlimSelect({
    select: '.breed-select',
    data: [placeholder, ...breeds],
    settings: {
      searchPlaceholder: 'Find your cat here',
    },
  });
}

export { createSelectOptins };
