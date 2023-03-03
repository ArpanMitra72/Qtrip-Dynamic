
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // const queryString = window.location.search;
  const urlParams = new URLSearchParams(search);
  const city = urlParams.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const adventuresCard = await fetch(config.backendEndpoint + `/adventures/?city=${city}`);
    const res = await adventuresCard.json();
    console.log(res);
    return res;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  console.log(adventures);
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // let cards = document.getElementById("data");
  adventures.forEach((adv) => {
    let divColEle = document.createElement('div');
    divColEle.className = 'col-6 col-lg-3 mb-3';
    divColEle.innerHTML = `
    <a href="detail/?adventure=${adv.id}" id="${adv.id}"> 
      <div class="card">
        <img src="${adv.image}" class="activity-card img"/>
        <div class="category-banner">${adv.category}</div>
        <div class="card-body d-md-flex justify-content-between">
          <h5>${adv.name}</h5>
          <p>₹${adv.costPerHead}</p>
        </div>
        <div class="card-body d-md-flex justify-content-between"> 
          <h5>Duration</h5>
          <p>${adv.duration} Hours</p>
        </div>
      </div>
    </a>`;

    let divRowEle = document.getElementById('data');
    divRowEle.append(divColEle);
  });
  // for(let i=0;i<adventures.length;i++){
  //   let createDiv = document.createElement("div");
  //   createDiv.className = "col-12 col-md-3 col-lg-3 mb-4";
  //   createDiv.innerHTML = `
  //   <a href="pages/adventures/detail/?adventure=${adventures.id}" id="${adventures.id}">
  //     <div class="activity-card adventure-card card">
  //     <h5 class="category-banner">${adventures[i].category}</h5>
  //      <div class="card"> 
  //       <img src=${adventures[i].image} class="card-img-top"/>
  //       <div class="card-body w-100 d-md-flex text-center justify-content-between">
  //         <h5 class="card-text">${adventures[i].name}</h5>
  //         <p class="card-text">${adventures[i].costPerHead}</p>
  //       </div>
  //       <div class="card-body w-100 d-md-flex text-center justify-content-between">
  //         <h5 class="card-text">Duration</h5>
  //         <p class="card-text">${adventures[i].duration}</p>
  //       </div>
  //      </div>
  //     </div>
  //   </a>
  //   `
  //   document.getElementById("data").appendChild(createDiv);
  // }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filterList = [];
  list.forEach((object)=>{
    if(parseInt(object.duration)>=low && parseInt(object.duration)<=high){
      filterList.push(object);
    }
  })
  return filterList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filertArray = [];
  list.forEach((object)=>{
    if(categoryList.includes(object.category)){
      filertArray.push(object);
    }
  })
  return filertArray;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  let filteredList = [];
  //filter by catagory 
  if(filters.duration === '' && filters.category.length===0){
    return list;
  }
  if(filters.duration === "" && filters.category.length!==0){
    filteredList = filterByCategory(list,filters.category);
  }
  else if(filters.category.length === 0 && filters.duration!==""){
    let splitDuration = filters.duration.split('-');
    filteredList = filterByDuration(list,splitDuration[0],splitDuration[1]);
  }
  else{
    let list1 = filterByCategory(list,filters.category);
    let splitDuration = filters.duration.split('-');
    let list2 = filterByDuration(list1,splitDuration[0],splitDuration[1]);
    filteredList = list2;
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  let filters = JSON.parse(localStorage.getItem('filters'));
  // if(filters.category.length != 0 || filters.duration){
  //   return filters
  // }

  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters.category;
  let domCategory = document.getElementById('category-list');
  domCategory.innerHTML = '';
  categoryList.forEach((item)=>{
    let spanT = document.createElement("spanT");
    spanT.setAttribute('class', 'category-filter');
    spanT.innerText = item;
    domCategory.appendChild(spanT)
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
