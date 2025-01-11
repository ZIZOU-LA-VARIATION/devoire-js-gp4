let posX = new Array(20)
console.log(posX)
let posY = new Array(20)

function initXY(x, y) {
    for (i = 0; i < 20; i++) {
        posX[i] = x + (i * 40)
        posY[i] = y + (i * 30)
    }
}
initXY(0,0)
console.log(posX)
console.log(posY)