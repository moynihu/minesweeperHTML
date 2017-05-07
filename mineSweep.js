startGame(22, 42, 80);
//original start game is 20 rows, 40 columns, and 100 to 200 bombs or 60
//50% view (54 rows, 121 columns, 700 bombs)
//100% view (24 rows, 60 columns, 200 bombs)

function reset(){
  document.getElementById("buttonContainer").innerHTML = ""
  var rows = document.getElementById("paramRow").value
  var columns = document.getElementById("paramColumn").value
  var bombs = document.getElementById("paramBomb").value
  startGame(rows, columns, bombs)
}

function startGame(gameRows, gameColumns, numBombs){

  var gameRows = gameRows
  var gameColumns = gameColumns
  var numBombs = numBombs

  var gem = []

  var isPressed = false
  var winner = false
  
  var keydown = function(){
    isPressed = true
  }
  
  var keyup = function(){
    isPressed = false
  }
  
  document.getElementById("buttonContainer").style.width = (gameColumns * 35) + "px"
  document.getElementById("inputs").style.width = ((gameColumns * 35) - 20) + "px"
  console.log(document.getElementById("buttonContainer").style.width)
  
  makeGems();
  isKeyDown();
  //displayEverything(); //uncomment to start game with everything clicked
  //displayAllZeroes(); //uncomment to check if zeroes are working right

  function makeGems(){
    for(var row = 0; row < gameRows; row++){
      var tempArr = [];
      for(var col = 0; col < gameColumns; col++){
        tempArr.push(new gemConstruct)
      }
      gem.push(tempArr)
    }
    setUpGems();
  }

  function setUpGems(){
    createButtons();
    for(var row = 0; row < gameRows; row++){
      for(var col = 0; col < gameColumns; col++){
        gem[row][col].place = place(row, col)
      }
    }
    determineGame();
    console.log(gem)
  }

  function gemConstruct(){
    this.btn = null,
    this.game = "",
    this.display = false,
    this.place = ""
  }

  function place(row, col){
    if(row > 0 && row < (gameRows - 1) && col > 0 && col < (gameColumns - 1)){
      return "middle"
    }else if(row === 0 && col < (gameColumns - 1) && col > 0){
      return "top"
    }else if(row === (gameRows - 1) && col < (gameColumns - 1) && col > 0){
      return "bottom"
    }else if(col === 0 && row > 0 && row < (gameRows - 1)){
      return "left"
    }else if(col === (gameColumns - 1) && row > 0 && row < (gameRows - 1)){
      return "right"
    }else if(row === 0 && col === 0){
      return "top left"
    }else if(row === (gameRows - 1) && col === 0){
      return "bottom left"
    }else if(row === 0 && col === (gameColumns - 1)){
      return "top right"
    }else if(row === (gameRows - 1) && col === (gameColumns - 1)){
      return "bottom right"
    }
}


  function createButtons(){
    for(var i = 0; i < gameRows; i++){
        for(var j = 0; j < gameColumns; j++){
          var newBtn = document.createElement("BUTTON");
          var btnText = document.createTextNode("")
          newBtn.appendChild(btnText);
          document.body.appendChild(newBtn)
          document.getElementById("buttonContainer").appendChild(newBtn);
          
          var string = i + "," + j

          newBtn.id = string         
          newBtn.onclick = function() {
            clickEvent(this.id)
          }
        gem[i][j].btn = newBtn
        }
    }
  }

  function addOne(row, col){
    if(gem[row][col].game !== "bomb"){
      var tempNum = parseInt(gem[row][col].game)
      tempNum += 1
      gem[row][col].game = tempNum + ""
    }
  }

  function clickOne(row, col){
    if(gem[row][col].display === false){
      clickEvent(row + "," + col)
    }
  }

  function determineGame(){
    for(var row = 0; row < gameRows; row++){
      for(var col = 0; col < gameColumns; col++){
        gem[row][col].game = "0"
      }
    }
  
    for(var w = 0; w < numBombs; w++){
      var randRow = Math.floor(Math.random() * gameRows)
      var randCol = Math.floor(Math.random() * gameColumns)
    
        while(gem[randRow][randCol].game === "bomb"){
          randRow = Math.floor(Math.random() * gameRows)
          randCol = Math.floor(Math.random() * gameColumns)
        }
    
        gem[randRow][randCol].game = "bomb"

        if(gem[randRow][randCol].place === "middle"){
          addOne((randRow + 1), randCol)
          addOne((randRow - 1), randCol)
          addOne(randRow, (randCol + 1))
          addOne(randRow, (randCol - 1))
          addOne((randRow + 1), (randCol + 1))
          addOne((randRow + 1), (randCol - 1))
          addOne((randRow - 1), (randCol + 1))
          addOne((randRow - 1), (randCol - 1))
        }else if(gem[randRow][randCol].place === "top"){
          addOne((randRow + 1), randCol)
          addOne(randRow, (randCol + 1))
          addOne(randRow, (randCol - 1))
          addOne((randRow + 1), (randCol + 1))
          addOne((randRow + 1), (randCol - 1))
        }else if(gem[randRow][randCol].place === "bottom"){
          addOne((randRow - 1), randCol)
          addOne(randRow, (randCol + 1))
          addOne(randRow, (randCol - 1))
          addOne((randRow - 1), (randCol + 1))
          addOne((randRow - 1), (randCol - 1))
        }else if(gem[randRow][randCol].place === "left"){
          addOne((randRow + 1), randCol)
          addOne((randRow - 1), randCol)
          addOne(randRow, (randCol + 1))
          addOne((randRow + 1), (randCol + 1))
          addOne((randRow - 1), (randCol + 1))
        }else if(gem[randRow][randCol].place === "right"){
          addOne((randRow + 1), randCol)
          addOne((randRow - 1), randCol)
          addOne(randRow, (randCol - 1))
          addOne((randRow + 1), (randCol - 1))
          addOne((randRow - 1), (randCol - 1))
        }else if(gem[randRow][randCol].place === "top left"){
          addOne((randRow + 1), randCol)
          addOne(randRow, (randCol + 1))
          addOne((randRow + 1), (randCol + 1))
        }else if(gem[randRow][randCol].place === "bottom left"){
          addOne((randRow - 1), randCol)
          addOne(randRow, (randCol + 1))
          addOne((randRow - 1), (randCol + 1))
        }else if(gem[randRow][randCol].place === "top right"){
          addOne((randRow + 1), randCol)
          addOne(randRow, (randCol - 1))
          addOne((randRow + 1), (randCol - 1))
        }else if(gem[randRow][randCol].place === "bottom right"){
          addOne((randRow - 1), randCol)
          addOne(randRow, (randCol - 1))
          addOne((randRow - 1), (randCol - 1))
        }
    }
  }
  
  function findArrayPosition(givenId){
    for(var column = 0; column < gameRows; column++){
      for(var row=0; row < gameColumns; row++){
        if(gem[column][row].btn.id === givenId){
          var newArr = [column, row]
          return newArr
        }
      }
    }
  }
  
  function isKeyDown(){
    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);
  }
  
  function displayWhenZero(row, column){
    if(gem[row][column].display === false){
        if(gem[row][column].place === "middle"){ //display middle also simulate id within add one function
          gem[row][column].display = true
          clickOne(row,(column + 1))
          clickOne(row,(column - 1))
          clickOne((row + 1),column)
          clickOne((row - 1),column)
          clickOne((row + 1),(column + 1))
          clickOne((row + 1),(column - 1))
          clickOne((row - 1),(column - 1))
          clickOne((row - 1),(column + 1))
        }else if(gem[row][column].place === "top"){  //display top row
          gem[row][column].display = true
          clickOne(row,(column + 1))
          clickOne(row,(column - 1))
          clickOne((row + 1),column)
          clickOne((row + 1),(column + 1))
          clickOne((row + 1),(column - 1))
        }else if(gem[row][column].place === "bottom"){ //display bottom row
          gem[row][column].display = true
          clickOne(row,(column + 1))
          clickOne(row,(column - 1))
          clickOne((row - 1),column)
          clickOne((row - 1),(column - 1))
          clickOne((row - 1),(column + 1))
        }else if(gem[row][column].place === "left"){ //display left column
          gem[row][column].display = true
          clickOne(row,(column + 1))
          clickOne((row + 1),column)
          clickOne((row - 1),column)
          clickOne((row + 1),(column + 1))
          clickOne((row - 1),(column + 1))
        }else if(gem[row][column].place === "right"){  //display right column
          gem[row][column].display = true
          clickOne(row,(column - 1))
          clickOne((row + 1),column)
          clickOne((row - 1),column)
          clickOne((row + 1),(column - 1))
          clickOne((row - 1),(column - 1))
        }else if(gem[row][column].plcae === "top left"){   //display top left corner
          gem[row][column].display = true
          clickOne(row,(column + 1))
          clickOne((row + 1),column)
          clickOne((row + 1),(column + 1))
        }else if(gem[row][column].place === "bottom left"){  //display bottom left corner
          gem[row][column].display = true
          clickOne(row,(column + 1))
          clickOne((row - 1),column)
          clickOne((row - 1),(column + 1))
        }else if(gem[row][column].place === "top right"){  //display top right corner
          gem[row][column].display = true
          clickOne(row,(column - 1))
          clickOne((row + 1),column)
          clickOne((row + 1),(column - 1))
        }else if(gem[row][column].place === "bottom right"){ //display bottom right corner
          gem[row][column].display = true
          clickOne(row,(column - 1))
          clickOne((row - 1),column)
          clickOne((row - 1),(column - 1))
        }
    }
  }
  
  function clickEvent(id){
      var posInArray = findArrayPosition(id)
      var row = posInArray[0]
      var column = posInArray[1]
    if(isPressed === false){
      if(gem[row][column].game !== "bomb"){
        switch(gem[row][column].game){
          case "0":
            break;
          case "1":
            gem[row][column].btn.style.color = "blue"
            break;
          case "2":
            gem[row][column].btn.style.color = "green"
            break;
          case "3":
            gem[row][column].btn.style.color = "red"
            break;
          case "4":
            gem[row][column].btn.style.color = "darkBlue"
            break;
          case "5":
            gem[row][column].btn.style.color = "magenta"
            break;
          case "6":
            gem[row][column].btn.style.color = "darkMagenta"
          case "7":
            gem[row][column].btn.style.color = "darkGoldenRod"
          case "8":
            gem[row][column].btn.style.color = "dimGray"
          }
      }
        gem[row][column].btn.style.fontWeight = "bold";
        gem[row][column].btn.className = "clickedButton"; //comment out to make the buttons look like the other buttons or change the last three styles
      
      if(gem[row][column].game === "bomb"){
        gem[row][column].btn.style.backgroundColor = "lightBlue";
        gem[row][column].btn.innerHTML = ""
        gem[row][column].btn.style.backgroundSize = "contain"
        gem[row][column].btn.style.backgroundImage = "url('file:///home/moynihu/Downloads/Minesweep%20App/mkWiiBob-omb.png')"
        gem[row][column].display = true
        setTimeout(displayEverything, 250)
      }else {
      gem[row][column].btn.style.backgroundColor = "gainsboro";
      gem[row][column].btn.innerHTML = gem[row][column].game
        if(gem[row][column].game === "0"){
          gem[row][column].btn.style.backgroundColor = "dimGrey";
          gem[row][column].btn.innerHTML = ""
          displayWhenZero(row, column);
        }
      gem[row][column].display = true
      
      }
      if(checkForWin() === true && winner === false){
        winner = true
        alert("You won!")
      }
    }else if(isPressed === true && gem[row][column].display === false){
      if(gem[row][column].btn.innerHTML !== "M?"){
          gem[row][column].btn.style.backgroundColor = "bisque"
          gem[row][column].btn.innerHTML = "M?"
          //gem[row][column].btn.className = "clickedButton"
      }else if(gem[row][column].btn.innerHTML === "M?" && gem[row][column].display === false){
          gem[row][column].btn.style.backgroundColor = "buttonface";
          gem[row][column].btn.innerHTML = ""
      }
    }
  }
  
  function checkForWin(){
    for(var i = 0; i < gameRows; i++){
      for(var j = 0; j < gameColumns; j++){
        if(gem[i][j].game !== "bomb" && gem[i][j].display === true){
          
        }else if(gem[i][j].game === "bomb" && gem[i][j].display === false){

        }else {
          return false
        }
      }
    }
    return true
  }
  
  function displayEverything(){
    for(var i = 0; i < gameRows; i++){
      for(var j = 0; j < gameColumns; j++){
        clickOne(i,j)
        }
      }
    }
  
  function displayAllZeroes(){
    for(var i = 0; i < gameRows; i++){
      for(var j = 0; j < gameColumns; j++){
        var simId = i + "," + j
        if(gem[i][j].game === "0" && gem[i][j].display === false){
          clickEvent(simId)
        }
      }
    }
  }
}
