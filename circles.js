var svg = d3.select("svg");
var width = +svg.attr('width');
var height = +svg.attr('height');
var axesX = d3.scale.linear().domain([0,100]).range([10,width-10]);
var axesY = d3.scale.linear().domain([0,100]).range([10,height-10]);

var randomPostion = function(h, r) {
  var enemies = [];
  for (var i = 10 ; i < h; i += 20) {
    for (var x = 10; x < r; x += 20){
      enemies.push([i, x]);
      }
    }
  return enemies;
};
var rngNumber = function(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var update = function(data) {
     d3.select('svg').selectAll('circle')
                   .data(data)
                   .enter().append('circle')
                   .attr('cx', function(d) {return d[0]})
                   .attr('cy', function(d) {return d[1]})
                   .on('mouseover', function() {
                        d3.select(this)
                          .transition().delay(rngNumber(0, 150))
                          .attr("fill", "white")
                          .transition().delay(rngNumber(15, 3000))
                          .attr('fill', 'black')
         });
};
var clear = function(data){
    d3.select('svg').selectAll('circle')
                   .data(data)
                   .exit().remove();
};

// update(randomPostion(50, 10));
// clear([]);
// update(randomPostion(50, 60));
// clear([]);
// update(randomPostion(200, 10));
// clear([]);
// update(randomPostion(400, 100));
// clear([]);
update(randomPostion(500, 100)); // should be sive of svg with, hight