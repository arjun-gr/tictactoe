let userChoice = document.querySelectorAll('.col')
let pannel = document.querySelector(".pannel")
let who = document.querySelector(".who")
const usrSymbol = "x"
const compSymbol = "o"
let dtaSet = [
    ["","",""],
    ["","",""],
    ["","",""]
]

function isGameOver(){
    //Horizontal check
    for(let i = 0; i < 3; i++){
        if(dtaSet[i][0] !== "" && dtaSet[i][0] === dtaSet[i][1] && dtaSet[i][0] === dtaSet[i][2]){
            return dtaSet[i][0]
        }
    }
    //Vertical check
    for(let j = 0; j < 3; j++){
        if(dtaSet[0][j] !== "" && dtaSet[0][j] === dtaSet[1][j] && dtaSet[0][j] === dtaSet[2][j]){
            return dtaSet[0][j]
        }
    }

    //Top left to bottom right
    if(dtaSet[0][0] !== "" && dtaSet[0][0] === dtaSet[1][1] && dtaSet[0][0] === dtaSet[2][2]){
        return dtaSet[0][0]
    }

    //Top right to bottom left
    if(dtaSet[0][2] !== "" && dtaSet[0][2] === dtaSet[1][1] && dtaSet[0][2]=== dtaSet[2][0]){
        return dtaSet[0][2]
    }

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(dtaSet[i][j] === ""){
                return false;
            }
        }
    }
}

userChoice.forEach((elem)=>{

    elem.addEventListener("click",()=>{
     
        let i = elem.getAttribute("data-i")
        let j = elem.getAttribute("data-j")
    
        if(dtaSet[i][j] !== ""){
            //check if symbol already exists in that location
            return;
        }
        elem.innerText = usrSymbol;
        dtaSet[i][j] = usrSymbol; 
        console.log(dtaSet)

        let usrWon = isGameOver();
        if(usrWon){
            // alert("Game over: user Won")
            who.innerText = "You Won"
            pannel.classList.add("showPannel")
        }
        else{
            //check if draw
            let isFull = true;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j <3; j++){
                    if(dtaSet[i][j] === ""){
                        isFull = false;
                        break;
                    }
                }
                if(!isFull){
                    break;
                }
            }
            if(isFull){
                who.innerText = "Draw"
                pannel.classList.add("showPannel")
                return null
            }
            
            //Computer logic
        
            setTimeout(()=>{
                let i,j
                  do{
                      i = Math.floor(Math.random()*3)
                      j = Math.floor(Math.random()*3)
                  }
                  while(dtaSet[i][j] !== ""){
                      console.log(i,j)
                      dtaSet[i][j] = compSymbol
                      let compSelection = document.querySelectorAll(".col")
                      compSelection.forEach((elem)=>{
                          if(elem.getAttribute("data-i") == i && elem.getAttribute("data-j")== j){
                            //   console.log("matched")
                              elem.innerText = compSymbol
                          }
                      })
                  }
                  let compWin = isGameOver()
                  if(compWin){
                    //   alert("Game: Over Comp wins")
                      who.innerText = "Comp Won"
                      pannel.classList.add("showPannel")
                  }
      },400)
  
        }
    })
})
