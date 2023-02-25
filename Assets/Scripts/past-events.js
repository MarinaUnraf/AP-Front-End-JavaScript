const currentDate = data.currentDate;

 showEventList();


function showEventList() {
    const eventList = document.querySelector("#templateTarjetas");
    
    let cardEventSaved = "";
    let eventcards = data.events;
    
    
    for (const event of eventcards) {
        if (event.date < currentDate){

            cardEventSaved += ` <div class="col-sm-3 m-2">
            <div class="card" style="width: 20rem; height: 24rem;">
                <img src="${event.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <p><b>Date: </b>${event.date}</p>
                    
                </div>
                <div class="card-footer d-flex justify-content-between align-items-baseline">
                    
                <p>${event.category}</p>
                    <a href="#" class="btn btn-primary "> See Details </a>
                </div>
            </div>
        </div>`
        }
       
        
    }
    eventList.innerHTML = cardEventSaved;
    
}