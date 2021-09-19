console.log('hi');
// const NAME = 'Ukraine';
import countryCard from '../../templates/country-card.hbs';
import API from './api-service.js'
import getRefs from './get-refs.js';
const refs = getRefs();
const DELAY = 500;

refs.searchForm.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();

const form = e.currentTarget;
const searchNAME = form.elements.query.value;
    
const api = API.fetchCountry(searchNAME).then(renderCountryCard).catch(onFetchError).finally(() => { });
debounce(api);
}

function debounce(callback) {

  return function(ar) {
    clearTimeout(timeout);
    timeout = setTimeout(callback, DELAY, ar);
  };
}

function renderCountryCard(country) {
 const result = country.map(element => {
    return countryCard(element);
    });
    refs.cardContainer.innerHTML = result;
}


function onFetchError(error) {
  alert('Упс, что-то пошло не так!');
}