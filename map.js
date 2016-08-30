var socket = io();

// var places2Draw = [['City',   'Population']];

// var getData123 = function(){
//   var palcesToDraw = [['City',   'Population']];

//   var placesObj = {};
//   var gotItFinally;
//   var soManyThings = $.get("citidata", function(data, status){
//     console.log(status, "status");
//     if(data){
//     gotItFinally = timeFoo(data);
//     return gotItFinally;
//     }
//   console.log(data, "------------------");
//   });
//   console.log(gotItFinally, 'undefined???');
//   return soManyThings;
// };
// var timeFoo = function(data){
//   placesObj = data;
//       for(var key in placesObj){
//         if(key !== undefined){
//           palcesToDraw.push([key, palcesToDraw[key]]);
//         }
//       }
//     return palcesToDraw;
// };

// fake array of places
var palcesToDraw = [
        ['City',   'Population'],
        ['Denver',      10],
        // ['San Francisco',     10],
        // ['Kansas',    200],
        // ['Brandermill',     10],
        // ['Washington',   10],
        // ['Nashville', 10],
        // ['Boston', 10],
        // ['Seatle', 10],
        // ['Portlan', 10],
        // ['Miami',  10],
        // ['Omaha', 10],
        // ['Wichita', 10],
        // ['Dallas', 10],
        // ['Huston', 10],
        // ['Phoeniex', 10],
        // ['Fargo', 10],
        // ['Bismarck', 10]
      ];
// just adding to the fke data set
var fooTest = function(asd){
  for (var x = 1; x < asd.length; x += 2){
    asd[x][1] += 3;
    if(asd[x][1] > 15){
      asd[x][1] = 0;
    }
  }
  // console.log("working", asd[1][1]);
};

setInterval(function(){
  fooTest(palcesToDraw);
}, 1000);

socket.on('cityList', function(msg){
  console.log(msg);
  var holder = [['City',   'Population']];
  for(var key in msg){
    holder.push([key, msg[key]]);
  }
  palcesToDraw = holder;
  console.log(palcesToDraw);
});

google.charts.load('current', {'packages': ['geochart']});
     google.charts.setOnLoadCallback(drawMarkersMap);

      function drawMarkersMap() {
      var data = google.visualization.arrayToDataTable(palcesToDraw);

      var options = {
        region: 'US',
        displayMode: 'markers',
        legend: 'none',
        colorAxis: {colors: ['black', 'black']},
        backgroundColor: '#000000',
          datalessRegionColor: 'white',
          defaultColor: 'white',
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(data, options);
      // setInterval( function(){
      //   console.log(data);
      //  chart.draw(data, options);
      // }, 3000);
    }
// this redraws the map
// setInterval(drawMarkersMap, 2000);