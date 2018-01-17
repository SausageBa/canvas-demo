initCanvasSize(xxx)

context = xxx.getContext('2d')

listenToUser(xxx)
/***********/

/*初始换canvas画布*/
function initCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

/*监听用户鼠标事件*/
function listenToUser(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //可触屏的设备
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x, y , 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) {
                return;
            }
            if (eraserEnabled) {
                context.clearRect(x , y , 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function (aaa) {
            using = false
        }
    } else {
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) {
                return;
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}
/*****启用橡皮或者画笔*****/
var eraserEnabled = false
brush.onclick = function(){
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
    context.strokeStyle = 'black'
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active') 
    context.lineWidth = 1
    thin.classList.remove('active')    
    thick.classList.remove('active')        

}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active') 
}
/*画线*/
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
/****颜色选择***/
red.onclick = function(){
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    yellow.classList.remove('active')    
}
green.onclick = function(){
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    yellow.classList.remove('active')  
}
yellow.onclick = function(){
    context.strokeStyle = 'yellow'
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.add('active')  
}
/****调节粗细****/
thin.onclick = function(){
    context.lineWidth = 2
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function(){
    context.lineWidth = 5
    thick.classList.add('active')
    thin.classList.remove('active')    
}
/****清空画板***/
clear.onclick = function(){
    context.clearRect(0,0,xxx.width,xxx.height)
}
/***保存图片***/
save.onclick = function(){
    var url = xxx.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画儿'
    a.click()
}