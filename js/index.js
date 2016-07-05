var oOuter = document.getElementById("outer");
var oInner = document.getElementById("inner");
var oLis = oInner.getElementsByTagName("li");
var oBtn = document.getElementById("btn");
var oLi = oBtn.getElementsByTagName("li");
//    1.自动轮播
var first = oLis[0].cloneNode(true);
var interval = 2000;
var timer = null;
var step = 0;
oInner.appendChild(first);
oInner.style.width = oInner.offsetWidth + oLis[0].offsetWidth + "px";
function autoLeft() {
    step++;
    if (step > 10) {
        oInner.style.left = 0;
        step = 1;
    }
    animate(oInner, {"left": -1349 * step}, 500)
    if (step == 10) {
        bannerTip(0);
    } else {
        bannerTip(step);
    }
}
timer = window.setInterval(autoLeft, interval)
function autoRight() {
    step--;
    if (step < 0) {
        oInner.style.left = "-13490px";
        step = 9;
    }
    animate(oInner, {"left": -1349 * step}, 600)
    if (step == -1) {
        bannerTip(3);
    } else {
        bannerTip(step)
    }
}

//    2.焦点添加className
function bannerTip(n) {
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].className = "";
    }
    oLi[n].className = "bg";
}
//    3.点击焦点同步轮播
for (var i = 0; i < oLi.length; i++) {
    oLi[i].index = i;
    oLi[i].onmouseover = function () {
        clearInterval(timer)
        bannerTip(this.index);
        animate(oInner, {"left": -1349 * this.index}, 600)
        step = this.index
        timer = window.setInterval(autoLeft, interval)

    }
}
