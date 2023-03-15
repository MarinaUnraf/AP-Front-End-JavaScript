function getEventsData(){
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(dataApi => {
                //console.log(dataApi);
                fetchedData = dataApi;
                /* console.log(fetchedData); */
                const eventData = fetchedData.events;
                /* console.log(eventData); */
                const evCapacity = eventData.map(eventCapacity => eventCapacity.capacity);
                let maxCapacity = Math.max(...evCapacity)

                showTable(maxCapacity)
              
                
    } )

}
getEventsData();


/* calculate the attendance percent  event */

/* calculate  max percent attendance */

/* calculate the min percent attendance */


/* calculate the event with largest capacity */



/* show data in table */
function showTable(capacity) {
    let rowContainer = document.getElementById("eventsStatistics");
     let cellRegister = "";
    
        cellRegister += `
        <td> ....</td>
        <td> ....</td>
        <td>${capacity}</td>
        `;

    rowContainer.innerHTML = cellRegister
    
    
}