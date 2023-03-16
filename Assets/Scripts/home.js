/* const currentDate = data.currentDate;
const eventData = data.events; */
/* const currentDate = fetchedData.currentDate;
const eventData = fetchedData.events;
 */
/* creating the empty array to save the API response */
let fetchedData =[];

/* async funtion for fetching the API */

function getEventsData(){
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(dataApi => {
                //console.log(dataApi);
                fetchedData = dataApi;
                /* console.log(fetchedData); */
                const eventData = fetchedData.events;
             
                /* console.log(eventData); */
               showEventListJ(eventData);
               showCategories(eventData);
               filterCheckbox();
               checkedCategoryCards(eventData);
            
                
    } )

}
getEventsData();


/*  Shows event cards */



//console.log([document]);

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
const inputSearch = document.querySelector(".input-search")
inputSearch.value = '';
inputSearch.addEventListener("keyup", ()=>{
    const value = inputSearch.value.toLowerCase();
    
    crossfilter(value,checkEventCards)

})
console.log(inputSearch);
/* add listener to the event submit */
searchForm.addEventListener('submit', (e) =>{ e.preventDefault()});


function filterCheckbox() {
        let checkboxEvent = document.querySelectorAll(".form-check-input");
    
        
    
        let checked = [];
        
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


let checkEventCards = [];
function checkedCategoryCards(checked) {
    checkEventCards = [];
    
    checked.forEach(category => {
            const checkedEventList = fetchedData.events.filter(event => event.category == category);
            checkedEventList.forEach(event => checkEventCards.push(event));

    });
    crossfilter(inputSearch.value.toLowerCase(),checkEventCards)
}

function crossfilter(value, checkEventCards) {

        if(checkEventCards.length == 0 && value == "" ){
            showEventListJ(fetchedData.events);
         }
         else if(checkEventCards.length == 0 && value !== ""){
            let  newEventData = fetchedData.events.filter( (eventName) => eventName.name.toLowerCase().includes(value) || eventName.description.toLowerCase().includes(value) )
            
            showEventListJ(newEventData);
         }
         else {
            let  newEventData = checkEventCards.filter( (eventName) => eventName.name.toLowerCase().includes(value) || eventName.description.toLowerCase().includes(value) )
            
            showEventListJ(newEventData);
         }
         
    }
    



