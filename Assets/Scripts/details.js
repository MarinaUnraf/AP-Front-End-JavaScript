/* creating the empty array to save the API response */
let fetchedData =[];

/* async funtion for fetching the API */

function getEventsData(){
    /* fetch("./amazing.json") */
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(dataApi => {
                //console.log(dataApi);
                fetchedData = dataApi;
                console.log(fetchedData);
                const eventData = fetchedData.events;
                showDetailEvent(eventData)
                
    } )

}
getEventsData();



const eventData = data.events



function showDetailEvent(arrData) {
    /* Access to the params of the  string query  */
    let params = new URLSearchParams(document.location.search)
    
    /* get id param */
     let id = params.get("id")
     console.log(id);
    
     /* find the data by id */
        let detailCard = arrData.find((event) => event._id  == id)
        console.log(detailCard);
    
     /* template for details */
    let detailCardTemplate = document.getElementById("detailsContainer")
    
    let html = ""
     
     html += `<div class="row d-flex justify-content-center align-items-center gx-5">
                                <div class="col-md-4">
                                    <img src="${detailCard.image}" class="img-fluid" alt="" />
                                </div>
                                <div class="col-md-5 align-content-center">
                                    <h4>${detailCard.name}</h4>
                                    
                                    <p class="text-muted">${detailCard.description}</p>
                                    <p><b>Date: </b>${detailCard.date}</p>
                                    <p><b>Place: </b>${detailCard.place}</p>
                                    <p><b>Capacity: </b>${detailCard.capacity}</p>
                                    <p><b>Price: </b>${detailCard.price}</p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <a href="./index.html" class="btn btn-primary "> Back </a>  
                                </div>
             </div>`;
    detailCardTemplate.innerHTML = html
    
}