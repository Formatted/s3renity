var socket = io();
var svg = d3.select("svg");
var width = +svg.attr('width');
var height = +svg.attr('height');
var axesX = d3.scale.linear().domain([0,100]).range([10,width-10]);
var axesY = d3.scale.linear().domain([0,100]).range([10,height-10]);

var randomPostion = function(hi, wh, r) { // hight with r of circle
  var enemies = [];
  enemies.rrr = r;
  for (var i = 10 ; i < hi; i += (r * 2)) {
    for (var x = 10; x < wh; x += (r * 2)){
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

var update = function(data, naME) {
     d3.select(naME).selectAll('circle')
                   .data(data)
                   .enter().append('circle')
                   .attr('r', data.rrr)
                   .attr('cx', function(d) {return d[0]})
                   .attr('cy', function(d) {return d[1]})
                   .attr('id', function(d) {return 'asd' + d[0] + 'as' + d[1] + naME.slice(1)})
                   .on('mouseover', function() {
                    var pupY = this;
                    socket.emit('mousePozi', pupY.id);
                    // console.log('in mouseover', this.id);
                        // d3.select(this)
                        //   .transition().delay(rngNumber(0, 150))
                        //   .attr("fill", "white")
                        //   .transition().delay(rngNumber(15, 3000))
                        //   .attr('fill', 'black')
         });
};
var clear = function(data){
    d3.select('svg').selectAll('circle')
                   .data(data)
                   .exit().remove();
};
socket.on('mousePozi2', function(actual){
  console.log('#' + actual);
  d3.select('#' + actual + '')
                          .transition().delay(rngNumber(0, 150))
                          .attr("fill", "white")
                          .transition().delay(rngNumber(15, 3000))
                          .attr('fill', 'black');
});
// update(randomPostion(50, 10));
// clear([]);
// update(randomPostion(50, 60));
// clear([]);
// update(randomPostion(200, 10));
// clear([]);
// update(randomPostion(400, 100));
// clear([]);
update(randomPostion(500, 100, 10), '#svg2'); // should be sive of svg with, hight, r of circles
update(randomPostion(300, 800, 10), '#svg1');
update(randomPostion(300, 800, 10), '#svg3');