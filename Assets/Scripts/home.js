const currentDate = data.currentDate;
const eventData = data.events;

/*  Shows event cards */

 showEventListJ(eventData);
showCategories(eventData);

console.log([document]);

    function showEventListJ(arrData) {

        
        let eventList = document.querySelector("#templateTarjetas")
        
        eventList.innerHTML = ""
        
        let cardEventSaved =''

        if (arrData.length > 0){
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

    /* show categories */
    function showCategories() {

        const eventCategoriesList = document.querySelector("#contenedorCategorias")

        let categoriesSaved = ''
        let eventCatAr = eventData.map(ev => ev.category)
       
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
        
    /* creating new object array filtering the event name */
    let newEventData = eventData.filter( (eventName) => eventName.name.toLowerCase().includes(inputText) || eventName.description.toLowerCase().includes(inputText) )
    console.log(newEventData);
    
    
    
    showEventListJ(newEventData)
}


/* filter events by category */


let eventCatAr = eventData.map((ev) => ev.category);

let uniqEventCatAr = new Set(eventCatAr);