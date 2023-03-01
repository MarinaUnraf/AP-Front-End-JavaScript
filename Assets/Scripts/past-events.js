const currentDate = data.currentDate;
const eventData = data.events;

/*  Shows event cards */
 /* showEventList(); */
  showPastEventList();
  showCategories();



    function showPastEventList() {

        const eventList = document.querySelector("#templateTarjetas")

        let cardEventSaved =''
        
        eventData.forEach(event => {
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
        });
        eventList.innerHTML = cardEventSaved;
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