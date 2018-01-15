initCanvasSize(xxx)

context = xxx.getContext('2d')

listenToMouse(xxx)
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
/*画线*/
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = 4
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
/*监听用户鼠标事件*/
function listenToMouse(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
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
/*****是否启用橡皮*****/
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}