import { debounce } from 'lodash';
import { loadCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const resultsContainer = document.querySelector('.results');

const debouncedSearch = debounce(
  name => {
    handleResults(name);
  },
  300,
  {
    leading: true,
    trailing: false,
  }
);

searchBox.addEventListener('input', event => {
  const name = event.target.value.trim();
  debouncedSearch(name);
});

async function handleResults(name) {
  resultsContainer.innerHTML = '';
  if (name === '') {
    return;
  }
  const results = await loadCountries(name);
  if (results.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (results.length === 1) {
    handleSingleCountryResult(results[0]);
  } else if (results.length > 0) {
    handleMultipleCountryResults(results);
  } else {
    handleNoResults();
  }
}

function handleSingleCountryResult(country) {
  const language = Object.values(country.languages)[0];
  resultsContainer.innerHTML = `
<div class="card">
<img src="${country.flags.png}" alt="${country.altSpellings[1]} flag" />
<h2>${country.altSpellings[1]}</h2>
  <p>Capital: ${country.capital}</p>
  <p>Population: ${country.population}</p>
  <p>Languages: ${language}</p>
</div>
`;
}

function handleMultipleCountryResults(results) {
  resultsContainer.innerHTML = results
    .map(
      country => `
<div class="result">
  <img src="${country.flags.svg}" alt="${country.name.official}" />
  <h2>${country.name.official}</h2>
</div>
`
    )
    .join('');
}

function handleNoResults() {
  resultsContainer.innerHTML = '';
}
