(function (window) {

  var zMotion = function (element, options) {

    const THIS    = this;
    const G       = 'g';
    const PATH    = 'path';
    const LINE    = 'line';
    const RECT    = 'rect';
    const POLYGON = 'polygon';
    const CIRCLE  = 'circle';

    var svgArr = [];
    var svgArrShuffle = [];

    var defaults = {
      delay             : 20,
      shuffle           : false,
      strokeDrawingTime : 5000,
      fillDrawingTime   : 5000,
      clearStroke       : true,
      clearFill         : true,
      drawStroke        : true,
      drawFill          : true
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
        console.log(svgArr);
        if (settings.clearStroke) {
          THIS.clear()
        };

        if (settings.shuffle) {
          svgHandler.arrayShuffle(svgArr);
        }
    }

    var svgHandler = {

      parse : function (svg) {

        var self = this;
        svg.children().each(function () {
          var svgNode = $(this);
          var group   = svgNode.is(G);
          var path    = svgNode.is(PATH);
          var line    = svgNode.is(LINE);
          var rect    = svgNode.is(RECT);
          var polygon = svgNode.is(POLYGON);
          var circle  = svgNode.is(CIRCLE);

          if (group) {
            self.parse(svgNode);
          } else if (path) {
            svgNode.svgLength = self.getPathLength(svgNode);
            svgArr.push(svgNode);
          } else if (line) {
            svgNode.svgLength = self.getLineLength(svgNode);
            svgArr.push(svgNode);
          }else if (rect) {
            svgNode.svgLength = self.getRectLength(svgNode);
            svgArr.push(svgNode);
          }else if (polygon) {
            svgNode.svgLength = self.getPolygonLength(svgNode);
            svgArr.push(svgNode);
          }else if (circle) {
            svgNode.svgLength = self.getCircleLength(svgNode);
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

          if (settings.clearFill) {
            svgNode.css({
              "fill-opacity":"0"
            });
            // transform: perspective(500px) translateZ( 100px);

            // svgNode.css({
            //   "transition" : "all 0.5s",
            //   "transform-origin":"center center",
            //   "transform":"scale(0)"
            // });

          }

      },

      dashDraw: function(svgNode) {

        setTimeout((function(el){
          return function () {
            if (settings.clearStroke && settings.drawStroke) {
              el.animate({
                "stroke-dashoffset": 0
              }, {
                queue: false,
                duration: settings.strokeDrawingTime
              });
            }


            if (settings.clearFill && settings.drawFill) {
              el.animate({
                "fill-opacity": 1
              }, {
                queue: false,
                duration: settings.fillDrawingTime
              });
              // el.css({
              //   "transform" : "scale(5.2)"
              // }).delay(1000).css({
              //   "transition" : "all 0.2s",
              //   "transform" : "scale(1)"
              // })
            }
          }


        })(svgNode), settings.delay);
        settings.delay += settings.delayIncrement;
      },

      getPathLength : function(el) {
        var path = el.get(0);
        var pathLength = path.getTotalLength();
        return pathLength;
      },

      getLineLength : function(el) {
        var x1 = el.attr('x1');
        var x2 = el.attr('x2');
        var y1 = el.attr('y1');
        var y2 = el.attr('y2');
        var lineLength = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        return lineLength;
      },

      getRectLength : function(el) {
         var w = el.attr('width');
         var h = el.attr('height');

         return (w * 2) + (h * 2);
       },

       getPolygonLength : function(el) {
          var points = el.attr('points');
          points = points.split(' ');
          if (points.length > 1) {
            function coord(c_str) {
              var c = c_str.split(',');
              if (c.length != 2) {
                return; // return undefined
              }
              if (isNaN(c[0]) || isNaN(c[1])) {
                return;
              }
              return [parseFloat(c[0]), parseFloat(c[1])];
            }

            function dist(c1, c2) {
              if (c1 != undefined && c2 != undefined) {
                return Math.sqrt(Math.pow((c2[0]-c1[0]), 2) + Math.pow((c2[1]-c1[1]), 2));
              } else {
                return 0;
              }
            }

            var len = 0;
            // measure polygon
            if (points.length > 2) {
              for (var i=0; i<points.length-1; i++) {
                len += dist(coord(points[i]), coord(points[i+1]));
              }
            }
            // measure line or measure polygon close line
            len += dist(coord(points[0]), coord(points[points.length-1]));
            return len;
          } else {
            return 0;
          }
        },

        getCircleLength : function(el) {
          var r = el.attr('r');
          var circleLength = 2 * Math.PI * r;
          return circleLength;
        },

        arrayShuffle : function(o) {
          for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
          return o;
        },
    }

    init();

  }

  window.zMotion = zMotion;
})(this);
