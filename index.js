  const grid= document.querySelector(".grid");
  const width=100;
  const height=20; 
  const userStart=[230,10];
  let currentPosition=userStart;
  const boardWidth=560;
  const ballStart=[230,40];
  let ballCurrentPosition=ballStart;
  let timerId;
  const ballDiameter=20;
  const boardHeight=300;
  let directionX=-2;
  let directionY=2;
  const showScore=document.querySelector("#score");
  let score=0;
  let ball;
  let user;
  let loopstat="true";
  let blocks;
  let playername="";
  let playerscore=[];
  let htmlCode="";
   let Counter=0;
  
  
  
  
  class Block{
      constructor(xAxis, yAxis){
          this.bottomLeft=[xAxis,yAxis];
          this.bottomRight=[xAxis + width,yAxis];
          this.topLeft=[xAxis,yAxis+height];
          this.topRight=[xAxis+width+yAxis+height];

          
      }
    }
    //here we create all the blocks
     blocks=[
        new Block(10,270),
        new Block(120,270),
        new Block(230,270),
        new Block(340,270),
        new Block(450,270),
        new Block(10,240),
        new Block(120,240),
        new Block(230,240),
        new Block(340,240),
        new Block(450,240),
        new Block(10,210),
        new Block(120,210),
        new Block(230,210),
        new Block(340,210),
        new Block(450,210),
       
    ];
    console.log(blocks[0]);
  
  
 
 createBlocks();
  
  user=document.createElement("div");
 user.classList.add("user");
 user.style.left=currentPosition[0] +"px";
 user.style.bottom=currentPosition[1] + "px";
 grid.appendChild(user);
 document.addEventListener("keydown",moveUser);

  ball=document.createElement("div");
 
 ball.classList.add("ball");
 drawBall();
 grid.appendChild(ball);
  


 
 


function displaceUser(){
    user.style.left=currentPosition[0] +"px";
 user.style.bottom=currentPosition[1] + "px";
}
function drawBall(){
  ball.style.left=ballCurrentPosition[0] +"px";
 ball.style.bottom=ballCurrentPosition[1] +"px";

}

 //movement of the user while playing the game

       function moveUser(e){
     switch(e.key){
         case "ArrowLeft" :
             if(currentPosition[0]>0){
             currentPosition[0]-=10;
             
            displaceUser();
             }
            break;
            case "ArrowRight" :
                if(currentPosition[0]<490){
                currentPosition[0]+=10;
                
               displaceUser();
                }
               break;

     }
           

 }
/*
 document.addEventListener("keydown",moveUser);

 ball=document.createElement("div");

ball.classList.add("ball");
drawBall();
grid.appendChild(ball);
*/
 








 //create all blocks

  
 function createBlocks(){
    
  
  for(let i=0; i<blocks.length;i++){
    const block=document.createElement("div");
    block.classList.add("block");
    block.style.left=blocks[i].bottomLeft[0] + "px";
    block.style.bottom=blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);

  }
  }



 
 function displaceBall(){
   ballCurrentPosition[0]+=directionX;
   ballCurrentPosition[1]+=directionY;
   drawBall();
   checkForCollisions();

 }


  
   //check the direction of collision if it goes off the board
   function changeBallPosition(){
     if(directionX === 2 &&directionY === 2){
       directionY=-2;
       return;
     }
     if(directionX === 2 &&directionY === -2){
      directionX=-2;
      return;

   }
   if(directionX === -2 &&directionY === -2){
    directionY=2;
    return;


  }
  if(directionX === -2 &&directionY === 2){
    directionX=2;
    return;
  }
}


function checkForCollisions(){
  // check if the ball hits a brick
  for(let i=0; i<blocks.length; i++){
    if(
      (ballCurrentPosition[0]>blocks[i].bottomLeft[0]&&ballCurrentPosition[0]<blocks[i].bottomRight[0]
       &&((ballCurrentPosition[1]+ballDiameter)>blocks[i].bottomLeft[1]&&ballCurrentPosition[1]<
       blocks[i].topLeft[1]))){
         const allTheBlocks=Array.from(document.querySelectorAll(".block"));
         
         allTheBlocks[i].classList.remove("block");
         blocks.splice(i,1);
         changeBallPosition();
         score++;
         showScore.innerHTML=score;
         //check for win
         if(blocks.length===0){
           showScore.innerHTML="YOU WON";
           playerscore.push(score);
           clearInterval(timerId);
           document.removeEventListener("keydown",moveUser);
       playerscore.push(score);
       Counter++;
       for(let i=1;i<=playerscore.length; i++){
        htmlCode= htmlCode +  `<p>game${Counter}:   score:${playerscore[i-1]}</p><br><hr> `
  
}
   
    document.querySelector(".scorediv").innerHTML=htmlCode;
    
         }




       }
    }

  // checking for user collisions
  if((ballCurrentPosition[0]>currentPosition[0] && ballCurrentPosition[0]< currentPosition[0]+width )
  &&(ballCurrentPosition[1]>currentPosition[1]&& ballCurrentPosition[1]<currentPosition[1]+height)){
    changeBallPosition();
  }
  //checking for collisions with the wall

  if(ballCurrentPosition[0]>=(boardWidth-ballDiameter) ||
  ballCurrentPosition[1]>=(boardHeight-ballDiameter) ||
  ballCurrentPosition[0]<= 0 )
  {
    changeBallPosition();
  }

 
  // check for game over
  if(ballCurrentPosition[1]<=0){
    clearInterval(timerId);

    showScore.innerHTML="you lose";
playerscore.push(score);
Counter++;
for(let i=1;i<=playerscore.length; i++){
   htmlCode= htmlCode +  `<p>game${Counter}:   score:${playerscore[i-1]}</p><hr> `
  
}
   // gameCount++;
    document.querySelector(".scorediv").innerHTML=htmlCode;
    
  
 }
}



document.querySelector(".startButton").addEventListener("click", function(){
  if(playername==""){
    alert("!please insert your player name and email for you can play")
    return;
  }
  playerscore=[];
  score=0;
   currentPosition=userStart;
    directionX=-2;
    directionY=2;
  
   ballCurrentPosition=ballStart;
  grid.innerHTML="";
  user="";
  ball="";
  blocks=[];
  blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
   
];
console.log(blocks[0]);



createBlocks();

user=document.createElement("div");
user.classList.add("user");
user.style.left=currentPosition[0] +"px";
user.style.bottom=currentPosition[1] + "px";
grid.appendChild(user);
document.addEventListener("keydown",moveUser);

ball=document.createElement("div");

ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

  
  timerId=setInterval(displaceBall,20);

});


document.querySelector('body').addEventListener('submit', async (event) => {

  let target = event.target;

  
  if (!target.closest('form[name="loginform"]')) { return; }

  
  event.preventDefault();

  let el = document.forms.loginform.elements;
  let requestBody1 = {};
  for (let element of el) {
    if (element.type === 'submit') { continue; }
    requestBody1[element.name] = element.value;
  }
    
  JSON.stringify(requestBody1);
    console.log(requestBody1.name);
    playername=requestBody1.name;
    console.log(playername);
    alert("Thank you.now click on start game button and play");
});
  
 
    

  

  

  
  



