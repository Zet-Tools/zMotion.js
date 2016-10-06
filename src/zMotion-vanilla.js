(function (window) {

    var zMotion = function (element, options) {

        var self    = this;
        var el      = [];
        var node    = [];

        var init = function () {
            prepareElements();
            nodeHandler.init();
        }


        var nodeHandler = {

            init : function () {
                this.parseElements();
            },

            parseElements : function () {

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
                if (elementLength > 1){
                    for (i = 0 ; i < elementLength ; i++) {
                        el.push(element[i]);
                    }
                    return;
                }
                el = element[0];
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
         * gets the length of a polygon
         * @param  {jQuery | HTML obj} node
         * @return {Number}
         */
        getPolygonLength : function (node) {
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
                len += this.dist(points[0], points[points.length-1]);
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
        }
    }

    window.zSvg    = svgHelper;
    window.zMotion = zMotion;
})(this)
