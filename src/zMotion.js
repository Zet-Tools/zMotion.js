(function (window) {

  var zMotion = function (element, options) {

    const THIS = this;
    const G = 'g';
    const PATH = 'path';
    const LINE = 'line';

    var defaults = {
      delay     : 20,
      shffle    : false,
      duration  : 5000,
      clear     : true
    }

    var settings = $.extend({}, defaults, options);

    var svgElement = element;

    this.clear = function () {
      svgHandler.parse(svgElement, 'clear');
    }

    this.draw = function () {
      svgHandler.parse(svgElement, 'draw');
    }

    var init = function () {
      if (settings.clear) {
        svgHandler.parse(svgElement, 'clear');
      }
    }

    var svgHandler = {

      parse : function (svg, action) {

        var self = this;
        svg.children().each(function () {
          var svgNode = $(this);
          var group   = svgNode.is(G);
          var path    = svgNode.is(PATH);
          var line    = svgNode.is(LINE);

          if (group) {
            self.parse(svgNode, action);
          } else if (path) {
            if (action === 'clear') {
              self.clearElement(svgNode, self.getPathLength(svgNode));
            } else if (action === 'draw') {
              self.dashDraw(svgNode, settings.duration);
            }

          } else if (line) {
            if (action === 'clear') {
              self.clearElement(svgNode, self.getLineLength(svgNode));
            } else if (action === 'draw') {
              self.dashDraw(svgNode, settings.duration);
            }

          }

        });

      },

      clearElement : function (svgNode, elementLength) {
          svgNode.css({
            "stroke-dasharray": elementLength + "px",
            "stroke-dashoffset": elementLength + "px"
          });
      },

      dashDraw: function(el, duration) {
        el.animate({
          "stroke-dashoffset": 0
        }, {
          queue: false,
          duration: duration
        });
      },

      getPathLength : function (el) {
        var path = el.get(0);
        var pathLength = path.getTotalLength();
        return pathLength;
      },

      getLineLength: function(el) {
        var x1 = el.attr('x1');
        var x2 = el.attr('x2');
        var y1 = el.attr('y1');
        var y2 = el.attr('y2');
        var lineLength = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        return lineLength;
      }
    }

    init();

  }

  window.zMotion = zMotion;
})(this);
