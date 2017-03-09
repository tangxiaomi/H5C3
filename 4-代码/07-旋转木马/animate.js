/**
 * Created by HUCC on 2016/8/22.
 */
function animate(obj, json, fn) {
    if (obj.timer) {
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function () {

        var flag = true;
        for (var k in json) {
            if (k == "opacity") {
                //对透明度做特殊处理，透明度是一个小数，扩大1000倍来进行计算
                var target = json[k];
                var leader = getStyle(obj, k);

                //让leader和target1000倍进行运算
                leader = leader * 1000;
                target = target * 1000;

                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;

                //设置的时候，一定要除以1000
                obj.style[k] = leader / 1000;

                if (leader != target) {
                    flag = false;
                }
            } else if (k == "zIndex") {
                //如果是zIndex的时候，直接设置就行了
                obj.style[k] = json[k];
            } else {
                //属性名： attr  k
                //属性值： target：  json[k]
                var leader = getStyle(obj, k);//获取到的值带了单位
                leader = parseInt(leader);
                var step = (json[k] - leader) / 10;
                //如果step是负数的话，不能向上取整，应该向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
                console.log("代码还执行吗");

                if (leader != json[k]) {
                    flag = false;
                }
            }


        }

        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
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