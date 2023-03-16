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
               
                calculateMax(eventData,currentDate);
                calculePercent(eventData)
                
                
                
                
                
                
              
                
    } )

}
getEventsData();

/* calculate the attendance percent  event */
    function calculePercent(arrData) {
    
        let percents= []
        arrData.forEach(element => {
            if(element.assistance){
                let percent= (element.assistance *100)/ element.capacity;
                percent= percent.toFixed(2);
                percents.push(percent)
            }
            else if(element.estimate){
                let percent= (element.estimate *100)/ element.capacity;
                percent= percent.toFixed(2);
                percents.push(percent)
            }
            
            
            
        });
        console.log(percents);

        let maxPercent = Math.max(...percents);
        console.log(maxPercent);
        let result2 = ""
        

    }


/* calculate  max percent attendance */

/* calculate the min percent attendance */


/* calculate the event with largest capacity */
function calculateMax(arrData, dateToday) {
    const evCapacity = arrData.map(eventCapacity => eventCapacity.capacity);
    let maxCap = Math.max(...evCapacity);
    
    let eventMaxCapacity = arrData.filter(event => event.capacity == maxCap && event.date < dateToday)
    let result = eventMaxCapacity.map(name => name.name) 
    showtable(result, 0)
    
}


/* show data in table */
    const showtable = (param1,param2) => {
        let rowContainer = document.getElementById("eventsStatistics");
        let register = ''
        register += ` 
        <td>...</td>
        <td>${param2}</td>
        <td>${param1}</td>
        
        `;
        rowContainer.innerHTML = register


    }

    
   

   

   