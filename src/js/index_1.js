const refs = {
  selectCat: document.querySelector('.breed-select'),
  catShow: document.querySelector('.cat-info'),
};
const API_KEY =
  'live_OYflwvRhDiYoyrSGRE5OhBxJ15dE02zRkp3Wk9PFq7NIyb4Uq73CvGLcrG5WOlzj';
const IMG_URL = 'https://cdn2.thecatapi.com/images/';

const headers = {
  'x-api-key': API_KEY,
};

refs.selectCat.addEventListener('click', showCat);

function catsFetch() {
  return fetch(`https://api.thecatapi.com/v1/breeds`, { headers }).then(
    response => response.json(),
  );
}

function catsList() {
  catsFetch()
    .then(cats => {
      const markup = cats.map(cat => {
        return `<option>${cat.name}</option>`;
      });
      refs.selectCat.innerHTML = markup;
      console.log(cats);
    })
    .catch(error => console.log(error));
}
catsList();

function showCat() {
  const breedValue = refs.selectCat.value;
  catsFetch()
    .then(cats => {
      const markup = cats.map(cat => {
        if (cat.name === breedValue) {
          return `<img src=${IMG_URL + cat.reference_image_id}.jpg alt=${
            cat.name
          } width=300>
          <p>${cat.description}</p>`;
        }
      });
      refs.catShow.innerHTML = markup;
    })
    .catch(error => console.log(error));
}
