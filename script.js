const startScreen = document.getElementById("start-screen");

const btn = document.getElementById("start-btn");
const gameOver = document.getElementById("game-over");

const pointsShow = document.getElementById("points");
const result = document.getElementById("result");

const pointsDuringGame = document.getElementById("points-during-game");


const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

const cubeWidth = 20;
const cubeHeight = 20;

//console.log(canvas.width)
//console.log(canvas.height)
let gameOverFlag = false;

let points = 0;





class Cube {


    constructor(x = 0, y = 0) {
        this.position = {
            x: x,
            y: y
        };

        this.size = {
            width: cubeWidth,
            height: cubeHeight
        };

        this.color = "orange";


    }


    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

    }


    collisionDetection() {
        


        if ((snake.position.x >= this.position.x && snake.position.x < this.position.x + cubeWidth)
     && (snake.position.y >= this.position.y && snake.position.y < this.position.y + cubeHeight)) {  


            gameOverFlag = true;
        }
    }


    update() {
        this.collisionDetection();
        this.draw();




    }




}

class Food extends Cube {

    constructor(x, y) {
        super(x, y);
        this.color = "yellow"
    }

    collisionDetection() {
        if ((snake.position.x >= this.position.x && snake.position.x <= this.position.x + cubeWidth) &&

            ((snake.position.y >= this.position.y && snake.position.y <= this.position.y + cubeHeight) ||

                (snake.position.y + cubeHeight >= this.position.y && snake.position.y + cubeHeight <= this.position.y + cubeHeight))) {

            // snake.body.push(this);
            snake.bodyLength++;
            //console.log(snake.body);
            snake.eat();
            points++;

            //randomize

            this.position.x = Math.floor(Math.random() * (canvas.width - cubeWidth)) + 1;
            this.position.y = Math.floor(Math.random() * (canvas.height - cubeHeight)) + 1;



        }
    }


    update() {
        this.draw();
        this.collisionDetection();


    }
}


class Head extends Cube {
    constructor(x, y) {
        super(x, y);
        this.color = "red";
    }


    update() {
        this.draw();


    }


}




class Snake {

    constructor() {
        this.position = {
            x: canvas.width / 2 - cubeWidth / 2,
            y: canvas.height / 2 - cubeHeight / 2
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.head = new Head(this.position.x, this.position.y)
        this.head.color = "red";

        this.bodyLength = 3;
        this.body = [];
        for (let i = 1; i <= this.bodyLength; i++) {
            this.body.push(new Cube(this.position.x, this.position.y + i * cubeHeight));
        }

        //console.log(this.position.x)
        //console.log(this.position.y)

    }

    eat() {
        if (this.bodyLength > this.body.length) {
            this.body.push(new Cube(this.body[this.body.length - 1].position.x, this.body[this.body.length - 1].position.y));
        }

    }


    reset() {
        this.position.x = canvas.width / 2 - cubeWidth / 2;
        this.position.y = canvas.height / 2 - cubeHeight / 2;
        this.body = [];
        this.bodyLength = 3;
        for (let i = 1; i <= this.bodyLength; i++) {
            this.body.push(new Cube(this.position.x, this.position.y + i * cubeHeight));
        }

    }

    draw() {



        for (let i = 0; i < this.body.length; i++) {
            this.body[i].update();
        }


        this.head.update();

    }


    collisionDetection() {
        //With the wall !!
        if (this.position.y < 0) {
            gameOverFlag = true;
           // console.log("gameOver")
        }

        if (this.position.y > canvas.height - cubeHeight) {
            gameOverFlag = true;
           // console.log("gameOver");
        }


        if (this.position.x < 0) {
            gameOverFlag = true;
            //console.log("gameOver");
        }


        if (this.position.x > canvas.width - cubeWidth) {
            gameOverFlag = true;
            //console.log("gameOver");
        }




    }



    update() {




        let prevpos = {
            x: this.position.x,
            y: this.position.y
        };


        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.head.position.x = this.position.x;
        this.head.position.y = this.position.y;





        for (let i = 0; i < this.body.length; i++) {

            let temp = {
                x: this.body[i].position.x,
                y: this.body[i].position.y
            };

            // console.log(temp)


            if (this.velocity.x !== 0 || this.velocity.y !== 0) {

                this.body[i].position.x = prevpos.x;
                this.body[i].position.y = prevpos.y;

                prevpos.x = temp.x;
                prevpos.y = temp.y;
            }




        }

        this.collisionDetection();

        this.draw();


    }

}

const snake = new Snake();
snake.update()
const cube = new Food(20, 20);
cube.update();






/* 
    What I need!
    I need cubes -- the things I will build up the snake from and it can eat. 

    the snake head should look different then the body. 

    Event listeres to control the snake 




*/


const start = () => {
    startScreen.style.display = "none";
    canvas.style.display = "block";
    result.style.display = "block";
    points = 0;
    

    animate()


}


const animate = () => {
    let myReq = requestAnimationFrame(animate);



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();

    cube.update();

     //cube.collisionDetection();

    pointsDuringGame.textContent  = points;

    if (gameOverFlag) {
        window.cancelAnimationFrame(myReq);
        gameOver.style.display = "block";
        pointsShow.textContent = points;
        canvas.style.display = "none";

        result.style.display = "none";


        setTimeout(() => {
            gameOver.style.display = "none";
            startScreen.style.display = "block";
        }, 2000)

        gameOverFlag = false;
        snake.reset();

    }
}


btn.addEventListener("click", start);



const keys = {
    upKey: {
        pressed: false
    },
    downKey: {
        pressed: false
    },
    leftKey: {
        pressed: false
    },
    rightKey: {
        pressed: false
    }
}


const moveSnake = (key, velocity, isPressed) => {

    switch (key) {
        case "ArrowUp":
           // console.log("Arrow Up key is pressed")
            keys.upKey.pressed = isPressed
            if (velocity === 0) {
                snake.velocity.y = velocity;
            }

            snake.velocity.y = -velocity
            break;
        case "ArrowDown":
            //console.log("Arrow Down key is pressed")
            keys.downKey.pressed = isPressed
            if (velocity === 0) {
                snake.velocity.y = velocity;
            }

            snake.velocity.y = velocity
            break;
        case "ArrowLeft":
           // console.log("Arrow Left key is pressed")
            keys.leftKey.pressed = isPressed
            if (velocity === 0) {
                snake.velocity.x = velocity;
            }

            snake.velocity.x = -velocity
            break;
        case "ArrowRight":
            //console.log("Arrow Rigth key is pressed")
            keys.rightKey.pressed = isPressed
            if (velocity === 0) {
                snake.velocity.x = velocity;
            }

            snake.velocity.x = velocity
            break;

    }


}






window.addEventListener("keydown", ({ key }) => {
    //console.log(key);
    
    moveSnake(key, 20, true)
})


window.addEventListener("keyup", ({ key }) => {
   // console.log(key)
    moveSnake(key, 0, false)
})