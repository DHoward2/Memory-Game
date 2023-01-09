const gameContainer = document.getElementById("game");
const start = document.getElementById('start');
const score = document.querySelector('#score .points');
let points = 0;

start.addEventListener('click', function() {
  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];
  
  const selectedCards = [];
  
  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
  
      // Decrease counter by 1
      counter--;
  
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
  
    return array;
  }
  
  let shuffledColors = shuffle(COLORS);
  
  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
  
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
  
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
  
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }
  
  // TODO: Implement this function!
  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target.className);
    // document.querySelector(`.${event.target.className}`).style.backgroundColor = event.target.className;
    
    let cardPick = event.target;
    cardPick.style.backgroundColor = event.target.className;
    selectedCards.push(event.target);
    if(selectedCards[0] !== selectedCards[1]) {
      compareCards();
    } else if (selectedCards[0] === selectedCards[1]){
      sameCards();
    }

    // the score keeper
    score.innerText = scoreBoard();
  }
  
  function compareCards () {
  
    if (selectedCards.length > 2) {
      tooManyPicks();
    }
  
    if(selectedCards.length === 2) {
      if(selectedCards[0].className === selectedCards[1].className) {
        console.log('yaayy');
        selectedCards.pop();
        selectedCards.pop();
      }
      else {
        setTimeout(wrongGuess,1000);
      }
    }
    
  }
  
  function wrongGuess(){
    console.log('try again!');
    selectedCards[0].style.backgroundColor = 'white';
    selectedCards[1].style.backgroundColor = 'white';
    selectedCards.pop();
    selectedCards.pop();
  }
  
  function tooManyPicks(){
    alert('SLOW DOWN YOU PICKED TOO FAST!!!');
    for (let i = selectedCards.length; i > 2; i--) {
      selectedCards[selectedCards.length - 1].style.backgroundColor = 'white'
      selectedCards.pop();
  
    }
  }
  function sameCards(){
    alert('YOU PICKED THE SAME CARDS');
    for (let i = selectedCards.length; i > 0; i--) {
      selectedCards[selectedCards.length - 1].style.backgroundColor = 'white'
      selectedCards.pop();
  
    }
  }

  function scoreBoard(){
    points++;
    return points;
  }
  // when the DOM loads
  createDivsForColors(shuffledColors);
  
  /* */

})

