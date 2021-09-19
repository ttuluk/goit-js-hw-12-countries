console.log('hi');
// const NAME = 'Ukraine';
import countryCard from '../../templates/country-card.hbs';
import API from './api-service.js'
import getRefs from './get-refs.js';
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchNAME = form.elements.query.value;

 API.fetchCountry(searchNAME).then(renderCountryCard).catch(onFetchError).finally(() => form.reset());
}


// API.fetchCountry(NAME).then(renderCountryCard).catch(onFetchError);
//     // .finally(() => form.reset());


// let country = fetch(`https://restcountries.eu/rest/v2/name/${NAME}`).then(r => {
//     if (r.ok) {
//         return r.json();
//     }
//     return { countries:[]};
// }).then(ar => {
//     console.log(ar);
//   renderCountryCard({ar});
// });
// console.log(country);



function renderCountryCard(country) {
    console.log(country);
 const result = country.map(element => {
    return countryCard(element);
     console.log(countryCard(element));
    });
    refs.cardContainer.innerHTML = result;
}


function onFetchError(error) {
  alert('Упс, что-то пошло не так!');
}