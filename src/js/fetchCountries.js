function fetchCountries(inputValue) {
  const URL = 'https://restcountries.com/v2/name';
  const parameters = 'name,flags,capital,population,languages';

  return fetch(`${URL}/${inputValue}?fields=${parameters}`).then(response =>
    response.json()
  );
}

export { fetchCountries };
