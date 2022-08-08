import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const countryInpyt = document.querySelector('#search-box');
const countryListShow = document.querySelector('.country-list');
const countryInfoShow = document.querySelector('.country-info');

countryInpyt.addEventListener('input', debounce(getInput, DEBOUNCE_DELAY));

function getInput(event) {
  let inputValue = event.target.value.trim();

  if (inputValue === '') {
    clearAllRenders();
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      console.log(countries);
      if (Array.isArray(countries)) {
        if (countries.length > 10) {
          tooManyMatches();
        } else {
          renderCountresList(countries);
          countryInfoShow.innerHTML = '';
        }

        if (countries.length === 1) {
          renderCountryInfo(countries[0]);
        }
      } else {
        nothingFound();
      }
    })
    .catch(nothingFound);
}

function renderCountresList(countres) {
  const markUp = countres
    .map(
      country => `<li class="country-item">
      <img class="country-flag" src="${country.flags.svg}" alt="${country.name}" />
      <h2 class="country-name">${country.name}</h2>
      </li>`
    )
    .join('');

  countryListShow.innerHTML = '';
  countryListShow.innerHTML = markUp;
}

function renderCountryInfo(country) {
  const markUp = `
  <p class="country-description"><b>Capital:</b> ${country.capital}</p>
  <p class="country-description"><b>Population:</b> ${country.population}</p>
  <p class="country-description"><b>Language:</b> ${country.languages
    .map(language => language.name)
    .join(' ')}</p>
  `;

  countryInfoShow.innerHTML = '';
  countryInfoShow.innerHTML = markUp;
}

function clearAllRenders() {
  countryInfoShow.innerHTML = '';
  countryListShow.innerHTML = '';
}

function tooManyMatches() {
  clearAllRenders();
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function nothingFound() {
  clearAllRenders();
  Notify.failure('Oops, there is no country with that name.');
}
