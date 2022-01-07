const results = document.getElementById("results");
const details = document.getElementById("details");

function queryPeople() {
  asyncFetch("people");
}

function queryPlanets() {
  asyncFetch("planets");
}

function queryVehicles() {
  asyncFetch("vehicles");
}

function queryFilms() {
  asyncFetch("films");
}

function Clean() {
  details.innerHTML = "";
}

async function asyncFetch(value) {
  results.innerHTML = "Loading...";
  let html = "";
  try {
    const res = await fetch(`https://www.swapi.tech/api/${value}`);
    const data = await res.json();
    html = renderSearchResults(data, value);
  } catch (error) {
    html = error.message;
  }
  results.innerHTML = html;
}

function renderSearchResults(data, value) {
  let output = "";
  data.results.forEach((item) => {
    output += `<div class="search-item">
          <label>${item.name}</label>
          <button type="button" class="btn btn-link" 
          onclick="queryDetails('${value}', '${item.url}')"
          >Show Details</button>
          </div>`;
  });
  return output;
}

// Details
async function queryDetails(value, url) {
  details.innerHTML = "Loading details...";
  let html = "";
  const detailsResponse = await fetch(url);
  const detailsJson = await detailsResponse.json();

  if (value === "people") {
    html = renderPeople(detailsJson.result.properties);
  }
  details.innerHTML = html;

  if (value === "planets") {
    html = renderPlanets(detailsJson.result.properties);
  }
  details.innerHTML = html;

  if (value === "vehicles") {
    html = renderVehicles(detailsJson.result.properties);
  }
  details.innerHTML = html;
}

function renderPeople(data, value) {
  let output = "";
  output += `<div><b>Name: ${data.name}</b> </div> `;
  output += `<div>Height: ${data.height} </div> `;
  output += `<div>Eye Color: ${data.eye_color} </div> `;
  output += `<div>Birth Year: ${data.birth_year} </div> `;
  output += `<div>Hair Color: ${data.hair_color} </div> `;

  // Fetch related films when SWAPI.dev is available
  // Render Film Titles for specific People, Planets, Vehicles
  /*
  let filmPromises = [];
  data.films.forEach((filmUrl) => {
    const filmPromise = fetch(filmUrl);
    filmPromises.push(filmPromise);
  });
  Promise.all(filmPromises)
    .then(responses => { 
      const jsonPromises = responses.map(r => r.json());
      Promise.all(jsonPromises)
        .then(jsons => { 
          jsons.forEach(film => { 
            output += `<div>Film: ${film.title} </div>`;
          });
        });
    });
    */
  return output;
}

function renderPlanets(data, value) {
  let output = "";
  output += `<div><b>Name: ${data.name}</b> </div> `;
  output += `<div>Diameter: ${data.diameter}</div> `;
  output += `<div>Population: ${data.population}</div> `;
  output += `<div>Climate: ${data.climate}</div> `;
  output += `<div>Terrain: ${data.terrain} </div> `;
  return output;
}

function renderVehicles(data, value) {
  let output = "";
  output += `<div><b>Name: ${data.name}</b> </div> `;
  output += `<div><b>Model:</b> ${data.model} </div> `;
  output += `<div><b>Manufacturer:</b> ${data.manufacturer} </div> `;
  output += `<div><b>Vehicle Class:</b> ${data.vehicle_class} </div> `;
  output += `<div><b>Passengers:</b> ${data.passengers} </div> `;
  //data.films.forEach((filmUrl) => {
  //output += `<div><b>Film:</b> ${filmUrl}</div>`;
  //});
  return output;
}
