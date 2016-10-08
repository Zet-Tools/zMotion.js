(function (window) {

    var zMotion = function (element, options) {

        var self    = this;
        var el      = [];
        // array of all the svgs
        var svg     = [];
        var settings = {
            duration    : '0.7s',
            clearStroke : true,
            clearFill   : true
        }

        this.clear = function () {
            svgManager.run('clear');
        };

        var init = function () {
            prepareElements();
            nodeHandler.init();
            svgManager.init();
        }

        var svgManager = {

            init : function () {
                svgManager.run('clear');
            },

            run : function (action) {
                var i;
                var svgLength = svg.length;
                for (i = 0 ; i < svgLength ; i++) {
                    this.processFactory(svg[i], action);
                };
            },

            clearSVG : function (svg, clearStroke, clearFill) {
                var i, node;
                var clearStroke = typeof clearStroke !== 'undefined' ? clearStroke : true;
                var clearFill   = typeof clearFill !== 'undefined' ? clearFill : true;
                var svgLength   = svg.length;
                for (i = 0 ; i < svgLength ; i++){
                    node = svg[i];
                    node.style.transition = "all";
                    if (clearStroke) {
                        this.clearStroke(node);
                    }

                    if (clearFill) {
                        this.clearFill(node)
                    }
                }
            },

            clearStroke : function (node) {
                node.style.strokeDashoffset     = node.zLength;
                node.style.strokeDasharray      = node.zLength;
            },

            clearFill : function (node) {
                node.style.fillOpacity     = 0;
            },

            processFactory : function (svg, action) {
                var that = this;
                setTimeout (function () {
                    switch (action) {
                        case 'clear':
                            that.clearSVG(svg, settings.clearStroke, settings.clearFill);
                            break;
                        case 'draw' :
                            break;
                    }
                },0);
            }
        }

        var nodeHandler = {

            rect        : "rect",
            circle      : "circle",
            ellipse     : "ellipse",
            polygon     : "polygon",
            polyline    : "polyline",
            line        : "line",
            path        : "path",
            group       : "g",

            init : function () {
                this.parseElements();
                console.log(svg);
            },

            parseElements : function () {
                var i;
                var elLength = el.length;
                for (i = 0 ; i < elLength ; i++) {
                    svg[i] = [];
                    this.parseSvgNodes(el[i], i);
                }
            },

            parseSvgNodes : function (svgNode, index) {
                var i, node;
                var svgNodeLength = svgNode.children.length;
                for ( i = 0 ; i < svgNodeLength ; i++){
                    node = svgNode.children[i];
                    switch (node.nodeName) {
                        case this.group:
                            this.parseSvgNodes(node, index);
                            break;
                        case this.path:
                            node.zLength = svgHelper.getPathLength(node);
                            break;
                        case this.rect:
                            node.zLength = svgHelper.getRectLength(node);
                            break;
                        case this.polygon:
                            node.zLength = svgHelper.getPolygonLength(node, false);
                            break;
                        case this.polyline:
                            node.zLength = svgHelper.getPolygonLength(node, true);
                            break;
                        case this.circle:
                            node.zLength = svgHelper.getCircleLength(node);
                            break;
                        case this.ellipse:
                            node.zLength = svgHelper.getEllipseLength(node);
                            break;
                        case this.line:
                            node.zLength = svgHelper.getLineLength(node);
                            break;
                    }

                    if (node.nodeName !== this.group) {
                        svg[index].push(node);
                    }

                }
            }

        }


        /**
         * checks to see if the element/elements are a jquery object,
         * and populates the global node variable with html objects
         *
         */
        function prepareElements () {
            if (element instanceof jQuery) {
                var i, elementLength = element.length;
                for (i = 0 ; i < elementLength ; i++) {
                    el.push(element[i]);
                }
                return;
            }
            el = element;
        }

        init();
        // used for debuggin
        this.testNode = el;
        return this.testNode;
    }


    var svgHelper = {

        /**
         * @description
         * if the node is as a jQuery object it will convert it into HTML object
         * @param  {node} element
         * @return {HTML node}
         */
        prepareNode : function  (element) {
            if (element instanceof jQuery) {
                return element[0];
            }
            return element;
        },

        /**
         * @description
         * Distance between two points
         * @param  {Array} c1 {x:0,y:0}
         * @param  {Array} c2 {x:0,y:0}
         * @return {Number}
         */
        dist : function (c1, c2) {
            if (c1 != undefined && c2 != undefined) {
                return Math.sqrt(Math.pow((c2.x-c1.x), 2) + Math.pow((c2.y-c1.y), 2));
            } else {
                return 0;
            }
        },

        /**
         * @description
         * gets the length of a polygon or a polyline
         * @param  {jQuery | HTML obj} node
         * @param  {bool} isPolyLine ,
         * if true calculates the length of a polyline
         * @return {Number}
         */
        getPolygonLength : function (node, isPolyLine) {
            var n               = this.prepareNode(node);
            var points          = n.points;
            var pointsLength    = points.length;
            var len             = 0;

            if (pointsLength < 2) {
                return len;
            }

            if ( pointsLength === 2) {
                return  this.dist(points[0], points[1]);
            }

            if (pointsLength > 2) {
                var i;
                for(i = 0 ; i < pointsLength - 1 ; i++) {
                    len += this.dist(points[i], points[i+1]);
                }
                if (!isPolyLine) {
                    len += this.dist(points[0], points[points.length-1]);
                }
                return len;
            }
        },

        /**
         * @description
         * gets the length of a line node
         * @param  {jQuery | HTML obj} node
         * @return {Number}
         */
        getLineLength : function (node) {
            var n = this.prepareNode(node);

            var c1 = {
                x : parseInt(n.getAttribute("x1")),
                y : parseInt(n.getAttribute("y1")),
            }

            var c2 = {
                x : parseInt(n.getAttribute("x2")),
                y : parseInt(n.getAttribute("y2")),
            }

            return this.dist(c1,c2)
        },

        /**
         * @description
         * gets the length of a rect node
         * @param  {jQuery | HTML obj} node
         * @return {Number}
         */
        getRectLength : function (node) {
            var n = this.prepareNode(node);
            var w = parseInt(n.getAttribute('width'));
            var h = parseInt(n.getAttribute('height'));
            return w * 2 + h * 2;
        },

        /**
         * @description
         * gets the length of a circle node
         * @param  {jQuery | HTML obj} node
         * @return {Number}
         */
        getCircleLength : function (node) {
            var n = this.prepareNode(node);
            var r = n.getAttribute('r');
            return 2 * Math.PI * r;
        },

        /**
         * @description
         * gets the length of a ellipse node
         * @param  {jQuery | HTML obj} node
         * @return {Number}
         */
        getEllipseLength : function (node) {
            var n = this.prepareNode(node);
            var rx = parseInt(n.getAttribute('rx'));
            var ry = parseInt(n.getAttribute('ry'));
            var h = Math.pow((rx-ry), 2) / Math.pow((rx+ry), 2);
            return (Math.PI * ( rx + ry )) * (1 + ( (3 * h) / ( 10 + Math.sqrt( 4 - (3 * h) )) ));
        },

        /**
         * @description
         * gets the length of a path node
         * @param  {jQuery | HTML obj} node
         * @return {Number}
         */
        getPathLength : function (node) {
            var n = this.prepareNode(node);
            return n.getTotalLength();
        }
    }

    window.zSvg    = svgHelper;
    window.zMotion = zMotion;
})(this)
