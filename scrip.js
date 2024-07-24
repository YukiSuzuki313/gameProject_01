//グローバル系
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2

let rightPressed = false;
let leftPressed = false;

const keyDownHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
        
}

const keyUpHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }    
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



//ボール
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ccc";
    ctx.fill();
    ctx.closePath();
}

//パドル
const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    
}

//実際の描画をする関数
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    //ボールの反射
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    x += dx;
    y += dy;

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

//読み込み頻度
setInterval(draw,16);

