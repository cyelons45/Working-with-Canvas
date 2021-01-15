let canvas = document.querySelector("canvas")
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

// let radius = 2;
let maxRadius = 40;
let mouseToCircleDistance = 50;

let colorArray = [
    "#1E69A6", "#375873", "#103859","#ee0c0c","#507FA6"," #2C99F2","#f8f410"]

var c = canvas.getContext("2d");
let mouse = {
    x: undefined,
    y:undefined
}

const Circle = function (x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius=radius
    this.touched = false;
    this.color=colorArray[Math.floor(Math.random()*colorArray.length)]

}

Circle.prototype.draw=function(){
    c.beginPath()
    c.arc(this.x,this.y, this.radius, 0, 2 * Math.PI, false)
    c.strokeStyle="blue"
    c.fillStyle=this.color
    c.fill()
    return this
}

Circle.prototype.distance = function () {
    return Math.sqrt((this.x - mouse.x)**2+(this.y - mouse.y)**2)
}
    
Circle.prototype.update = function () {
    if (this.x+this.radius >innerWidth ||this.x-this.radius<0) {
        this.dx=-this.dx
    }
    if (this.y+this.radius >innerHeight ||this.y-this.radius<0) {
        this.dy=-this.dy
    }
    this.x += this.dx
    this.y += this.dy;

    // interactivity
    // console.log(this.distance())
    if (this.distance()<mouseToCircleDistance) {
        if (this.radius < maxRadius) {
            this.radius += 1;
        }
        this.touched=true
    }
    else if (this.touched && this.radius > this.minRadius) {
        this.radius-=1
    }
    // console.log("helloo")
    this.draw()

}

let circleArray=[]
function init () {
    circleArray=[]
    for (let i = 0; i < 1000; i++){
        let radius = Math.random()*3+1
        let y = Math.random() * (innerHeight -radius*2)+radius
        let x = Math.random() * (innerWidth-radius*2)+radius
        let dx = (Math.random() - 0.5)*5;
        let dy = (Math.random() - 0.5) * 5;
        
        circleArray.push(new Circle(x, y, dx, dy,radius))
        
        }  
}
init ()
// console.log(circleArray)

function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let circ = 0; circ < circleArray.length; circ++){
        circleArray[circ].update()
    }
}
animate()

window.addEventListener("mousemove", function (event) {
    mouse = {
        x: event.x,
        y:event.y
    }
})


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - 5;
    canvas.height = window.innerHeight - 5; 
    init()
})



// // Draw a circle


// for (let i = 0; i < 2; i++){
//     let col = ['red', 'blue', 'green', 'yellow', 'black', 'purple']
//     let selectedColor=col[Math.round(Math.random()*6)]
//     let x = Math.random() * window.innerWidth
//     let y=Math.random()* window.innerHeight
//     c.beginPath()
//     c.arc(x,y, 30, 0, 2 * Math.PI, false)
//     c.strokeStyle=selectedColor
//     c.stroke()  
// }