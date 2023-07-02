import axios from 'axios';

const API_KEY = 'live_OYflwvRhDiYoyrSGRE5OhBxJ15dE02zRkp3Wk9PFq7NIyb4Uq73CvGLcrG5WOlzj';
axios.defaults.headers.common["x-api-key"] = API_KEY;

const refs = {
    catsSelection: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat info'),
    infoContainer: document.querySelector('.cat-info'),
    loadMsg: document.querySelector('.loader'),
    errMsg: document.querySelector('.error'),
};
const URL = 'https://api.thecatapi.com/v1/breeds';
const URL_IMG = 'https://api.thecatapi.com/v1/images/search'

fetch(URL).then(response => {
    return response.json();
}).then(cats => {
    console.log(cats);
    createBreed(cats);
});

refs.catsSelection.addEventListener('change', selectedCat)

function createBreed(cats) {
    const markup = cats.map(cat => {
        return `<option>${cat.name}</option>`
    })
    refs.catsSelection.innerHTML = markup;
}

function selectedCat() {
    const breedValue = refs.catsSelection.value
    fetch(URL).then(response => {
        return response.json();
    }).then(cats => {
        cats.map(cat => {
            if (breedValue !== cat.name) {
                return
            }
            return showCatImg(cat.id), showCatText(cat.id);
        })
        refs.loadMsg.classList.add('.visually-hidden');
    }).cath(showErrMsg);
    ;
}

function showCatImg(selectedCat) {
    fetch(`${URL_IMG}?breed_ids=${selectedCat}`)
        .then(cat => cat.json())
        .then(cat => {
            const markupImg = cat.map(cat => {
                 return `<img class='catImg' src=${cat.url} alt='${selectedCat} width='500' height='400''>`
            })
            refs.infoContainer.innerHTML = markupImg;
        })
}

function showCatText(selectedCat) {
    fetch(URL).then(response => {
        return response.json();
    }).then(cats => {
        cats.map(cat => {
            if (selectedCat !== cat.id) {
                return
            }
            const markupText = `<p>${cat.description}</p>`
            return refs.infoContainer.insertAdjacentHTML('beforeend', markupText);
        })
    })
}

function showErrMsg() {
    refs.loadMsg.classList.add('.visually-hidden');
    refs.errMsg.classList.remove('.visually-hidden');
}