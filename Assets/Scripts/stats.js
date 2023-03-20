let fetchedData = [];
let statistics= [];

function getEventsData(){
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(dataApi => {
                //console.log(dataApi);
                fetchedData = dataApi;
                /* console.log(fetchedData); */
                const eventData = fetchedData.events;
                const currentDate = fetchedData.currentDate;
                /* console.log(eventData); */
               
                calculations(eventData,currentDate);
                pastEvenCalculus(eventData, currentDate);
                
                
                
               
                
                
                
              
                
    } )

}
getEventsData();




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
    console.log(pastEventsList);

    let pastEventsRevenue = [];
    
        pastEventsList.forEach((eRev) => {
            let evReveneue = eRev.assistance * eRev.price
            pastEventsRevenue.push(evReveneue);
        } )
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

    
   

   

   