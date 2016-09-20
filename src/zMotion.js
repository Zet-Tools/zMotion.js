(function (window) {

  var zMotion = function (element, options) {

    const THIS = this;
    const G = 'g';
    const PATH = 'path';
    const LINE = 'line';

    var svgArr = [];

    var defaults = {
      delay     : 20,
      shffle    : false,
      duration  : 5000,
      clear     : true
    }

    var settings = $.extend({}, defaults, options);
    settings.delayIncrement = settings.delay;

    var svgElement = element;

    this.clear = function () {
      svgHandler.setAction(svgHandler.clearElement);
    }

    this.draw = function () {
      svgHandler.setAction(svgHandler.dashDraw);
    }

    var init = function () {
        svgHandler.parse(svgElement);
    }

    var svgHandler = {

      parse : function (svg) {

        var self = this;
        svg.children().each(function () {
          var svgNode = $(this);
          var group   = svgNode.is(G);
          var path    = svgNode.is(PATH);
          var line    = svgNode.is(LINE);

          if (group) {
            self.parse(svgNode);
          } else if (path) {
            svgNode.svgLength = self.getPathLength(svgNode);
            svgArr.push(svgNode);
          } else if (line) {
            svgNode.svgLength = self.getLineLength(svgNode);
            svgArr.push(svgNode);
          }

        });
      },

      setAction : function (fun) {
        var i;
        var svgArrLength = svgArr.length;
        for (i = 0 ; i < svgArrLength ; i++) {
          fun(svgArr[i]);
        }
      },

      clearElement : function (svgNode) {
          svgNode.css({
            "stroke-dasharray": svgNode.svgLength + "px",
            "stroke-dashoffset": svgNode.svgLength + "px"
          });
      },

      dashDraw: function(svgNode) {

        setTimeout((function(el){
          return function () {
            el.animate({
              "stroke-dashoffset": 0
            }, {
              queue: false,
              duration: settings.duration
            });
          }


        })(svgNode), settings.delay);
        settings.delay += settings.delayIncrement;
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
