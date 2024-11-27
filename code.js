const paper = document.getElementById('paper')
const rock = document.getElementById('rock')
const scissor = document.getElementById('scissor')
const result = document.getElementById('result')
const moves = document.querySelector('.moves')
const computerMoves = document.getElementById('computer-move')
const userMoves = document.getElementById('user-move')
const resetCount = document.querySelectorAll('.result-button')[0]
const autoPlay = document.querySelectorAll('.result-button')[1]

const score={
    wins:0,
    losses:0,
    ties:0,
}
let isAutoPlay = false

paper.addEventListener('click',()=> playGame('paper'))
rock.addEventListener('click',()=> playGame('rock'))
scissor.addEventListener('click',()=> playGame('scissor'))

function reset(){
    result.style.display = 'none'
    moves.style.display = 'none'
    score.wins=0
    score.ties=0
    score.losses=0
    display_score()
}

resetCount.addEventListener('click',reset)
let id = null
autoPlay.addEventListener('click',function(){
    isAutoPlay = !isAutoPlay
    if(isAutoPlay){
        id = setInterval(function autoplay(){
            playGame(pickComputerMove())
        },1000)
        autoPlay.innerHTML = 'Stop'
        
    }
    else{
        clearInterval(id)
        reset()
        autoPlay.innerHTML = 'Auto play'

    }
    
})

function pickComputerMove(){
    const randomNumber=Math.random();
    if(randomNumber<=1/3){
        return "rock";
    }
    else if(randomNumber<=2/3){
        return "scissor";
    }
    else{
        return 'paper'
    }
}


function playGame(playerMove){
    const computerMove  = pickComputerMove();
    console.log(computerMove)
    const lastScore = {wins:score.wins,
        losses: score.losses,
        ties:score.ties,}
    userMoves.src = `${playerMove}-emoji.png`
    computerMoves.src = `${computerMove}-emoji.png`
    moves.style.display = 'block'

    if(playerMove === 'rock'){
        switch(computerMove){
            case 'rock':
                score.ties++;
                break;
            case 'paper':
                score.losses++;
                break;
            case 'scissor':
                score.wins++;
                break;
        }

    }
    else if(playerMove === 'paper'){
        switch(computerMove){
            case 'rock':
                score.wins++;
                break;
            case 'paper':
                score.ties++;
                break;
            case 'scissor':
                score.losses++;
                break;
        }
    }
    else{
        switch(computerMove){
            case 'rock':
                score.losses++;
                break;
            case 'paper':
                score.wins++;
                break;
            case 'scissor':
                score.ties++;
                break;
        }
    }

    if(score.wins - lastScore.wins>0){
        result.innerHTML = 'You win'
    }
    if(score.ties - lastScore.ties>0){
        result.innerHTML = 'Tie'
    }
    if(score.losses - lastScore.losses>0){
        result.innerHTML = 'You win'
    }
    
    display_score()

    console.log(score);

}
function display_score(){
    document.getElementById('w').innerHTML = `Wins:${score.wins}`
    document.getElementById('l').innerHTML = `Losses:${score.losses}`
    document.getElementById('t').innerHTML = `Ties:${score.ties}`
}
