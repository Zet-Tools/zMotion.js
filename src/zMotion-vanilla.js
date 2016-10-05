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

    }

    window.zMotion = zMotion;
})(this)
