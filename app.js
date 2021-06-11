let containerWind = document.querySelector('#container')
let containerDirection = document.querySelector('#direccionViento')
let containerWind2 = document.querySelector('#container2')
let containerDirection2 = document.querySelector('#direccionViento2')



const urlcmsap = 'https://api.oceandrivers.com:443/v1.0/getWeatherDisplay/cmsap/?period=latestdata';
const urlcnarenal = 'https://api.oceandrivers.com:443/v1.0/getWeatherDisplay/cnarenal/?period=latestdata';

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

       //console.log(datos)
        // ... do something with your json ...
        setTimeout(updateCMSAP, 5000, 60); /// <-- now that this call is done, 
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
             //console.log(datos)
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
        viento.textContent = datos.TWS + 'kts'
        viento.classList.add('vientoKts')

        let direccionViento = document.createElement('h2')
        direccionViento.textContent = datos.TWD +'º'
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
        viento2.textContent = datos2.TWS + 'kts'
        viento2.classList.add('vientoKts')

        let direccionViento2 = document.createElement('h2')
        direccionViento2.textContent = datos2.TWD +'º'
        direccionViento2.classList.add('direccionvientoKts')

        let direccionCardinal = document.createElement('h2')        
        direccionCardinal.textContent = degToCard (datos2.TWD)
        direccionCardinal.classList.add('direccionvientoKts')

        containerWind2.appendChild(viento2)
      
        
        containerDirection2.appendChild(direccionViento2)
        containerDirection2.appendChild(direccionCardinal)

    }


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

const urlGrafico2 = 'https://api.oceandrivers.com:443/v1.0/getWeatherDisplay/cmsap/?period=latesthour';
                    
fetch(urlGrafico2)
      .then (resp2 => resp2.json())
      .then(datosG2 => graficoViento2(datosG2))
// chart colors
function graficoViento2(datosG2){
    //console.log(datosG.TIME[0],datosG.TIME[1],datosG.TIME[2] )
     var dataSet2 = []
     var dataSet2Gust = []
     var dataSetTime2 = []
     //var horasViento = dataSetTime.getHours();
    for(let i=0; i<datosG2.length; i++){
       // console.log(datosG2.TWS[i])
      
        dataSet2.push(parseFloat(datosG2.TWS[i]))
        dataSet2Gust.push(datosG2.TWS_GUST[i])
        console.log(dataSet2)
    }

    for(let i=0; i<datosG2.length; i++){
       // console.log(datosG.TIME[i])
        dataSetTime2.push(new Date (datosG2.TIME[i]).toTimeString().slice(0,5))
       //console.log(dataSetTime)
    }

    
    
    
  
    var colors = ['#007bff','#0097fc','#333333','#c3e6cb','#dc3545','#ed872d']; 
 
      /* large line chart */
        var chLine = document.querySelector("#chLine");

        var datosGraph = {
            labels:  dataSetTime2,
            datasets: [{
                label: 'Viento',
                data: dataSet2,
                backgroundColor: 'transparent',
                borderColor: colors[1],
                borderWidth: 2,
                pointBackgroundColor: colors[1],
                pointStyle: 'dash',
                cubicInterpolationMode: 'monotone'
            },
            {
              label: 'Racha',
              data: dataSet2Gust,
                backgroundColor: 'transparent',
                borderColor: colors[5],
                borderWidth: 2,
                pointBackgroundColor: colors[5],
                pointStyle: 'dash',
                cubicInterpolationMode: 'monotone'
    
            }
            ]
        
        };
        let maxWind = Math.max(...datosGraph.datasets[0].data)
        //console.log(maxWind)
       
        
        if (chLine) {   
            new Chart(chLine, {
            type: 'line',
            data: datosGraph,
            options: {
              elements:{
                showLines:true,
                spanGaps: false,
                
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



//GRAFICO VIENTO CNARENAL
/* chart.js chart examples */
const urlGrafico = 'https://api.oceandrivers.com:443/v1.0/getWeatherDisplay/cnarenal/?period=latesthour' ;//"https://api.oceandrivers.com:443/v1.0/getWeatherDisplay/cnarenal/?period=latestday";

fetch(urlGrafico)
      .then (resp => resp.json())
      .then(datosG => graficoViento(datosG))
// chart colors
function graficoViento(datosG){
    //console.log(datosG)
     var dataSet = []
     var dataSetGust = []
     var dataSetTime = []

     //console.log(datosG)
     //var horasViento = dataSetTime.getHours();
    for(let i=0; i<datosG.length; i++){
        //console.log(datosG.TWS_GUST)
        dataSet.push(datosG.TWS[i])
        dataSetGust.push(datosG.TWS_GUST[i])
        //console.log(dataSetGust)
    }

    for(let i=0; i<datosG.length; i++){
       // console.log(datosG.TIME[i])
        dataSetTime.push(new Date (datosG.TIME[i]).toTimeString().slice(0,5))
       //console.log(dataSetTime)
    }
    
    
  
    var colors = ['#007bff','#0097fc','#333333','#c3e6cb','#dc3545','#ed872d']; 
 
      /* large line chart */
        var chLine2 = document.querySelector("#chLine2");

        var chartData = {
        labels:  dataSetTime,
        datasets: [{
            data: dataSet,
            backgroundColor: 'transparent',
            borderColor: colors[1],
            borderWidth: 2,
            pointBackgroundColor: colors[3],
                pointStyle: 'dash',
                cubicInterpolationMode: 'monotone'
        },
        {
          data: dataSetGust,
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
        

        if (chLine2) {   
        new Chart(chLine2, {
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