  const grid= document.querySelector(".grid");
  const width=100;
  const height=20; 
  const userStart=[230,10];
  let currentPosition=userStart;
  const boardwidth=560;
  const ballStart=[230,40];
  let ballCurrentPosition=ballStart;
  
  
  
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
   ballCurrentPosition[0]+=2;
   ballCurrentPosition[1]+=2;
   drawBall();
 }