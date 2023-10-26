import { debounce } from 'lodash';
import { loadCountries, handleResults } from './fetchCountries';
import { Notiflix } from 'notiflix';

const searchBox = document.getElementById('search-box');
const resultsContainer = document.querySelector('.results');

const debouncedSearch = debounce(
  name => {
    loadCountries(name, results => handleResults(results));
  },
  300,
  {
    leading: false,
    trailing: true,
  }
);

searchBox.addEventListener('input', event => {
  const name = event.target.value.trim();
  debouncedSearch(name);
});
function handleResults(results) {
  if (results.length > 10) {
    Notiflix.notify({
      title: 'Too many matches',
      message: 'Please enter a more specific name',
    });
  } else if (results.length === 1) {
    handleSingleCountryResult(results[0]);
  } else if (results.length > 0) {
    handleMultipleCountryResults(results);
  } else {
    handleNoResults();
  }
}
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
