
import countryCard from '../../templates/country-card.hbs';
import countriesListCard from '../../templates/countries-list-card.hbs';
import API from './api-service.js'
import getRefs from './get-refs.js';

import debounce from 'lodash/debounce'

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const refs = getRefs();
const DELAY = 500;
const LIMIT = 10;

refs.searchForm.addEventListener('input', debounce(onSearch, DELAY));

function onSearch(e) {
    e.preventDefault();
    const form = e.target.form;
    const searchNAME = form.query.value;
    API.fetchCountry(searchNAME).then(renderCountryCard).catch(error => alert({text:'not found'})).finally(() => form.reset);
};

function renderCountryCard(country) {
    const result = country.map(element => {
    return countriesListCard(element);
 });
    const countryAmount = result.length;
    if (countryAmount >= 2 && countryAmount <= LIMIT) {
     return  refs.cardContainer.innerHTML = result;
    };

    if (countryAmount > LIMIT) {
     error({ text: 'Too many matches found. Please enter a more specific query!', })
    };
     refs.cardContainer.innerHTML = countryCard(country[0]);
    
};

