const currentDate = data.currentDate;
const eventData = data.events;

/*  Shows event cards */
 showEventList();
 


function showEventList() {
    let eventcards = data.events;
    const eventList = document.querySelector("#templateTarjetas");

    
    
    let cardEventSaved = "";
        
    for (const event of eventcards) {
        
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

    eventList.innerHTML = cardEventSaved;
    
}


/* search events by form */


/*Function input and search event name  */
/* get element from DOM */
const searchForm = document.querySelector("form");
/* add listener to the event */
searchForm.addEventListener('submit', inputEventName)

    /* capture the event into a varible and compare with the name event list */
function inputEventName( event) {
       
    event.preventDefault(); 
       let searchTermList = {
            wordSearched: event.target[0].value
       }
   
    inputsearch = searchTermList.wordSearched.toLowerCase()
    
    /*  List of name events from the data object */
    let eventNames= []
    for (const event of eventData) {
        /* fill the empty array */
        eventNames.push (event.name.toLowerCase())
        
    }
    
    
    /* search names from the name event list */
    let namesMatched = eventNames.filter((eName) => eName.includes(inputsearch) )
    
    console.log(namesMatched);

}


