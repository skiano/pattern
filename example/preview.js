var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'pattern';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '90%',
  height: '90%',
  content: '',
  tags: true,
  border: {
    type: 'line' // bg
  },
  style: {
    fg: 'white',
    border: {
      fg: 'red'
    }
  }
});

// Append our box to the screen.
screen.append(box);

function fill(box, ch) {
  var lines = [];
  for (var y = 0; y < box.height; y += 1) {
    var w = box.width - 4;
    var str = ' ' + new Array(w + 1).join(ch);

    lines.push(str);
  }

  box.setContent(lines.join('\n'));
}

fill(box, 'x');

// If our box is clicked, change the content.
box.on('click', function(data) {
  fill(box, '*');
  screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function(ch, key) {
  fill(box, '|');
  screen.render();
});

box.key('right', function(ch, key) {
  fill(box, '>');
  screen.render();
});

box.key('left', function(ch, key) {
  fill(box, '<');
  screen.render();
});

box.key('up', function(ch, key) {
  fill(box, '/');
  screen.render();
});

box.key('down', function(ch, key) {
  fill(box, '\\');
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();
