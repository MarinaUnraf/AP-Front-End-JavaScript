

  

/* creating the empty array to save the API response */
let fetchedData =[];

/* async funtion for fetching the API */

function getEventsData(){
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(dataApi => {
                //console.log(dataApi);
                fetchedData = dataApi;
                console.log(fetchedData);
                const eventData = fetchedData.events;
                const pastEventData = fetchedData.events.filter(event => event.date < fetchedData.currentDate)
               
                console.log(pastEventData);
               showPastEventList(pastEventData);
               showCategories(pastEventData);
               filterCheckbox();
               checkedCategoryCards(pastEventData);
                
    } )

}
getEventsData();





        /* show past events cards */
    function showPastEventList(arrData) {

        let eventList = document.querySelector("#templateTarjetas")

        eventList.innerHTML= ''
        
        let cardEventSaved =''
        
        
        if(arrData.length > 0) {

            arrData.forEach(event => {
               
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
                    <a href="./details.html?id=${event._id}" class="btn btn-primary "> See Details </a>
                    </div>
                </div>
            </div>`
            });

            eventList.innerHTML = cardEventSaved;
        } else{
            eventList.innerHTML = "<p>No results found</p>";
        }
        
    }


    function showCategories(arrData) {

        const eventCategoriesList = document.querySelector("#contenedorCategorias")

        let categoriesSaved = ''
        let eventCatAr = arrData.map(ev => ev.category)
        
        let uniqEventCatAr = new Set (eventCatAr)
        
        uniqEventCatAr.forEach(eventcategory => {
            categoriesSaved += `<div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${eventcategory}">
            <label class="form-check-label" for="inlineCheckbox1">${eventcategory}</label>
        </div>`
        });
        
        eventCategoriesList.innerHTML = categoriesSaved;
        
    }

    /* search events by form */


/*Function input and search event name  */
/* get element from DOM */
const searchForm = document.querySelector("form");
/* add listener to the event */
searchForm.addEventListener('submit', inputEventName)


function inputEventName( event) {
       
    event.preventDefault();
    /* capture input tex */
    inputText = event.target[0].value.toLowerCase()
        
    if( checkEventCards.length > 0){
        /* creating new object array filtering the event name */
        newEventData = checkEventCards.filter( (eventName) => eventName.name.toLowerCase().includes(inputText) || eventName.description.toLowerCase().includes(inputText) )
        showPastEventList(newEventData)
    }
    else if (checkEventCards.length == 0 ) {
          /* creating new object array filtering the event name */
          newEventData = fetchedData.events.filter( (eventName) => eventName.name.toLowerCase().includes(inputText) || eventName.description.toLowerCase().includes(inputText) )
          showPastEventList(newEventData)
    }

}

/* filter events by category */


function filterCheckbox() {
    let checkboxEvent = document.querySelectorAll(".form-check-input");
    //console.log(checkboxEvent);
    
    let checked = []
    checkboxEvent.forEach(checkbox => {
        checkbox.addEventListener("click", ()=> {
            if(checkbox.checked === true){
                checked.push(checkbox.value);
                checkedCategoryCards(checked)
            }
            else
            {
                checked = checked.filter(category => category !== checkbox.value);
                checkedCategoryCards(checked)
            }  
        })
    } );
}
filterCheckbox();

let checkEventCards= [];


function checkedCategoryCards(checked) {
        let checkEventCards = []
        
        /*    filtering and saving the  checked event  in an array  */
        checked.forEach(category => {
                const checkedEventList = fetchedData.events.filter(event => event.category == category && event.date < fetchedData.currentDate);
                checkedEventList.forEach(event => checkEventCards.push(event));
                

        });
     /*  if the eventcards array is greater than zero, use the show past eventlist fuction with the checkeventcards array as input, else show the entire past event list */
     if(checkEventCards.length > 0){
        showPastEventList(checkEventCards)
     }
     else{ const pasEventList = fetchedData.events.filter(event => event.date < fetchedData.currentDate)
        showPastEventList(pasEventList)}

}
