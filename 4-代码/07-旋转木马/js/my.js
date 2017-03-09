/**
 * Created by HUCC on 2016/8/20.
 */
var datas = [
    {
        "width": 400,
        "top": 20,
        "left": 50,
        "opacity": 0.2,
        "zIndex": 2
    },//0
    {
        "width": 600,
        "top": 70,
        "left": 0,
        "opacity": 0.8,
        "zIndex": 3
    },//1
    {
        "width": 800,
        "top": 100,
        "left": 200,
        "opacity": 1,
        "zIndex": 4
    },//2
    {
        width: 600,
        top: 70,
        left: 600,
        opacity: 0.8,
        zIndex: 3
    },//3
    {
        "width": 400,
        "top": 20,
        "left": 750,
        "opacity": 0.2,
        "zIndex": 2
    }//4
];//其实就是一个配置单 规定了每张图片的大小位置层级透明度

window.onload = function () {
    // 1. 找对象
    var wrap = document.getElementById("wrap");
    var slide = wrap.children[0];
    var ul = slide.children[0];
    var lis = ul.children;

    var arr = document.getElementById("arr");
    var leftArr = document.getElementById("left");
    var rightArr = document.getElementById("right");

    var flag = true;//节流阀：默认打开

// 2. 动画显示隐藏箭头
    wrap.onmouseover = function () {
        animate(arr, {"opacity": 1})
    }
    wrap.onmouseout = function () {
        animate(arr, {"opacity": 0})
    }

// 3. 页面加载，各就各位
    function assign() {
        for (var i = 0; i < datas.length; i++) {
            //给每一个li加上相应的样式
            animate(lis[i], datas[i], function () {
                flag = true;//执行完了，把节流阀给打开
            });
        }
    }
    assign();


// 4. 点击右箭头，修改配置单就行了，第一个跑到最后一个了
    rightArr.onclick = function () {
        if(flag){
            flag = false;//把节流阀给关了，不让别人执行
            datas.push(datas.shift());
            assign();
        }

    }

// 5. 点击左箭头
    leftArr.onclick = function () {
        if(flag){
            flag = false;//那节流阀给关了
            datas.unshift(datas.pop());
            assign();
        }

    }
}
