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
  
  
  
  class Block{
      constructor(xAxis, yAxis){
          this.bottomLeft=[xAxis,yAxis];
          this.bottomRight=[xAxis + width,yAxis];
          this.topLeft=[xAxis,yAxis+height];
          this.topRight=[xAxis+width+yAxis+height];

          
      }
    }
    //here we create all the blocks
    const blocks=[
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
 createBlocks();

 const user=document.createElement("div");
 user.classList.add("user");
 user.style.left=currentPosition[0] +"px";
 user.style.bottom=currentPosition[1] + "px";
 grid.appendChild(user);
 


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

 document.addEventListener("keydown",moveUser);

 const ball=document.createElement("div");
 
 ball.classList.add("ball");
 drawBall();
 grid.appendChild(ball);

 function displaceBall(){
   ballCurrentPosition[0]+=directionX;
   ballCurrentPosition[1]+=directionY;
   drawBall();
   checkForCollisions();

 }
   timerId=setInterval(displaceBall,30);



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
       document.removeEventListener("keydown",moveUser);
     }
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