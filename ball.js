const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let interval = 0;

let x = canvas.width /2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballradius = 12;


function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y, ballradius, 0, Math.PI * 2,);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

let paddleWidth = 75;
let paddleHeight = 12;
let paddleX = (canvas.width - paddleWidth)/2;


function drawPadle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

    let rightPressed = false;
    let leftPressed = false;

    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);


    function keyDown(e){
        if(e.key === "Right" || e.key === "ArrowRight"){
            rightPressed = true;
        }else if (e.key === "Left" || e.key === "ArrowLeft"){
            leftPressed = true;
        }
    }

    function keyUp(e){
        if(e.key === "Right" || e.key === "ArrowRight"){
            rightPressed = false;
        }else if (e.key === "Left" || e.key === "ArrowLeft"){
            leftPressed = false;
        }
    }


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPadle();
    drawBricks();
    collisionDetection();
    drawScore();
    if(x + dx > canvas.width - ballradius || x + dx < ballradius){
        dx = -dx;
    }if( y + dy < ballradius){
        dy = -dy;
    }else if(y + dy > canvas.height - ballradius){
    if(x > paddleX && x < paddleX + paddleWidth ){
        dy = -dy;
    }else{

        // alert("Game is Over")
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

let brickColumnCount = 7;
let brickRowCount = 5;
let brickHeight = 17;
let brickPadding = 10;
let brickOffsetLeft = 10;
let brickWidth = 74;
let brickOffsetTop = 33;


let bricks = [];

for(let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1}
    }
}

function drawBricks(){
    for(let c = 0; c < brickColumnCount; c++){
        for(r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickOffsetLeft) + brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();

            } 
        }
    }
}


function collisionDetection(){
    for(let c = 0; c < brickColumnCount; c++){
        for(r = 0; r < brickRowCount; r++){
        const b = bricks[c][r];

        if(b.status === 1){
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                dy = -dy;
                b.status = 0;
                score++;
            }
            if(score === brickRowCount * brickColumnCount){
                alert("You are Winner");
                document.location.reload();
                clearInterval(interval);
            }
        }
        }
    }

}

let score = 0;
function drawScore(){
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 10 , 25);
}

interval = setInterval(draw, 10);



// let canvas = document.getElementById("myCanvas");
// let ctx = canvas.getContext("2d");
// let interval = 0;


// let x = canvas.width/2;
// let y = canvas.height - 30;

// let dx = 2;
// let dy = -2;
// let ballRadius = 12;

// function drawBall(){
//     ctx.beginPath();
//     ctx.arc(x,y,ballRadius,0,Math.PI * 2,);
//     ctx.fillStyle = "red";
//     ctx.fill();
//     ctx.closePath();
// }
// let paddleWidth = 75;
// let paddleHeight =12;
// let paddleX = (canvas.width - paddleWidth)/2;


// function drawPadle(){
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "blue";
//     ctx.fill();
//     ctx.closePath();
// }
// function draw(){
//     ctx.clearRect(0,0,canvas.width, canvas.height);
//     drawPadle();
//     drawBall();


//     if(x+dx > canvas.width || x < ballRadius){
//         dx = -dx;
//     } if(y + dy < ballRadius){
//         dy = -dy;
//     }else if(y + dy > canvas.height - ballRadius){
//         if(x > paddleX && x < paddleX - canvas.width){
//             dy = -dy;
//         }else{
//             document.location.reload();
//             clearInterval(interval);
//         }
//     }
//     x += dx
//     y += dy
// }

// interval = setInterval(draw, 10);
