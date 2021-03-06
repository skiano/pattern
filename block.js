
var _ = require('lodash'),
  d = {x: 'x', y: 'y'};

// TODO: handle rotation

function Block (dimensions, options) {

  options = _.extend({
    step: 0,
    direction: d.y,
    rotate: 0, // 90, -90, 180
  }, options);

  this.get = function (px, py) {
    p = arguments.length === 2 ? [px,py] : px;
    return findPoint(p, dimensions, options);
  };

}

module.exports = function (dimensions, options) {
  return new Block(dimensions, options);
};

function findPoint (p, dim, options) {

  var x = p[0],
    y = p[1],
    w = dim[0],
    h = dim[1],
    stepShiftX = 0,
    stepShiftY = 0;

  // decide shift amount
  if (options.direction === d.x) {
    stepShiftX = Math.floor(y / h);
  } else {
    stepShiftY = Math.floor(x / w);
  }

  // account for shift
  x = x + (stepShiftX * options.step);
  y = y + (stepShiftY * options.step);

  // account for overflow
  x = x >= 0 ? x % w : w - (Math.abs(x+1) % w) - 1;
  y = y >= 0 ? y % h : h - (Math.abs(y+1) % h) - 1;

  if (options.rotate === 180) {

    if ((Math.floor(p[0]/w)%2 === 1 && Math.floor(p[1]/h)%2 === 0) ||
        (Math.floor(p[0]/w)%2 === 0 && Math.floor(p[1]/h)%2 === 1)) {
      x = w - x - 1;
      y = h - y - 1;
    }
    
  }

  return [x,y];
}