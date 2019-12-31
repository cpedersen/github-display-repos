'use strict';

/*const apiKey = "fba740926fd44228b8bbeda74692a14a";*/

function formatURL(user) {
  const searchURL = 'https://api.github.com/users/';
  const returnURL = searchURL + user + "/repos" + "?per_page=100&page=1";
  return returnURL;
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(user, responseJson) {
  // if there are previous results, remove them
  console.log("responseJson = " + responseJson);

  const values = Object.values(responseJson);
  console.log(values);
  console.log("Number of repos = " + values.length);

  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results

  $('#results-list').append(`<h2>${values.length} repos found for GitHub user ${user}</h2>`);

  for (let i = 0; i < values.length ; i++){
    console.log("---------------------------------");
    console.log("Item " + i);
    console.log(values[i]);
    console.log(values[i].name);
    console.log(values[i].html_url);
    
    $('#results-list').append(
      `<li>
      <p>Repo Name: ${values[i].name}</p>
      <p>GitHub Repo: <a href="${values[i].html_url}">${values[i].html_url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(query) {
  const params = {
    q: query,
    language: "en",
  };

  const searchURL = formatURL(query);
  /*const url = searchURL + '?' + queryString;*/
  const url = searchURL;

  console.log("url = " + url);

  /*const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };*/

  /*fetch(url, options)*/
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(query, responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-username-repo').val();
    getRepos(searchTerm);
  });
}

$(watchForm);