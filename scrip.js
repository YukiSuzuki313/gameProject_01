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

const brockRowCount = 6;
const brockColumnCount = 5;
const brockHeight = 20;
const brockWidth = 75;
const brockPadding = 10;
const brockOffsetTop = 30;
const brockOffsetLeft = 30;

let brocks = [];

for(let i = 0; i < brockColumnCount; i++) {
    brocks[i] = [];
    for(let j = 0; j < brockRowCount; j++){
        brocks[i][j] = {x: 0, y: 0, status: 1};;

        brocks[i][j].x = 0;
        brocks[i][j].y = 0;
    };
}

const collisionDetection = () => {
    for(let i = 0; i < brockColumnCount; i++) {
        brocks[i] = [];
        for(let j = 0; j < brockRowCount; j++){
            let b = brocks[i][j];

            if(b.status == 1) {
                if(x > b.x && x < b.x + brockWidth && y > b.y && y < b.y + brockHeight) {
                    dy = -dy;
                    b.status = 0;
            }

            }
        }
    }
}


const drawBrock = () => {
    for(let i = 0; i < brockColumnCount; i++) {
        for(let j = 0; j < brockRowCount; j++){
            
            if(brocks[i][j].status == 1) {

                brocks[i][j].x = 0;
                brocks[i][j].y = 0;
            
                let brocksX = (i * (brockWidth + brockPadding)) + brockOffsetLeft;
                let brocksY = (j * (brockHeight + brockPadding)) + brockOffsetTop;

                ctx.beginPath();
                ctx.rect(brocksX, brocksY, brockWidth, brockHeight);
                ctx.fillStyle = "White";
                ctx.fill();
                ctx.closePath();
                };
        }
    };
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
    drawBrock();
    collisionDetection();

    //ボールの反射
    if(y + dy < ballRadius) {
        dy = -dy;
    }else if(y + dy > canvas.height - ballRadius ) {
        alert("Game Over");
        document.location.reload();
        clearInterval(interval);
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

const interval = setInterval(draw, 10);

//読み込み頻度
setInterval(draw,16);

