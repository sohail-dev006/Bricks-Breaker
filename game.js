    let canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let interval = 0;

    interval = setInterval(draw, 10);



    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let ballRadius = 12;
    let dx = 2;
    let dy = -2;


function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2,);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

let paddleHeight = 12;
let paddleWidth = 78;
let paddleX = (canvas.width - paddleWidth)/2;


function drawPadle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight,paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}


function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    drawPadle();
    drawBricks();
    collisionDetection();

    if( x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx
        
    }if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
        //   alert("GAME OVER");
          document.location.reload();
          clearInterval(interval);
        }
      }

      if(rightPressed){
        paddleX += 2;
      }else if(leftPressed){
        paddleX -= 2;
      }
      if(rightPressed){
        paddleX = Math.min(paddleX + 2, canvas.width - paddleWidth);
      }else if(leftPressed){
        paddleX = Math.max(paddleX - 2, 0);
      }
    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;


function keyDownHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = true;
    }else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
      }
}
function keyUpHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = false;
    }else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

let brickColumnCount = 7;
let brickRowCount = 4;
let brickHeight = 16;
let brickWidth = 73;
let brickPadding = 10;
let brickOffsetLeft = 16;
let brickOffsetTop = 30;


const bricks = [];
for(let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1}
    }
}

function drawBricks(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickOffsetLeft) + brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "orange";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            const b = bricks[c][r];
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}



