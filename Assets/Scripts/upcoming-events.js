const currentDate = data.currentDate;
const eventData = data.events;

 showEventListJ(eventData);
 showCategories(eventData);


function showEventListJ(arrData) {

    let eventList = document.querySelector("#templateTarjetas")

    eventList.innerHTML = ''
    
    let cardEventSaved =''
    if (arrData.length > 0){

        arrData.forEach(event => {
            if (event.date > currentDate){
    
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
            }
        });
        eventList.innerHTML = cardEventSaved;
    } else{
        eventList.innerHTML = "<p>No results found</p>";
    }
    
}

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
        
    if( checkEventCards.length > 0){
        /* creating new object array filtering the event name */
        newEventData = checkEventCards.filter( (eventName) => eventName.name.toLowerCase().includes(inputText) || eventName.description.toLowerCase().includes(inputText) )
        showEventListJ(newEventData)
    }
    else if (checkEventCards.length == 0 ) {
          /* creating new object array filtering the event name */
          newEventData = eventData.filter( (eventName) => eventName.name.toLowerCase().includes(inputText) || eventName.description.toLowerCase().includes(inputText) )
          showEventListJ(newEventData)
    }

}

/* filter events by category */


let checkboxEvent = document.querySelectorAll(".form-check-input");
console.log(checkboxEvent);

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

let checkEventCards = [];
function checkedCategoryCards(checked) {
        let checkEventCards = []
        checked.forEach(category => {
                const checkedEventList = eventData.filter(event => event.category == category);
                checkedEventList.forEach(event => checkEventCards.push(event));

        });
     if(checkEventCards.length > 0){
        showEventListJ(checkEventCards)
     }
     else{showEventListJ(eventData)}
}
