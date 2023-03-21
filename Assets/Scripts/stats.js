let fetchedData = [];
let statistics= [];

function getEventsData(){
    /* fetch("./amazing.json") */
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(dataApi => {
                //console.log(dataApi);
                fetchedData = dataApi;
                /* console.log(fetchedData); */
                const eventData = fetchedData.events;
                const currentDate = fetchedData.currentDate;
                /* console.log(eventData); */
                /* First Table */
                calculations(eventData,currentDate);
                pastEvenCalculus(eventData, currentDate);
                
                //////////////////////
                /* second and third tables */

                let pastEventList = eventData.filter(event => event.date < currentDate)
                let futureEventlist = eventData.filter(event => event.date > currentDate)
                
                showCategoriesStatistics(calculationsByCategory(pastEventList),"past")
                showCategoriesStatistics(calculationsByCategory(futureEventlist),"upcoming")
               
                
                
                
              
                
    } )

}
getEventsData();


/* Calculations first table */

function calculations (arrData, dateToday) {
   
    /* calculating  percent events */
     let percents= []
        arrData.forEach(element => {
            if(element.assistance){
                let percent= (element.assistance *100)/ element.capacity;
                percent= percent.toFixed(2);
                percents.push(percent)
            }
            /* else if(element.estimate){
                let percent= (element.estimate *100)/ element.capacity;
                percent= percent.toFixed(2);
                percents.push(percent)
            }
             */
            
            
        });
        console.log(percents);

        /* highest percent */
        let maxPercent = Math.max(...percents);
        console.log(maxPercent);

        let eventArrMaxAttendance = arrData.filter(event => (((event.assistance *100)/event.capacity).toFixed(2) == maxPercent || ((event.estimate *100)/event.capacity).toFixed(2) == maxPercent ))
        //console.log(eventArrMaxAttendance);
        let eventMaxAttendance = eventArrMaxAttendance.map(name => name.name)
        //console.log(eventMaxAttendance);

        
        let result2 = eventMaxAttendance[0];



        /* lowest percent */
        let minPercent = Math.min(...percents);
        console.log(minPercent);
        let eventArrMinAttendance = arrData.filter(event => (((event.assistance *100)/event.capacity).toFixed(2) == minPercent || ((event.estimate *100)/event.capacity).toFixed(2) == minPercent ))
        let eventMinAttendance = eventArrMinAttendance.map(name => name.name)


        let result3 = eventMinAttendance[0];


   /* calculating event with the highest capacity  */
    const evCapacity = arrData.map(eventCapacity => eventCapacity.capacity);
    let maxCap = Math.max(...evCapacity);
    
    let eventMaxCapacity = arrData.filter(event => event.capacity == maxCap && event.date < dateToday)
    let result = eventMaxCapacity.map(name => name.name) 
    
    
    
    
    
    
    
    
    showtable(result,result2,result3)
    
    
}

function pastEvenCalculus(arrData, dateToday){


    let pastEventsList = arrData.filter(eDate => eDate.date < dateToday)
    pastEventsList.sort(function (a, b) {
        if (a.category > b.category) {
          return 1;
        }
        if (a.category < b.category) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    console.log(pastEventsList);
    let pastEventsRevenue = [];
    
        pastEventsList.forEach((eRev) => {
            let evReveneue = eRev.assistance * eRev.price
            pastEventsRevenue.push(evReveneue);
        } )

        /* pastEventsList.map(eCategory) */
    console.log(pastEventsRevenue);

}


/* show data in table */
    const showtable = (param1,param2, param3) => {
        let rowContainer = document.getElementById("eventsStatistics");
        let register = ''
        register += ` 

        <td class= "text-center">${param2}</td>
        <td class= "text-center">${param3}</td>
        
        <td class= "text-center">${param1}</td>
        
        `;
        rowContainer.innerHTML = register


    }

    
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

/* Calculations past and upcoming events statistics */

function calculationsByCategory(arrData) {
    /* creates an array with the unique categories */
    let categoryList = Array.from(new Set((arrData.map(evCat => evCat.category))));
    /* console.log(categoryList); */
    /* Creates an array with the events split by categories */
    let eventCategoryList = categoryList.map(evCat => arrData.filter(event => event.category == evCat));
    /* console.log(eventCategoryList); */
    /* Creates a new array of objects that contain the category, the total reveneue and the percentage of attendance of each category */
    let calculusResults = eventCategoryList.map(totCat => {
        /* creates an array that do the operations to show the total reveneue and attendance percentage by category of the events */
        let operation = totCat.reduce((accValue, currentEvent)=> {
            accValue.category = currentEvent.category;
            accValue.reveneue += currentEvent.price * (currentEvent.assistance || currentEvent.estimate);
            accValue.attendancePercent += ((currentEvent.assistance || currentEvent.estimate)* 100)/ currentEvent.capacity ;
            return accValue;
        }, 
        {
            category: "",
            reveneue: 0,
            attendancePercent: 0

        })
        operation.attendancePercent = operation.attendancePercent / totCat.length
        return operation
    })
    return calculusResults;
    
}
   







/* Drawing tables function */
function showCategoriesStatistics(arrData, container){
    const tbodyTable = document.getElementById(container)
    let innerTable = arrData.map(event =>{
        return `
            <tr>
                        <td class= "text-center">${event.category}</td>
                        <td class= "text-center">$ ${event.reveneue}</td>
                        <td class= "text-center">% ${event.attendancePercent.toFixed(2)}</td>
        
            </tr>
        `
    }) 
    tbodyTable.innerHTML = innerTable.join("")

}

   