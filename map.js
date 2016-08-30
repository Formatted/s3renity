google.charts.load('current', {'packages': ['geochart']});
     google.charts.setOnLoadCallback(drawMarkersMap);

      function drawMarkersMap() {
      var data = google.visualization.arrayToDataTable([
        ['City',   'Population'],
        ['Denver',      1],
        ['Aurora',     2],
        ['Kansas',    1],
        ['Brandermill',     2],
        ['Washington',   3],
        ['Florida',  1]
      ]);

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
    };