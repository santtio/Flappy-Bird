const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");

const gameContainer = document.getElementById('container-jogo');


const flappyImg = new Image();
flappyImg.src = 'assets/flappy_dunk.png';

//Constantes do Jogo

const flapSpeed = -5;
const birdWidth = 40;
const birdHeight = 30;
const pipeWidth = 50;
const pipeGap = 125;

//Variaveis do bichano

let birdX =50;
let birdY = 50;
let birdVelocidade = 0;
let birdAceleracao = 0.1; 

// Variaveis do pipe

let pipeX = 400;
let pipeY = canvas.height - 200;

// Variaveis da pontuação 

let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;

document.body.onkeyup = function(e){
    if(e.code == 'Space'){
        birdVelocidade = flapSpeed;
    }
}

document.getElementById('reiniciar-button').addEventListener('click' , function(){ 
    hideEndMenu();
    resetGame(); 
    loop(); 
})

function increaseScore(){

}

function colisionCheck(){
    const birdBox = {
        x: birdX,
        y: birdY,
        width: birdWidth,
        height: birdHeight,
    }

    const topPipeBox = { 
        x: pipeX,
        y: pipeY - pipeGap + birdHeight,
        width: pipeWidth,
        height: pipeY,
    }

    const bottomPipeBox = {
        x: pipeX,
        y: pipeY - pipeGap + birdHeight,
        width: pipeWidth,
        height: canvas.height - pipeY - pipeGap,
    }


    //Checkar as colisões 
    if( birdBox.x + birdBox.width > topPipeBox.x && 
        birdBox.x < topPipeBox.x + topPipeBox.width &&
        birdBox.y< topPipeBox.y){
            return true;
        }

    if(birdBox.x + birdBox.width > bottomPipeBox.x &&
        birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
        birdBox.y + birdBox.height > bottomPipeBox.y){
            return true;
        }

    if(birdY < 0 || birdY + birdHeight > canvas.height){
        return true; 
    }

    return false;
}

function hideEndMenu(){
    document.getElementById('menu-final').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');

}

// Menu final 
function showEndMenu(){
    document.getElementById('menu-final').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('pontuacao-final').innerHTML = score;
    
    // Validando maior pontuação 
    if(highScore < score){
        highScore = score;
    }
    document.getElementById('melhor-pontuacao').innerHTML = highScore;
}

function resetGame(){
    birdX =50;
    birdY = 50;
    birdVelocidade = 0;
    birdAceleracao = 0.1; 

    pipeX = 400;
    pipeY = canvas.height - 200;

    score = 0;
}

function endGame(){
    showEndMenu();

}
function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar o bichano
    ctx.drawImage(flappyImg, birdX, birdY);

    // Desenhar os pipes
    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, -100, pipeWidth, pipeY);
    ctx.fillRect(pipeX, pipeY + pipeGap, pipeWidth, canvas.height -pipeY);

    if(colisionCheck()){
        endGame();
        return;
    }

    pipeX -= 1.5; 

    // Randomização Pipes 
    if(pipeX < -50){
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - pipeGap) + pipeWidth;
    }
    
    birdVelocidade += birdAceleracao;
    birdY += birdVelocidade;

    requestAnimationFrame(loop);

}

loop();