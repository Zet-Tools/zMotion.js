//TODO: needs to be converted into TS
export const SvgHelper = {

    dist : function (c1:any, c2:any) {
        if (c1 != undefined && c2 != undefined) {
            return Math.sqrt(Math.pow((c2.x-c1.x), 2) + Math.pow((c2.y-c1.y), 2));
        } else {
            return 0;
        }
    },

    getPolygonLength : function (node:any, isPolyLine:any) {
        var n               = node;
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
        return len;
    },

    getLineLength : function (node:any) {
        var n = node;

        var c1 = {
            x : parseInt(n.getAttribute("x1")),
            y : parseInt(n.getAttribute("y1")),
        }

        var c2 = {
            x : parseInt(n.getAttribute("x2")),
            y : parseInt(n.getAttribute("y2")),
        }

        return Math.ceil(this.dist(c1,c2))
    },

    getRectLength : function (node:any) {
        var n = node;
        var w = parseInt(n.getAttribute('width'));
        var h = parseInt(n.getAttribute('height'));
        return Math.ceil(w * 2 + h * 2);
    },

    getCircleLength : function (node:any) {
        var n = node;
        var r = n.getAttribute('r');
        return 2 * Math.PI * r;
    },

    getEllipseLength : function (node:any) {
        var n = node;
        var rx = parseInt(n.getAttribute('rx'));
        var ry = parseInt(n.getAttribute('ry'));
        var h = Math.pow((rx-ry), 2) / Math.pow((rx+ry), 2);
        return (Math.PI * ( rx + ry )) * (1 + ( (3 * h) / ( 10 + Math.sqrt( 4 - (3 * h) )) ));
    },

    getPathLength : function (node:any) {
        var n = node;
        return n.getTotalLength();
    }
}