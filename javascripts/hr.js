var generateHr = function(target, identifier){
  var identifierNumber = _.map(identifier.split(""), function(char){
    return char.charCodeAt(0);
  }).join("");

  var chance = new Chance(identifierNumber);
  
  var cellSize = 16;
  var cellPadding = 2;
  
  var horisontalCellCount = chance.integer({min: 4, max: 15});
  var verticalCellCount = chance.integer({min: 2, max: 4});
  
  var width = cellSize * horisontalCellCount;
  var height = cellSize * verticalCellCount;
  
  var textArray = 'NACYOT의프로그래밍이야기'.split('');
  
  var data = Array(verticalCellCount);
  data = _.map(data, function(item, verticalIndex){
    return _.map(Array(horisontalCellCount), function(item, horisontalIndex){
      return {
        verticalIndex: verticalIndex, 
        horisontalIndex: horisontalIndex, 
        shape: ['circle' ,'rect', 'null', 'text', 'text'][chance.integer({min: 0, max: 4})]
      };
    });
  });
  
  var svg = d3.select(target).append("svg")
        .attr("width", width)
        .attr("height", height);

  target.setAttribute('style', 'width: ' +width + 'px;');
  
  // svg.style('border', '1px solid red');
  
  var cells = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('g')
        .selectAll('circle')
        .data(function(row){
          return row;
        })
        .enter()
        .append('g');
  
  cells.filter(function(d){ return d.shape === 'circle';})
    .append('circle')
    .attr('cx', function(d){return d.horisontalIndex * cellSize + cellSize / 2; })
    .attr('cy', function(d){return d.verticalIndex * cellSize + cellSize / 2; })
    .attr('r', (cellSize - cellPadding) / 2)
    .attr('fill', function(){ return d3.hsl(chance.integer({min: 0, max: 360}), chance.floating({min: 0, max: 1}), 0.65);});

  cells.filter(function(d){ return d.shape === 'rect';})
    .append('rect')
    .attr('x', function(d){return d.horisontalIndex * cellSize + cellPadding; })
    .attr('y', function(d){return d.verticalIndex * cellSize + cellPadding; })
    .attr('width', cellSize - cellPadding * 2)
    .attr('height', cellSize - cellPadding * 2)
    .attr('fill', function(){ return d3.hsl(chance.integer({min: 0, max: 360}), chance.floating({min: 0, max: 1}), 0.65);});

  cells.filter(function(d){ return d.shape === 'text';})
    .append('text')
    .text(function(d){ return textArray[chance.integer({min: 0, max: textArray.length})];})
    .attr('x', function(d){return d.horisontalIndex * cellSize + cellPadding; })
    .attr('y', function(d){return d.verticalIndex * cellSize + cellPadding + 10; })
    .attr('fill', function(){ return d3.hsl(chance.integer({min: 0, max: 360}), chance.floating({min: 0, max: 1}), 0.65);})
    .style('font-size', '12px')
    .style('font-weight', 'bold');
};

$(function(){
  _.each($('.barcode'), function(target){ generateHr(target, target.getAttribute('data-title')); });
});
