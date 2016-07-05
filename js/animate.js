function linear(t,b,c,d){
    return t/d*c+b;
}
function animate(ele,obj,duration,callBack){
    var interval=15;
    var times=0;
    duration=duration||600;
    var oBegin={};
    var oChange={};
    var flag=0;
    for(var attr in obj){
        var begin=utils.getCss(ele,attr);
        var change=obj[attr]-begin;
        if(change){
            flag++;
            oBegin[attr]=begin;
            oChange[attr]=change;
        }
    }
    if(flag==0){
        return
    }
    clearInterval(ele.timer);
    ele.timer=setInterval(step,interval);
    function step(){
        times+=interval;
        if(times<duration){
            for(var attr in oBegin){
                var begin=oBegin[attr];
                var change=oChange[attr];
                var value=linear(times,begin,change,duration);
                utils.setCss(ele,attr,value);
            }
        }else{
            for (var attr in obj){
                utils.setCss(ele,attr,obj[attr]);
            }
            clearInterval(ele.timer);
            if(typeof callBack=="function"){
                callBack.call(ele);
            }
        }
    }
}
