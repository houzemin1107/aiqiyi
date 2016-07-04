/*一、鼠标滑过A标签效果*/
var oA = document.getElementsByTagName("a");
for (var i = 0; i < oA.length; i++) {
    oA[i].onmouseover = function () {
        var reg = /g/; //如果是图片就能匹配到g
        var reg1 = /<.+>/g;
        var inner = this.innerHTML.replace(reg1, "");
        if (!reg.test(this.innerHTML)) {
            this.setAttribute("title", inner)
        }
        ;
    }
}
;

//轮播图
function move(ele, obj, duration, callBack) {
    clearInterval(ele.timer)
    var time = 0;
    var interval = 15;
    var oBegin = {}, oChange = {};
    for (var attr in obj) {
        var begin = utils.getCss(ele, attr);
        var target = obj[attr];
        var change = target - begin;
        oBegin[attr] = begin;
        oChange[attr] = change;
    }
    function step() {
        time += interval;
        if (time < duration) {
            for (var attr in oChange) {
                var begin = oBegin[attr]
                var change = oChange[attr]
                var val = time / duration * change + begin
                utils.setCss(ele, attr, val);

            }
        } else {
            for (var attr in obj) {
                utils.setCss(ele, attr, obj[attr]);
            }
            clearInterval(ele.timer);
            callBack && callBack();
        }
    }

    ele.timer = window.setInterval(step, interval);
}
(function () {


    var outer = document.getElementById('outer');
    var innerl = document.getElementById('innerul');
    var olis = outer.getElementsByTagName("a");
    var oImg1 = innerl.getElementsByTagName("li")[0];
    var first = oImg1.cloneNode(true);
    innerl.appendChild(first);
    innerl.style.width = innerl.offsetWidth + oImg1.offsetWidth + "px";

    for (var i = 0; i < olis.length; i++) {
        olis[i].zhu = i;
        olis[i].onmouseenter = function (ev) {
            ev = ev || window.event;
            ev.cancelBubble || ev.stopPropagation()
            clearInterval(outer.time1);
            var index = this.zhu;
            move(innerl, {left: -index * 1349}, 600);
            step = index;
            force(index);

        }
    }
    function force(index) {
        for (var i = 0; i < olis.length; i++) {
            utils.removeClass(olis[i], "select")
        }
        utils.addClass(olis[index], "select")
    }

    var step = 0;

    function toLeft() {
        step++;
        if (step == 11) {
            innerl.style.left = 0;
            step = 1
        }
        move(innerl, {left: -step * 1349}, 600);
        //console.log(index)
        if (step == 10) {
            force(0)
        } else {
            force(step);
        }
    }

    outer.time1 = window.setInterval(toLeft, 2000);
    outer.onmouseenter = function () {
        clearInterval(outer.time1);
    }
    outer.onmouseleave = function (ev) {
        ev = ev || window.event;
        ev.cancelBubble || ev.stopPropagation()
        outer.time1 = window.setInterval(toLeft, 2000);
    }
})();

/*小轮播图渐隐渐现版*/
var bannerTh = function (id) {
    var photoTh = document.getElementById(id);
    var ulTh = photoTh.getElementsByTagName('ul')[0];
    var liTh = ulTh.getElementsByTagName('li');
    var btnLiftTh = photoTh.getElementsByClassName("photo-btn-left")[0];
    var btnRightTh = photoTh.getElementsByClassName("photo-btn-right")[0];
    var tap = 0;
    photoTh.timer = setInterval(auto, 3000);
    function auto() {
        tap++;
        if (tap > 1) {
            tap = 0;
        }
        MoveTh()
    }

    function MoveTh() {
        for (var i = 0; i < liTh.length; i++) {
            if (i == tap) {
                liTh[i].style.zIndex = 1;
                move(liTh[i], {opacity: 1}, 600)
            } else {
                liTh[i].style.zIndex = 0;
                liTh[i].style.opacity = 0;
            }
        }
    }

    photoTh.onmouseover = function () {
        clearInterval(photoTh.timer);
    }
    photoTh.onmouseout = function () {
        photoTh.timer = setInterval(auto, 3000);
    };
    btnLiftTh.onclick = function () {
        tap--;
        if (tap < 0) {
            tap = 1;
        }
        MoveTh()

    };
    btnRightTh.onclick = auto;
};
bannerTh('photoTh');
bannerTh('photo2')

/*广告区*/
var adv = function (id) {
    var $box = $(id);
    $box.find('.container-8-con-mid-inner1').on("mouseenter", function (e) {

        $box.i = $(this).parent().index();
        $(this).parent().children('.container-8-con-mid-inner1').next().css("display", "block").stop().animate({
            width: 740,
            opacity: 1
        }, 300).parent().siblings().children('.container-8-con-mid-inner2').stop().animate({
            width: 0,
            opacity: 0
        }, 300, function () {
            $(this).css("display", "none");
        });
        if ($box.i == 5) {
            $(this).parent().css("marginLeft", 40).stop().animate({left: -140 * 5}, 300);
            $box.find('li').each(function (index, item) {
                if (index < 5) {
                    $(this).css("marginLeft", 0).stop().css("zIndex", $(this).index()).animate({left: -170 * ($(this).index())}, 300)
                }
            })
        } else {
            $box.find('li').each(function (index, item) {
                if (index <= $box.i) {
                    $(this).css("marginLeft", 0);
                    $(this).stop().animate({left: -170 * $(this).index()}, 300)
                } else {
                    $(this).stop().css("zIndex", -$(this).index()).animate({left: -170 * ($(this).index() - 1)}, 300)
                }

            })
        }
    });
    $box.on("mouseleave", function (e) {
        e.stopPropagation();
        var a = $box.find('li').eq($box.i);
        a.children('.container-8-con-mid-inner1').next().stop().animate({width: 0, opacity: 0}, function () {
            $(this).css("display", "none")
        });
        $box.find('li').each(function (index, item) {
            if ($(this).index() == 0) {
                $(this).css("marginLeft", 0).stop().animate({left: 0, zIndex: 1});
            } else {
                $(this).css("marginLeft", 20).stop().animate({left: 0, zIndex: 1});
            }

        });
        $(this).css("zIndex", 1)
    })
};
adv('#adviertisement');
adv('#adviertisement2');
adv('#adviertisement3');
adv('#adviertisement4');
adv('#adviertisement5');
adv('#adviertisement6');
/*第一个广告区左右切换*/
var advOutF = document.getElementById('advOut0');
var advUlF = advOutF.getElementsByTagName("ul");
var adviertisementLF = document.getElementById('adviertisementLF');
var adviertisementRF = document.getElementById('adviertisementRF');
var advFlagF = 0;
adviertisementLF.onclick = function () {

    advFlagF--;
    if (advFlagF < 0) {
        advFlagF = 2
    }
    for (var i = 0; i < advUlF.length; i++) {
        advUlF[i].style.display = "none"
        if (advFlagF == i) {
            advUlF[i].style.display = "block"
        }
    }
}
adviertisementRF.onclick = function () {
    advFlagF++;
    if (advFlagF > 2) {
        advFlagF = 0
    }
    for (var i = 0; i < advUlF.length; i++) {
        advUlF[i].style.display = "none";
        if (advFlagF == i) {
            advUlF[i].style.display = "block"
        }
    }
}


/*第二个广告区左右切换*/
var advOut = document.getElementById('advOut');
var advUl = advOut.getElementsByTagName("ul");
var adviertisementL = document.getElementById('adviertisementL');
var adviertisementR = document.getElementById('adviertisementR');
var advFlag = 0;
adviertisementL.onclick = function () {

    advFlag--;
    if (advFlag < 0) {
        advFlag = 2
    }
    for (var i = 0; i < advUl.length; i++) {
        advUl[i].style.display = "none"
        if (advFlag == i) {
            advUl[i].style.display = "block"
        }
    }
}
adviertisementR.onclick = function () {
    advFlag++;
    if (advFlag > 2) {
        advFlag = 0
    }
    for (var i = 0; i < advUl.length; i++) {
        advUl[i].style.display = "none";
        if (advFlag == i) {
            advUl[i].style.display = "block"
        }
    }
}

/*var $box = $('#adviertisement2');
 $box.find('.container-8-con-mid-inner1').on("mouseenter", function (e) {

 $box.i = $(this).parent().index();
 $(this).parent().children('.container-8-con-mid-inner1').next().css("display", "block").stop().animate({
 width: 740,
 opacity: 1
 },300).parent().siblings().children('.container-8-con-mid-inner2').stop().animate({
 width: 0,
 opacity: 0
 },300, function () {
 $(this).css("display", "none");
 });
 if ($box.i == 5) {
 $(this).parent().css("marginLeft", 40).stop().animate({left: -140 * 5},300);
 $box.find('li').each(function (index, item) {
 if (index < 5) {
 $(this).css("marginLeft", 0).stop().css("zIndex", $(this).index()).animate({left: -170 * ($(this).index())},300)
 }
 })
 } else {
 $box.find('li').each(function (index, item) {
 if (index <= $box.i) {
 $(this).css("marginLeft", 0);
 $(this).stop().animate({left: -170 * $(this).index()},300)
 } else {
 $(this).stop().css("zIndex", -$(this).index()).animate({left: -170 * ($(this).index() - 1)},300)
 }

 })
 }
 });
 $box.on("mouseleave", function (e) {
 e.stopPropagation();
 var a=$box.find('li').eq($box.i);
 a.children('.container-8-con-mid-inner1').next().stop().animate({width: 0, opacity: 0}, function () {
 $(this).css("display", "none")
 });
 $box.find('li').each(function (index, item) {
 if ($(this).index() == 0) {
 $(this).css("marginLeft", 0).stop().animate({left: 0, zIndex: 1});
 } else {
 $(this).css("marginLeft", 20).stop().animate({left: 0, zIndex: 1});
 }

 });
 $(this).css("zIndex", 1)
 })*/

/*原创区左侧鼠标滑过效果*/

var conEt = document.getElementsByClassName('container-18-left-con-mid1-con');
var conEtc = document.getElementsByClassName('container-18-left-con-mid1-con3');
var conEta = document.getElementsByClassName('container-18-left-con-mid1-con2')
for (var i = 0; i < conEt.length; i++) {
    var cur = conEt[i];
    cur.index = i;
    cur.onmouseover = function () {
        conEtc[this.index].style.display = "block"
        conEta[this.index].style.width = '114px'
    };
    cur.onmouseout = function () {
        conEtc[this.index].style.display = "none";
        conEta[this.index].style.width = '170px'
    }
}


/*导航区*/
/*搜索框*/
function hasChild(ele, con) {
    var par = ele.parentNode;
    if (ele.className == con.className) {
        return true
    }
    while (par) {
        par = par.parentNode;
        if (par == con) {
            return true;
        }
    }
    return false;
}

var chick = document.getElementById('chick-con');
var inp = document.getElementById('inp');
var btn = document.getElementById('btn')
inp.onfocus = function () {
    var strValue = this.value;
    this.value = "";
    chick.style.display = "block";
    var that = this;
    document.body.onclick = function (ev) {
        var ev = ev || window.event;
        ev.target = ev.target || ev.srcElement;
        if (hasChild(ev.target, chick)) {
            var reg1 = /<.+>/g;
            var inner = ev.target.innerHTML.replace(reg1, "");
            that.value = inner;
            chick.style.display = "none";
        }
        if (!hasChild(ev.target, chick) && ev.target !== that && ev.target !== btn) {
            chick.style.display = "none";
            that.value = strValue;
        }

    }
    btn.onclick = function () {
        if (!that.value) {
            that.value = strValue;
            chick.style.display = "none";
        }
    }
};


var chickIn = document.getElementById("chick-con-in");
function baiduSuggestion(word, callback) {
    jsonp('http://suggestion.baidu.com/su',
        {wd: word}, 'cb', function (data) {
            callback(data);
        });
}
chick.onclick = function (e) {
    e || (e = window.event);
    var target = e.target || e.srcElement;
    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(target.innerHTML), '_blank');
};
var val = inp.value;
btn.addEventListener("click", function () {
    console.log(val)
    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(val), '_blank');
});
inp.onkeyup = function () {
    val = inp.value;
    console.log(val)
    if (val) {
        baiduSuggestion(val, function (data) {
            var list = data.s;
            if (list.length < 10) {
                return
            }
            var fragement = document.createDocumentFragment();
            var str = ""
            for (var i = 0; i <= 10; i++) {
                str += "<li><a href='javascript:;'>" + list[i] + "</a></li>"
            }
            chickIn.innerHTML = str;
        })
    }
}


/*登录框多种登录方式*/

var navIn1 = document.getElementById('navCon2-inner5-1');
var navIn2 = document.getElementById('navCon2-inner5-2');
navIn1.onclick = function (ev) {

    var ev = ev || window.event;
    ev.stopPropagation();
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (strTarget.nodeName == "SPAN" || strTarget.nodeName == "I") {
        navIn1.style.display = "none";
        navIn2.style.display = "block";
    }
};
navIn2.onclick = function (ev) {
    var ev = ev || window.event;
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (strTarget.nodeName == "I") {
        this.style.display = "none";
        navIn1.style.display = "block";
    }
};

/*登录框关闭*/
var navCon = document.getElementById('navCon');
var close = document.getElementById('close');
var close2 = document.getElementById('close2');
var navCon2 = document.getElementById('navCon2')
close.onclick = function () {
    var a = confirm("确认不登录吗");
    if (a) {
        navCon.style.display = "none";
        fil.style.display = "none"
    }

};
close2.onclick = function () {
    navCon2.style.display = "none";
    fil.style.display = "none"
    isTel.style.display = "none";
    phone.value = "";
    passWord.value = ""
    strong.style.display = "none";
    strongFir.style.display = "none";
    strongTw.style.display = "none";
    strongTh.style.display = "none";
};

/*登录框显示*/
var navUser = document.getElementById('nav-user');
var fil = document.getElementById('fil');
var tak = document.getElementById('nav-user-tak')
var tak2 = document.getElementById('nav-user-tak2')
var tak3 = document.getElementById('nav-user-tak3')
var reg = /上传|消息|播放记录/;
var tAry = [tak, tak2, tak3];
navUser.onclick = function (ev) {
    ev = ev || window.event;
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (strTarget.nodeName == "A" && (strTarget.innerHTML == ("登录"))) {
        navCon.style.display = "block";
        navCon2.style.display = "none";
        fil.style.display = "block"
        for (var i = 0; i < tAry.length; i++) {
            tAry[i].style.display = "none"
        }
    }
    ;

    /*注册框显示*/
    if (strTarget.nodeName == "A" && (strTarget.innerHTML == ("注册"))) {
        navCon2.style.display = "block";
        navCon.style.display = "none";
        fil.style.display = "block"
        fil.style.position = "fixed"
        for (var i = 0; i < tAry.length; i++) {
            tAry[i].style.display = "none"
        }
    }

    /*消息上传 播放 提示*/

    var em = navUser.getElementsByTagName("em");
    if (strTarget.nodeName == "A" && reg.test(strTarget.innerHTML)) {
        for (var i = 0; i < tAry.length; i++) {
            if (tAry[i].parentNode == strTarget.parentNode) {
                if (tAry[i].style.display == "block") {
                    for (var i = 0; i < tAry.length; i++) {
                        tAry[i].style.display = "none";
                        em[i].style.borderTopColor = "white";
                        em[i].style.borderBottomColor = "transparent";
                        em[i].style.verticalAlign = 'bottom';
                    }
                } else {
                    for (var k = 0; k < tAry.length; k++) {
                        tAry[k].style.display = "none";
                        em[k].style.borderTopColor = "white";
                        em[k].style.borderBottomColor = "transparent";
                        em[k].style.verticalAlign = 'bottom';
                    }
                    tAry[i].style.display = "block";
                    em[i].style.borderBottomColor = "white";
                    em[i].style.borderTopColor = "transparent";
                    em[i].style.verticalAlign = 'top';
                }
            }
        }
    }
    if (hasChild(strTarget, tak)) {
        tak.style.display = "none";
    }

    /*鼠标离开导航栏 详情消失*/
    for (var i = 0; i < tAry.length; i++) {
        navUser.onmouseleave = tAry[i].onmouseleave = function () {
            navUser.timer = setTimeout(function () {
                for (var i = 0; i < tAry.length; i++) {
                    if (tAry[i].style.display == "block") {
                        tAry[i].style.display = "none"
                        em[i].style.borderTopColor = "white";
                        em[i].style.borderBottomColor = "transparent";
                        em[i].style.verticalAlign = 'bottom';
                    }
                }
            }, 1000)
        }
        navUser.onmouseenter = tAry[i].onmouseenter = function () {
            clearTimeout(navUser.timer)
        }
    }
};


/*注册框多种注册方式*/
var navIn9 = document.getElementById('navCon2-inner9');
var navIn10 = document.getElementById('navCon2-inner10');
navIn9.onclick = function (ev) {

    var ev = ev || window.event;
    ev.stopPropagation();
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (ev.target.nodeName == "SPAN" || ev.target.nodeName == "I") {
        navIn9.style.display = "none";
        navIn10.style.display = "block";
    }
};
navIn10.onclick = function (ev) {
    var ev = ev || window.event;
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (strTarget.nodeName == "I") {
        this.style.display = "none";
        navIn9.style.display = "block";
    }
};

/*下拉页面显示 导航栏*/
(function () {
    var nav = document.getElementById('nav');
    var nav1 = nav.cloneNode(true);
    var phoneBanner = document.getElementById('outer');
    var navCon = document.getElementById('navCon');
    var navCon2 = document.getElementById('navCon2');
    var skin = document.getElementById('skin')
    var photoNav = document.getElementById('photo-nav')

    window.onscroll = function () {
        var A = nav.offsetHeight + phoneBanner.offsetHeight + photoNav.offsetHeight;
        if (document.body.scrollTop >= A) {
            /*skin.insertBefore(nav1,photo);*/

            nav.style.position = "fixed";
            fil.style.position = "fixed"
            nav.style.top = 0;
            nav.style.zIndex = 10;
            move(nav, {opacity: 1}, 1000);
            navCon.style.top = document.body.scrollTop + 30 + "px";
            navCon2.style.top = document.body.scrollTop + 30 + "px";
        } else {
            nav.style.position = "relative";
            nav.style.top = 0;
            nav.style.opacity = 0;
            if (document.body.scrollTop <= nav.offsetHeight) {
                nav.style.opacity = 1;
            }

            navCon.style.top = document.body.scrollTop + 30 + "px";
            navCon2.style.top = document.body.scrollTop + 30 + "px";
        }
    }
})();


/*今日焦点星星处*/
var starTitle = document.getElementById('starTitle')
var star = document.getElementById('star');
var oI = starTitle.getElementsByTagName('i')[0];
starTitle.onmouseover = star.onmouseover = function () {
    clearTimeout(starTitle.timer);
    starTitle.parentNode.style.background = "#8ac024";
    star.style.color = "white";
    star.style.display = "block"
    oI.style.backgroundPosition = "-200px -1158px"
};
starTitle.onmouseout = star.onmouseout = function () {
    starTitle.timer = setTimeout(function () {
        star.style.display = "none";
        oI.style.backgroundPosition = "-120px -400px";
        starTitle.parentNode.style.background = "";
        starTitle.parentNode.style.color = "black"
    }, 200)
};
/*电影 电视区的不二情书*/
var changeBg = function (id) {
    var containerNin = document.getElementById(id);
    var emNin = containerNin.getElementsByTagName('em');
    for (var i = 0; i < emNin.length; i++) {
        if (i > 2) {
            emNin[i].style.background = "#ccc"
        }
    }
}
changeBg('containerNin');
changeBg('containerNinTv');


/*消息 选项卡*/

var selectTap = document.getElementById("selectTap");
var selectUl = selectTap.getElementsByTagName("ul")[0]
var selectA = selectUl.getElementsByTagName("a");
var selectIn = document.getElementById('selectIn');
var selectDiv = selectIn.getElementsByTagName("div");
for (var i = 0; i < selectA.length; i++) {
    selectA[i].index = i;

    selectA[i].onmouseover = function () {
        for (var i = 0; i < selectA.length; i++) {
            selectA[i].className = "";
            selectDiv[i].className = "";
        }
        this.className = "nav-user-tak2-con2-2";
        selectDiv[this.index].className = "nav-user-tak2-con2-1";
    };
}


/*登录框表单验证*/




/*注册框表单验证*/
var isTel = document.getElementById('navCon2-inner0');
var phone = document.getElementById('phone');
var passWord = document.getElementById('passWord');
phone.onblur = function () {
    var val = phone.value
    val = val.replace(/(^\s*)|(\s*$)/g, "");
    if (val) {
        var reg = /^1(3|5|8)\d{9}$/gi;
        if (!reg.test(val)) {
            isTel.innerHTML = "手机格式不正确";
            isTel.style.display = "block";
        }
    }
};
passWord.onblur = function () {
    var val = passWord.value;
    val = val.replace(/(^\s*)|(\s*$)/g, "");
    if (val) {
        console.log(1)
        var reg = /^\w{8,20}$/g;
        if (!reg.test(val)) {
            isTel.innerHTML = "8~20位字母、数字或字符，至少包括两种";
            isTel.style.display = "block";
        }else{
            isTel.innerHTML = "";
            isTel.style.display = "none";
        }
    }
};
var strong = document.getElementById('strong')
var strongFir = document.getElementById('strong1')
var strongTw = document.getElementById('strong2')
var strongTh = document.getElementById('strong3')
passWord.onkeyup = function () {
    if (passWord.value.length <= 0) {
        strong.style.display = "none";
        strongFir.style.display = "none";
        strongTw.style.display = "none";
        strongTh.style.display = "none";
    }
    if (passWord.value.length > 0) {
        strong.style.display = "block";
    }
    if (passWord.value.length <= 5) {
        strongFir.style.display = "inline-block";
    }
    if (passWord.value.length > 5) {
        strongTw.style.display = "inline-block";

    } else {
        strongTw.style.display = "none";
    }
    if (passWord.value.length >= 10) {
        strongTh.style.display = "inline-block";
    } else {
        strongTh.style.display = "none";
    }
}



















