/**
 * Created by HUCC on 2016/8/20.
 */
function animate(element, json, fn) {
    clearInterval(element.timer);
    element.timer = setInterval(function () {


        var flag = true;
        for(var k in json) {

            //如果传递的属性是透明度，那么透明度需要额外处理
            if(k == "opacity"){
                var attr = k;
                //让目标和当前值都扩大100倍
                var target = json[k] * 100;

                var leader = getStyle(element, attr);
                leader = leader * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;

                //最后设置的时候，要除以100
                element.style[attr] = leader/100;


                if (leader != target) {
                    flag = false;
                }
            }else if(k == "zIndex"){
                element.style.zIndex = json[k];
            } else{
                var attr = k;
                var target = json[k];

                var leader = getStyle(element, attr);
                leader = parseInt(leader) || 0;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                element.style[attr] = leader + "px";


                if (leader != target) {
                    flag = false;
                }
            }
        }

        if(flag) {
            clearInterval(element.timer);
            if(fn){
                fn();
            }
        }
    }, 15);
}
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[style];
    }
}