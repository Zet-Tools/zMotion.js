(function (window) {

  var zMotion = function (element, options) {

    const THIS    = this;
    const G       = 'g';
    const PATH    = 'path';
    const LINE    = 'line';
    const RECT    = 'rect';
    const POLYGON = 'polygon';
    const CIRCLE  = 'circle';

    var svgArr        = [];
    var svgArrShuffle = [];
    var delay         = 0

    var defaults = {
      delay             : 2,
      shuffle           : false,
      strokeDrawingTime : 100,
      fillDrawingTime   : 700,
      clearStroke       : true,
      clearFill         : true,
      drawStroke        : true,
      drawFill          : true,
      fillAfterStroke   : false,
      easing            : 'easeInQuad',
      terminus          : true,
      reverse           : false
    }

    var settings = $.extend({}, defaults, options);
    settings.delayIncrement = settings.delay;

    var svgElement = element;

    this.clear = function () {
      svgHandler.setAction(svgHandler.clearElement);
    };

    this.draw = function () {
      svgHandler.setAction(svgHandler.dashDraw);
    };

    this.rewind = function () {
      svgHandler.setAction(svgHandler.dashRewind);
    }

    var init = function () {
        svgHandler.parse(svgElement);

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
            console.log(svgNode.svgLength);
            svgArr.push(svgNode);
          }else if (circle) {
            svgNode.svgLength = self.getCircleLength(svgNode);
            svgArr.push(svgNode);
          }

        });


      },

      setAction : function (fn) {
        if(settings.reverse){
          if (settings.terminus) {
            this.effect.terminusReverse(fn);
          }else{
            this.effect.normalReverse(fn);
          }
        }else{
          if (settings.terminus) {
            this.effect.terminus(fn);
          }else{
            this.effect.normal(fn);
          }
        }
      },

      effect : {
        normal : function (fn) {
          var i;
          var svgArrLength = svgArr.length;
          for (i = 0 ; i < svgArrLength ; i++) {
            fn(svgArr[i]);
          }
        },

        terminus : function (fn) {
          var i,j;
          var svgArrLength = svgArr.length;
          for (var i = 0, j = svgArrLength - 1; i <= svgArrLength / 2 &&
             j >= svgArrLength / 2; i++, j--) {
            fn(svgArr[i]);
            fn(svgArr[j]);
          }
        },

        normalReverse : function (fn) {
          var i;
          var svgArrLength = svgArr.length;
          for (i = svgArrLength-1 ; i >= 0 ; i--) {
            fn(svgArr[i]);
          }
        },

        terminusReverse : function (fn) {
          var i,j;
          var svgArrLength = svgArr.length;
          for ( i = Math.ceil(svgArrLength / 2 - 1), j = Math.floor(svgArrLength / 2); i >= 0 &&
             j < svgArrLength ; i--, j++) {
            fn(svgArr[i]);
            fn(svgArr[j]);
          }

        }

      },

      clearElement : function (svgNode) {
        try{
          svgNode.css({
            "stroke-dasharray": svgNode.svgLength + "px",
            "stroke-dashoffset": svgNode.svgLength + "px"
          });

          if (settings.clearFill) {
            svgNode.css({
              "fill-opacity":"0"
            });
          }
        }catch(e){}
      },

      dashDraw: function(svgNode) {

        setTimeout((function(el){
          return function () {
            if (settings.clearStroke && settings.drawStroke) {
              el.animate({
                "stroke-dashoffset": 0
              }, {
                queue     : false,
                duration  : settings.strokeDrawingTime,
                easing    : settings.easing
              });
            }


            if (settings.clearFill && settings.drawFill) {
              if(settings.fillAfterStroke){
                delay = settings.strokeDrawingTime
              }
              el.delay(delay).animate({
                "fill-opacity": 1
              }, {
                queue     : true,
                duration  : settings.fillDrawingTime,
                easing    : settings.easing
              });
            }
          }


        })(svgNode), settings.delay);
        settings.delay += settings.delayIncrement;
      },

      dashRewind: function(svgNode) {

        setTimeout((function(el){
          return function () {
            if (settings.clearStroke && settings.drawStroke) {
              el.css({
                "stroke-dasharray": el.svgLength + "px"
              });
              el.animate({
                "stroke-dashoffset": el.svgLength + 'px'
              }, {
                queue     : false,
                duration  : settings.strokeDrawingTime,
                easing    : settings.easing
              });
            }


            if (settings.clearFill && settings.drawFill) {
              if(settings.fillAfterStroke){
                delay = settings.strokeDrawingTime
              }
              el.delay(delay).animate({
                "fill-opacity": 0
              }, {
                queue     : true,
                duration  : settings.fillDrawingTime,
                easing    : settings.easing
              });
            }
          }


        })(svgNode), settings.delay);
        settings.delay += settings.delayIncrement;
      },

      getPathLength : function(el) {
        var path       = el.get(0);
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


  /*
   * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
   *
   * Uses the built in easing capabilities added In jQuery 1.1
   * to offer multiple easing options
   *
   * TERMS OF USE - jQuery Easing
   *
   * Open source under the BSD License.
   *
   * Copyright © 2008 George McGinley Smith
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   *
   * Redistributions of source code must retain the above copyright notice, this list of
   * conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list
   * of conditions and the following disclaimer in the documentation and/or other materials
   * provided with the distribution.
   *
   * Neither the name of the author nor the names of contributors may be used to endorse
   * or promote products derived from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
   * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
   *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   *
  */

  // t: current time, b: begInnIng value, c: change In value, d: duration
  jQuery.easing['jswing'] = jQuery.easing['swing'];

  jQuery.extend( jQuery.easing,
  {
  	def: 'easeOutQuad',
  	swing: function (x, t, b, c, d) {
  		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  	},
  	easeInQuad: function (x, t, b, c, d) {
  		return c*(t/=d)*t + b;
  	},
  	easeOutQuad: function (x, t, b, c, d) {
  		return -c *(t/=d)*(t-2) + b;
  	},
  	easeInOutQuad: function (x, t, b, c, d) {
  		if ((t/=d/2) < 1) return c/2*t*t + b;
  		return -c/2 * ((--t)*(t-2) - 1) + b;
  	},
  	easeInCubic: function (x, t, b, c, d) {
  		return c*(t/=d)*t*t + b;
  	},
  	easeOutCubic: function (x, t, b, c, d) {
  		return c*((t=t/d-1)*t*t + 1) + b;
  	},
  	easeInOutCubic: function (x, t, b, c, d) {
  		if ((t/=d/2) < 1) return c/2*t*t*t + b;
  		return c/2*((t-=2)*t*t + 2) + b;
  	},
  	easeInQuart: function (x, t, b, c, d) {
  		return c*(t/=d)*t*t*t + b;
  	},
  	easeOutQuart: function (x, t, b, c, d) {
  		return -c * ((t=t/d-1)*t*t*t - 1) + b;
  	},
  	easeInOutQuart: function (x, t, b, c, d) {
  		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
  		return -c/2 * ((t-=2)*t*t*t - 2) + b;
  	},
  	easeInQuint: function (x, t, b, c, d) {
  		return c*(t/=d)*t*t*t*t + b;
  	},
  	easeOutQuint: function (x, t, b, c, d) {
  		return c*((t=t/d-1)*t*t*t*t + 1) + b;
  	},
  	easeInOutQuint: function (x, t, b, c, d) {
  		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
  		return c/2*((t-=2)*t*t*t*t + 2) + b;
  	},
  	easeInSine: function (x, t, b, c, d) {
  		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  	},
  	easeOutSine: function (x, t, b, c, d) {
  		return c * Math.sin(t/d * (Math.PI/2)) + b;
  	},
  	easeInOutSine: function (x, t, b, c, d) {
  		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  	},
  	easeInExpo: function (x, t, b, c, d) {
  		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  	},
  	easeOutExpo: function (x, t, b, c, d) {
  		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  	},
  	easeInOutExpo: function (x, t, b, c, d) {
  		if (t==0) return b;
  		if (t==d) return b+c;
  		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
  		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  	},
  	easeInCirc: function (x, t, b, c, d) {
  		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  	},
  	easeOutCirc: function (x, t, b, c, d) {
  		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  	},
  	easeInOutCirc: function (x, t, b, c, d) {
  		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
  		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  	},
  	easeInElastic: function (x, t, b, c, d) {
  		var s=1.70158;var p=0;var a=c;
  		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  		if (a < Math.abs(c)) { a=c; var s=p/4; }
  		else var s = p/(2*Math.PI) * Math.asin (c/a);
  		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  	},
  	easeOutElastic: function (x, t, b, c, d) {
  		var s=1.70158;var p=0;var a=c;
  		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  		if (a < Math.abs(c)) { a=c; var s=p/4; }
  		else var s = p/(2*Math.PI) * Math.asin (c/a);
  		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  	},
  	easeInOutElastic: function (x, t, b, c, d) {
  		var s=1.70158;var p=0;var a=c;
  		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
  		if (a < Math.abs(c)) { a=c; var s=p/4; }
  		else var s = p/(2*Math.PI) * Math.asin (c/a);
  		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  	},
  	easeInBack: function (x, t, b, c, d, s) {
  		if (s == undefined) s = 1.70158;
  		return c*(t/=d)*t*((s+1)*t - s) + b;
  	},
  	easeOutBack: function (x, t, b, c, d, s) {
  		if (s == undefined) s = 1.70158;
  		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  	},
  	easeInOutBack: function (x, t, b, c, d, s) {
  		if (s == undefined) s = 1.70158;
  		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
  		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  	},
  	easeInBounce: function (x, t, b, c, d) {
  		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  	},
  	easeOutBounce: function (x, t, b, c, d) {
  		if ((t/=d) < (1/2.75)) {
  			return c*(7.5625*t*t) + b;
  		} else if (t < (2/2.75)) {
  			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  		} else if (t < (2.5/2.75)) {
  			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  		} else {
  			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  		}
  	},
  	easeInOutBounce: function (x, t, b, c, d) {
  		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
  		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  	}
  });

  /*
   *
   * TERMS OF USE - EASING EQUATIONS
   *
   * Open source under the BSD License.
   *
   * Copyright © 2001 Robert Penner
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   *
   * Redistributions of source code must retain the above copyright notice, this list of
   * conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list
   * of conditions and the following disclaimer in the documentation and/or other materials
   * provided with the distribution.
   *
   * Neither the name of the author nor the names of contributors may be used to endorse
   * or promote products derived from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
   * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
   *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   */


  window.zMotion = zMotion;
})(this);
