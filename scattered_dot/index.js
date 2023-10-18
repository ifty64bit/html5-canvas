console.log("Script Loaded");
let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Color Map
const colors = new Map([
    ["c1", "#EF9A53"],
    ["c2", "#FF4B5C"],
    ["c3", "#3D2C8D"],
    ["c4", "#3A5BA0"],
    ["c5", "#E02401"],
]);

//Copy Mouse Position
let mouse = {
    x: 0,
    y: 0,
};

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

class Circle {
    constructor(radius) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() - 0.5) * 7;
        this.dy = (Math.random() - 0.5) * 5;
        this.radius = radius;
        this.color = colors.get("c" + Math.floor(Math.random() * 5));
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = this.color;
        ctx.closePath();
    }

    update() {
        //Handle Collision with boundaries for x axis
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
            this.dx = -this.dx;

        //Handle Collision with boundaries for y axis
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
            this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        //Check if mouse intercects with circle
        if (
            mouse.x - this.x <= 50 &&
            mouse.x - this.x >= -50 &&
            mouse.y - this.y <= 50 &&
            mouse.y - this.y >= -50 &&
            this.radius < 50
        ) {
            this.radius += 1;
        } else if (this.radius > 2) {
            this.radius -= 1;
        }
        this.draw();
    }
}

class CircleManager {
    constructor(numberOfCircles) {
        this.numberOfCircles = numberOfCircles;
        this.circles = [];
        for (let i = 0; i < this.numberOfCircles; i++) {
            let radius = Math.random() * 30;
            this.circles.push(new Circle(radius));
        }
    }

    addCircle(radius) {
        this.circles.push(new Circle(radius));
    }

    update() {
        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].update();
        }
    }
}

let cm = new CircleManager(500);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cm.update();
}

animate();
