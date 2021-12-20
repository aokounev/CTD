
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
    data.results.forEach(item => {
      output +=
          `<div class="search-item">
          <label>${item.name}</label>
          <button type="button" class="btn btn-link"
            onclick="queryDetails('${value}', '${item.uid}', '${item.url}')"
          >Details [uid=${item.uid}]</button>
        
          
          </div>`
    });
    return output;
  }

  // Details

  /*async function queryDetails(value, uid, url) {
    details.innerHTML = "Loading details...";
    let html = "";
    try {
      const res = await fetch(url);
      const data = await res.json();
       if (people) {
        const res = await fetch(`https://www.swapi.tech/api/films);
        const films = await res.json();
        html = renderPeople(data)
        html += renderFilms(films)
      }
 
      html = JSON.stringify(data);
    } catch (error) {
      html = error.message;
    }  
    details.innerHTML = html;
  }*/