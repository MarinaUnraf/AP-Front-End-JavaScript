const currentDate = data.currentDate;

const eventList = document.querySelector("#templateTarjetas");

let cardEventSaved = "";
let eventcards = data.events;

for (const event of eventcards) {
    
    cardEventSaved += ` <div class="col-sm-3 m-2">
    <div class="card" style="width: 18rem; height: 20rem;">
        <img src="${event.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
        </div>
        <div class="card-footer d-flex justify-content-end align-items-center">
            
            <a href="#" class="btn btn-primary "> See Details </a>
        </div>
    </div>
</div>`
    
}
eventList.innerHTML = cardEventSaved;

