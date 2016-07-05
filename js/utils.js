
var utils = (function () {
    var flag = "getComputedStyle" in window;

    function getCss(ele, attr) {
        var res = null;
        var reg = null;
        if (flag) {
            res = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr == "opacity") {
                res = ele.currentStyle["filter"];
                reg = /^alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)$/;
                res = reg.test(res) ? RegExp.$1 / 100 : 1;
            } else {
                res = ele.currentStyle[attr];
            }

        }
        reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(pt|px|em|rem)?$/
        return reg.test(res) ? parseFloat(res) : res;
    }

    function setCss(ele, attr, val) {
        if (attr == "float") {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
        }
        if (attr == "opacity") {
            ele.style.opacity = val;
            ele.style.filter = "alpha(opacity=" + val * 100 + ")";
        }
        var reg = /(width|height|top|right|bottom|left|((margin|padding)(Top|Right|Bottom|Left)?))/;
        if (reg.test(attr)) {
            if(!isNaN(val)){
                ele.style[attr] = val + "px";
            }
        } else {
            ele.style[attr] = val;
        }

    }

    return {
        getCss: getCss,
        setCss: setCss
    }
})()