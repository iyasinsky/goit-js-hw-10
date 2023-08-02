export default class CatApi {
  constructor() {
    this.API_KEY =
      'live_2f96zXif2SQYAyukScS567xrE1f5pcgacSYPUHoRH7b2hbVGRo7fCPSuOLwuXXH7';
  }

  fetchBreeds() {
    return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${this.API_KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((arr) => arr);
  }

  fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/${breedId}/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((obj) => obj);
  }
}
