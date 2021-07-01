let inputDir = {x: 0, y: 0};
const foodSound= new Audio('Food.mp3');
const gameOverSound= new Audio('GameOver.mp3');
const moveSound= new Audio('Move.mp3');
const musicSound=new Audio('Music.mp3');
let speed=9;
let lastPaintTime=0;
let snakeArr = [
    {x : 13, y : 15}  //initial head location for snake
];

let food = {x: 6 , y:7};
let score=0;


function main(ctime)
{
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(sArr)
{
    //if you bump into yourself;
    for(let i= 1; i < snakeArr.length; i++)
    {
        if(sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(sArr[0].x >=18 || sArr[0].x <=0 || sArr[0].y >=18 || sArr[0].y <=0){
        return true;
    }

}

function gameEngine()
{
   //Part 1: Updating the snake array
   if(isCollide(snakeArr)){
       gameOverSound.play();
       musicSound.pause();
       
       
       inputDir = {x: 0, y: 0};
       alert("Game Over, Press any key to play again! Your Score is "+score);
       snakeArr = {x: 13, y: 15};
       //musicSound.play();
       
   }

   //If you have eaten the food, increment the score abd regenerate food
   if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
       foodSound.play();
       score += 1;
       if(score>highscoreval){
           highscoreval=score;
           localStorage.setItem("highscore",JSON.stringify(highscoreval));
           HighscoreBox.innerHTML="High Score: " +highscoreval;
       }
       scoreBox.innerHTML="Score: " +score;
       snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
       let a =2;
       let b =16;
       food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
   }

   //Moving the snake
   for(let i = snakeArr.length - 2; i>=0; i--)
   {
       snakeArr[i+1] = {...snakeArr[i]};
   }

   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;

   //Part 2: Render/Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');    //creating element
        snakeElement.style.gridRowStart = e.y;     //for row make it vertical
        snakeElement.style.gridColumnStart = e.x;    //for col make it horizontal
        
        if(index === 0){
            snakeElement.classList.add('head');
        }  
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement); 
         //append snake to the board div
        
    });
        // Display the food
        foodElement = document.createElement('div');    
        foodElement.style.gridRowStart = food.y;     
        foodElement.style.gridColumnStart = food.x;   
        foodElement.classList.add('food');
        board.appendChild(foodElement)

   
}










//Main logic
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval=0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    HighscoreBox.innerHTML="High Score: " +highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x: 0, y: 1};
      //Start the game
      //musicSound.play();
    moveSound.play();

    switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;        
      
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;  
        default:
            break;         
    }
});