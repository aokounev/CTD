
  const results = document.getElementById("results");
  const details = document.getElementById("details");
  
  function queryPeople() {
    asyncFetch('people');
  }
  
  function queryPlanets() {
    asyncFetch('planets');
  }

  function queryVehicles() {
    asyncFetch('vehicles');
  }

  function Clean(){
    details.innerHTML='';
  }

  async function asyncFetch(value) {
    results.innerHTML = "Loading...";
    let html = "";
    try {
      const res = await fetch(`https://swapi.dev/api/${value}`);
      const data = await res.json();
      html = renderSearchResults(data, value);
    } catch (error) {
      html = error.message;
    }  
    results.innerHTML = html;
  }

  function renderSearchResults(data, value) {
    let output = "";
    data.results.forEach(item => {
      output +=
          `<div class="search-item">
          <label>${item.name}</label>
          <button type="button" class="btn btn-link" 
          onclick="queryDetails('${value}', '${item.url}')"
          >Show Details</button>
          </div>`
    });
    return output;
  }
  
  

  // Details
  async function queryDetails(value, url) {
    details.innerHTML = "Loading details...";
    let html = "";
    const detailsResponse = await fetch(url);
    const detailsJson = await detailsResponse.json();
        
        if (value === 'people') {
        html = renderPeople(detailsJson);
    }
    details.innerHTML = html;
    
    
    if (value === 'planets') {        
        html = renderPlanets(detailsJson);
    }
    details.innerHTML = html; 
    
        if (value === 'vehicles') {
        html = renderVehicles(detailsJson);
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
    data.films.forEach(filmUrl => {
      output += `<div>Film: ${filmUrl}</div>`;
    });
    return output;}

   
    function renderPlanets(data, value) {
      let output = "";
      output += `<div><b>Name: ${data.name}</b> </div> `;
      output += `<div>Diameter: ${data.diameter}</div> `;
      output += `<div>Population: ${data.population}</div> `;
      output += `<div>Climate: ${data.climate}</div> `;
      output += `<div>Terrain: ${data.terrain} </div> `;
      data.films.forEach(filmUrl => {
        output += `<div>Film: ${filmUrl}</div>`;
      });
      return output;}

      function renderVehicles(data, value) {
        let output = "";
        output += `<div><b>Name: ${data.name}</b> </div> `;
        output += `<div><b>Model:</b> ${data.model} </div> `;
        output += `<div><b>Manufacturer:</b> ${data.manufacturer} </div> `;
        output += `<div><b>Vehicle Class:</b> ${data.vehicle_class} </div> `;
        output += `<div><b>Passengers:</b> ${data.passengers} </div> `;
        data.films.forEach(filmUrl => {
          output += `<div><b>Film:</b> ${filmUrl}</div>`;
        }); 
    return output;
  }