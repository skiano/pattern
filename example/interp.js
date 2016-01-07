
// http://paulbourke.net/miscellaneous/interpolation/
function hermite(a, b, c, d, mu, tension, bias) {

}

function hermite2D(p1, p2, p3, p4, tension, bias) {

}

// http://www.flipcode.com/archives/Fast_Approximate_Distance_Functions.shtml
function approxDistance(dx, dy) {
  var min, max, approx;

  if (dx < 0) dx = -dx;
  if (dy < 0) dy = -dy;

  if (dx < dy) {
    min = dx;
    max = dy;
  } else {
    min = dy;
    max = dx;
  }

  approx = (max * 1007) + (min * 441);
  if (max < (min << 4)) approx -= (max * 40);

  // add 512 for proper rounding
  return ((approx + 512) >> 10 );
}

function cheapDistance(p1, p2) {
  return approxDistance(p2[0] - p1[0], p2[1] - p1[1]);
}

function distance(p1, p2) {
  var x1 = p1[0]
    , x2 = p2[0]
    , y1 = p1[1]
    , y2 = p2[1]
    ;

  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}


var p1 = [0, 0];
var p2, i;
for (i = 0; i < 10; i += 1) {
  p2 = [i, i * 2];
  var d = distance(p1, p2);
  var ad = cheapDistance(p1, p2);
  var err = d ? Math.abs(d - ad) / d * 100 : 0;
  console.log(err);
}

