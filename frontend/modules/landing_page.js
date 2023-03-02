import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(fetchCities());

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let responsePromice = await fetch(config.backendEndpoint + `/cities`);
    let cityArray = await responsePromice.json();
    return cityArray;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // debugger
  let container = document.createElement("div");
  container.className = "col-6 col-lg-3 mb-3";
  let innerHtml = `
   <a href="pages/adventures/?city=${id}" id="${id}">
    <div class = "tile">
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
      <img class="img-responsive" src="${image}">
    </div> 
   </a>`
  container.innerHTML = innerHtml;

  document.getElementById("data").append(container); 
}

export { init, fetchCities, addCityToDOM} ;
