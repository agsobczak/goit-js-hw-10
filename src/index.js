let name;
import { debounce } from 'lodash';
import { loadCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const resultsContainer = document.querySelector('.results');

const debouncedSearch = debounce(
  name => {
    loadCountries(name);
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

handleResults(name);

function handleSingleCountryResult(country) {
  resultsContainer.innerHTML = `
<div class="card">
  <img src="${country.flag}" alt="${country.name}" />
  <h2>${country.name}</h2>
  <p>Capital: ${country.capital}</p>
  <p>Population: ${country.population}</p>
  <p>Languages: ${country.languages}</p>
</div>
`;
}

function handleMultipleCountryResults(results) {
  resultsContainer.innerHTML = results
    .map(
      country => `
<div class="result">
  <img src="${country.flag}" alt="${country.name}" />
  <h2>${country.name}</h2>
</div>
`
    )
    .join('');
}

function handleNoResults() {
  resultsContainer.innerHTML = '';
}

loadCountries('');
