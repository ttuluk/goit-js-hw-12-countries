console.log('hi');
// const NAME = 'Ukraine';'
import countryCard from '../../templates/country-card.hbs';
import API from './api-service.js'
import getRefs from './get-refs.js';
import debounce from 'lodash/debounce'
import { error } from '@pnotify/core';
const refs = getRefs();
const DELAY = 500;

refs.searchForm.addEventListener('input', debounce(onSearch, DELAY));

function onSearch(e) {
    e.preventDefault();
    const form = e.target.form;
const searchNAME = form.query.value;  
    API.fetchCountry(searchNAME).then(renderCountryCard).catch({error}).finally(() => form.reset());
};

function renderCountryCard(country) {
 const result = country.map(element => {
    return countryCard(element);
    });
    refs.cardContainer.innerHTML = result;
};

