import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const dataPromice = await fetch(config.backendEndpoint + `/reservations/`);
    const reservationDataDetails = await dataPromice.json();
    return reservationDataDetails;
  }
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length <= 0){
    let elem = document.getElementById("no-reservation-banner");
    elem.style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }else{
    let elem = document.getElementById("no-reservation-banner");
    elem.style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
  
  let Tbody = document.getElementById("reservation-table");

  reservations.forEach((reserve)=>{
    let d = new Date(reserve.date).toLocaleDateString('en-IN');
    
    let rowdate = new Date(reserve.time);
    const formatTime = rowdate.toLocaleString("en-IN",{
      dateStyle:"long",timeStyle:"medium"
    }).replace(" at",",");
     
     let newRow = document.createElement("tr");
     newRow.innerHTML = `
      <td>${reserve.id}</td>
      <td>${reserve.name}</td>
      <td>${reserve.adventureName}</td>
      <td>${reserve.person}</td>
      <td>${d}</td>
      <td>${reserve.price}</td>
      <td>${formatTime}</td>
      <td id=${reserve.id}><a href="/frontend/pages/adventures/detail/?adventure=${reserve.adventure}"><button type="button" class="reservation-visit-button">visit adventure</button></td>
    `;
    Tbody.append(newRow)
  })

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
