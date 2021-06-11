let containerWind = document.querySelector('#container')
let containerDirection = document.querySelector('#direccionViento')
let containerWind2 = document.querySelector('#container2')
let containerDirection2 = document.querySelector('#direccionViento2')



const urlcmsap = 'https://api.oceandrivers.com:443/v1.0/getWeatherDisplay/cmsap/?period=latesthour';
const urlcnarenal = 'https://api.oceandrivers.com:443/v1.0/getWeatherDisplay/cnarenal/?period=latesthour';

    window.onload  = getDataWind();

  function getDataWind (){

      updateCMSAP()
      updateArenal()
      
      };

 function updateCMSAP() {
   //CMSAP 
    fetch(urlcmsap)
      .then (resp => resp.json())        
      .then(function(datos) {
          mostrarDatosEstaciones(datos)          
          setTimeout(updateCMSAP, 5000); /// <-- now that this call is done, 
                                    //     we can program the next one                                  
        })    
      .catch (error => console.log(error))       
    
    }



    function updateArenal() {
        //CMSAP 
         fetch(urlcnarenal)
         .then (resp => resp.json())    
         .then(function(datos2) {
            cnArenal(datos2)             
            // console.log(datos2)
             // ... do something with your json ...
             setTimeout(updateArenal, 5000, 60); /// <-- now that this call is done, 
                                       
           })
           .catch (error => console.log(error))
         }
     


    function mostrarDatosEstaciones(datos){
        
        while (containerWind.firstChild){
            containerWind.removeChild(containerWind.firstChild)
        }

        while (containerDirection.firstChild){
            containerDirection.removeChild(containerDirection.firstChild)
        }

        let viento = document.createElement('h2')
        viento.textContent = datos.LATEST_DATA.TWS + 'kts'
        viento.classList.add('vientoKts')

        let direccionViento = document.createElement('h2')
        direccionViento.textContent = datos.LATEST_DATA.TWD +'º'
        direccionViento.classList.add('direccionvientoKts')

        let direccionCardinal = document.createElement('h2')        
        direccionCardinal.textContent = degToCard (datos.TWD)
        direccionCardinal.classList.add('direccionvientoKts')

        containerWind.appendChild(viento)
        //console.log(viento.textContent)

        containerDirection.appendChild(direccionViento)
        containerDirection.appendChild(direccionCardinal)

    }

    function cnArenal(datos2){        
        while (containerWind2.firstChild){
            containerWind2.removeChild(containerWind2.firstChild)
        }
        while (containerDirection2.firstChild){
            containerDirection2.removeChild(containerDirection2.firstChild)
        }
        
        //CNARENAL

        let viento2 = document.createElement('h2')
        viento2.textContent = datos2.LATEST_DATA.TWS + 'kts'
        viento2.classList.add('vientoKts')

        let direccionViento2 = document.createElement('h2')
        direccionViento2.textContent = datos2.LATEST_DATA.TWD +'º'
        direccionViento2.classList.add('direccionvientoKts')

        let direccionCardinal = document.createElement('h2')        
        direccionCardinal.textContent = degToCard (datos2.TWD)
        direccionCardinal.classList.add('direccionvientoKts')

        containerWind2.appendChild(viento2)
      
        
        containerDirection2.appendChild(direccionViento2)
        containerDirection2.appendChild(direccionCardinal)

    }

// PUNTOS CARDINALES PARA DIRECCION DEL VIENTO
    var degToCard = function(deg){
        if (deg>11.25 && deg<=33.75){
          return "NNE";
        }else if (deg>33.75 && deg<=56.25){
          return "NE";
        }else if (deg>56.25 && deg<=78.75){
          return "ENE";
        }else if (deg>78.75 && deg<=101.25){
          return "E";
        }else if (deg>101.25 && deg<=123.75){
          return "ESE";
        }else if (deg>123.75 && deg<=146.25){
          return "SE";
        }else if (deg>146.25 && deg<=168.75){
          return "SSE";
        }else if (deg>168.75 && deg<=191.25){
          return "S";
        }else if (deg>191.25 && deg<=213.75){
          return "SSW";
        }else if (deg>213.75 && deg<=236.25){
          return "SW";
        }else if (deg>236.25 && deg<=258.75){
          return "WSW";
        }else if (deg>258.75 && deg<=281.25){
          return "W";
        }else if (deg>281.25 && deg<=303.75){
          return "WNW";
        }else if (deg>303.75 && deg<=326.25){
          return "NW";
        }else if (deg>326.25 && deg<=348.75){
          return "NNW";
        }else{
          return "N"; 
        }
      }

 

      // GRAFICO VIENTO CN CAN PASTILLA
                    
fetch(urlcmsap)
      .then (resp2 => resp2.json())
      .then(datoscmsap => graficoVientocmsap(datoscmsap))
// chart colors
    var dataSetcmsap = []
    var dataSetcmsapGust = []
    var dataSetTimecmsap = []

function graficoVientocmsap(datoscmsap){
    //console.log(datosG.TIME[0],datosG.TIME[1],datosG.TIME[2] )
     
     //var horasViento = dataSetTime.getHours();
    for(let i=0; i<datoscmsap.length; i++){
        dataSetcmsap.push((datoscmsap.TWS[i]))
        dataSetcmsapGust.push(datoscmsap.TWS_GUST[i])
       
    }
   

    for(let i=0; i<datoscmsap.length; i++){
       // console.log(datosG.TIME[i])
        dataSetTimecmsap.push(new Date (datoscmsap.TIME[i]).toTimeString().slice(0,5))
       //console.log(dataSetTime)
    }

   


    
  
  
    /*let newArry = interpolateArray(dataSetcmsap, 200);
    //console.log(newArry)
   
    let newArryGust = interpolateArray(dataSetcmsapGust, 200);
    //console.log(newArry)
    let newArryTime = interpolateArray(dataSetTimecmsap, 200)*/

    var colors = ['#007bff','#0097fc','#333333','#c3e6cb','#dc3545','#ed872d']; 
 
      /* large line chart */
        var chLinecmsap = document.querySelector("#chLine");

        var datosGraph = {
            labels:  dataSetTimecmsap,
            datasets: [              
            {
                label: 'Viento',
                lineTension: 0.4,
                stepped: false,
                data: dataSetcmsap,
                backgroundColor: 'transparent',
                borderColor: colors[1],
                borderWidth: 2,
                pointBackgroundColor: colors[1],
                pointStyle: 'dash',
               // cubicInterpolationMode: 'monotone',
                
            },
            {
              label: 'Racha',
              lineTension: 0.4,
              stepped: false,
              data: dataSetcmsapGust,
                backgroundColor: 'transparent',
                borderColor: colors[5],
                borderWidth: 2,
                pointBackgroundColor: colors[5],
               pointStyle: 'dash',
              // cubicInterpolationMode: 'monotone'
    
            }
            ]
        
        };
        let maxWind = Math.max(...datosGraph.datasets[0].data)
        //console.log(maxWind)
       
        
        if (chLinecmsap) {   
            new Chart(chLinecmsap, {
            type: 'line',
            data: datosGraph,
            
            options: {
              //showLines: false,
              //snapGaps: false,
              elements:{
                
                responsive: false,
                maintainAspectRatio: false,
                line: {
                    borderJoinStyle: 'round',  
                    lineTension: 0                  
                   
                },
                
                
                point:{
                  radius: 1
                }
              },
                scales: {
                yAxes: [{
                    ticks: {
                      suggestedMax: maxWind + 2, // scale.max is Math.max(data.max, 1e6),
                      beginAtZero: true,
                      stepSize: 1,
                      maxTicksLimit: 50
                    }
                }],
                xAxes:[{
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 15                
                  }
                }]
                },
                legend: {
                display: true,
                autoDisplayLegend:true
                },
                
            }
            });
        } 

        
        
}

function interpolateArray(data, fitCount) {
  //console.log(data)

  var linearInterpolate = function (before, after, atPoint) {
      return before + (after - before) * atPoint;
  };
  
var newData = new Array();

var springFactor = new Number((data.length - 1) / (fitCount - 1));

newData[0] = data[0]; // for new allocation

for ( var i = 1; i < fitCount - 1; i++) {
  var tmp = i * springFactor;
  var before = new Number(Math.floor(tmp)).toFixed();
  var after = new Number(Math.ceil(tmp)).toFixed();
  var atPoint = tmp - before;
  newData[i] = linearInterpolate(data[before], data[after], atPoint);
  }
  newData[fitCount - 1] = data[data.length - 1]; // for new allocation
  console.log(newData)
  return newData;
};
      





//GRAFICO VIENTO CNARENAL


fetch(urlcnarenal)
      .then (resp => resp.json())
      .then(datosCNA => graficoViento(datosCNA))
// chart colors
function graficoViento(datosCNA){
    //console.log(datosG)
     var dataSetCNA = []
     var dataSetGustCNA = []
     var dataSetTimeCNA = []

     //console.log(datosG)
     //var horasViento = dataSetTime.getHours();
    for(let i=0; i<datosCNA.length; i++){
        //console.log(datosG.TWS_GUST)
        dataSetCNA.push(datosCNA.TWS[i])
        dataSetGustCNA.push(datosCNA.TWS_GUST[i])
        //console.log(dataSetGust)
    }

    for(let i=0; i<datosCNA.length; i++){
       // console.log(datosG.TIME[i])
        dataSetTimeCNA.push(new Date (datosCNA.TIME[i]).toTimeString().slice(0,5))
       //console.log(dataSetTime)
    }
    
    
  
    var colors = ['#007bff','#0097fc','#333333','#c3e6cb','#dc3545','#ed872d']; 
 
      /* large line chart */
        var chLineCNA = document.querySelector("#chLine2");

        var chartData = {
        labels:  dataSetTimeCNA,
        datasets: [{
            data: dataSetCNA,
            label: 'Viento',
            backgroundColor: 'transparent',
            borderColor: colors[1],
            borderWidth: 2,
            pointBackgroundColor: colors[3],
                pointStyle: 'dash',
                cubicInterpolationMode: 'monotone'
        },
        {
          data: dataSetGustCNA,
          label: 'Racha',
            backgroundColor: 'transparent',
            borderColor: colors[5],
            borderWidth: 2,
            pointBackgroundColor: colors[5],
                pointStyle: 'dash',
                cubicInterpolationMode: 'monotone'

        }
        ]
        
        };
        let maxWind = Math.max(...chartData.datasets[0].data)
        

        if (chLineCNA) {   
        new Chart(chLineCNA, {
        type: 'line',
        data: chartData,
        options: {
          elements:{
            point:{
              radius: 0
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                suggestedMax: maxWind + 3, // scale.max is Math.max(data.max, 1e6),
                beginAtZero: true,
                stepSize: 0.5,
                maxTicksLimit: 25
              }
          }],
          xAxes:[{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 15                 
            }
          }]
          },
          legend: {
          display: true,
          autoDisplayLegend:true
          },
      }
        });
        }   

        


}


