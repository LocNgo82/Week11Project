/**
 * Based on Maja Maj's Tic-Tac-Toe
 * Retrieve from https://mdbootstrap.com/snippets/jquery/maja_maj/143753
 */
// display who's turn on the tic-tac-toe game
// store all the boxes into an array
// set the count for the players.  Odd number is for O, Even number is for X.
var turn = document.getElementById("turn"),
      boxes = document.querySelectorAll("#main div"), X_or_O = 0;

// if no one win, set it to false, otherwise, set it to true
var win = false;

// alert message box place holder
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

// create the alert message box dynamically
const alert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');
// append the message box to the alert place holder.
  alertPlaceholder.append(wrapper);
}

// this function select the winner.  Display the winner on the top of the gameboard
// and set alert message box to the winner
function selectWinnerBoxes(b1, b2, b3) {
  // highlight the winning boxes
  b1.classList.add("win");
  b2.classList.add("win");
  b3.classList.add("win");
  // display the winner on the top of the gameboard
  turn.innerHTML = b1.innerHTML + " is a winner";
  // use jquery to remove previous bootstrap alert element
  $("#liveAlertPlaceholder").empty();
  // use bootstrap alert message to display the winner
  alert(turn.innerHTML, 'success')
  // set the font size for the message on top of the gameboard
  turn.style.fontSize = "40px";           
  // unbind the click event to stop the game 
  $(".box").unbind( "click", boxEventHandler);
  // return true if we have a winner
  return true;
}

// this function check to see if there is a winner.
function getWinner() {
  // assign a variable for each box on the grid
  var box1 = document.getElementById("box1"),
    box2 = document.getElementById("box2"),
    box3 = document.getElementById("box3"),
    box4 = document.getElementById("box4"),
    box5 = document.getElementById("box5"),
    box6 = document.getElementById("box6"),
    box7 = document.getElementById("box7"),
    box8 = document.getElementById("box8"),
    box9 = document.getElementById("box9");
  // check boxes 1,2,3 to see if there is a winner
  if (box1.innerHTML !== "" && box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML) 
    return selectWinnerBoxes(box1, box2, box3);
  // check boxes 4,5,6 to see if there is a winner
  if (box4.innerHTML !== "" && box4.innerHTML === box5.innerHTML && box4.innerHTML === box6.innerHTML) 
    return selectWinnerBoxes(box4, box5, box6);
    
  // check boxes 7,8,9 to see if there is a winner
  if (box7.innerHTML !== "" && box7.innerHTML === box8.innerHTML && box7.innerHTML === box9.innerHTML) 
    return selectWinnerBoxes(box7, box8, box9);
  // check boxes 1,4,7 to see if there is a winner
  if (box1.innerHTML !== "" && box1.innerHTML === box4.innerHTML && box1.innerHTML === box7.innerHTML) 
    return selectWinnerBoxes(box1, box4, box7);
  // check boxes 2,5,8 to see if there is a winner
  if (box2.innerHTML !== "" && box2.innerHTML === box5.innerHTML && box2.innerHTML === box8.innerHTML)
    return selectWinnerBoxes(box2, box5, box8);
  // check boxes 3,6,9 to see if there is a winner
  if (box3.innerHTML !== "" && box3.innerHTML === box6.innerHTML && box3.innerHTML === box9.innerHTML)
    return selectWinnerBoxes(box3, box6, box9);
  // check boxes 1,5,9 to see if there is a winner
  if (box1.innerHTML !== "" && box1.innerHTML === box5.innerHTML && box1.innerHTML === box9.innerHTML)
    return selectWinnerBoxes(box1, box5, box9);
  // check boxes 3,5,7 to see if there is a winner
  if (box3.innerHTML !== "" && box3.innerHTML === box5.innerHTML && box3.innerHTML === box7.innerHTML)
    return selectWinnerBoxes(box3, box5, box7);
  // return false if no winner
  return false;

}

// click event function for each box
var boxEventHandler = function () {
  console.log("boxEventHandler click");
  if (this.innerHTML !== "X" && this.innerHTML !== "O") {
    // when X is even
    if (X_or_O % 2 === 0) {
      console.log(X_or_O);
      // display X on the box
      this.innerHTML = "X";
      // display it's O turn now on top of the gameboard
      turn.innerHTML = "O Turn Now";
      // check winner for X.  If X win, dipslay on top of the gameboard and alert message
      win = getWinner();
      // increment the count by 1
      X_or_O += 1;

    } else {  // else
      console.log(X_or_O);
      // when O is odd
      // display O on the grid
      this.innerHTML = "O";
      // display it's X turn now
      turn.innerHTML = "X Turn Now";
       // check winner for O.  If O win, dipslay on top of the grids and alert message
      win = getWinner();     
      // increment the count by 1       
      X_or_O += 1;
    }
  }
  // if no winner and count == 9, display no winner on the top of the gameboard and alert message.
  if ((X_or_O == 9) && (!win)) {
    turn.innerHTML = "No Winner";
    // use jquery to remove the previous alert element.
    $("#liveAlertPlaceholder").empty();
    // use bootstrap alert message to display no winner
    alert('No Winner!', 'warning');
    // unbind the click events to stop the game
    $(".box").unbind( "click", boxEventHandler);
  }

};

// use jquery to bind all the boxes to the boxEventHandler function
$(".box").bind( "click", boxEventHandler);

// add eventlistener to the replay button
document.getElementById('replay').addEventListener('click', replay);

// when the user click on the replay button, call replay function to 
// clear out the game board, reset the game name, and remove the alert 
// message box.
function replay() {
  // clear out the gameboard
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove("win");
    boxes[i].innerHTML = "";       
    turn.style.fontSize = "40px";
  }
  // display the game name
  turn.innerHTML = "Tic Tac Toe";      
  // reset count back to zero
  X_or_O = 0;
  // use jquery to remove the previous alert element.
  $("#liveAlertPlaceholder").empty();
  // rebind the click event to all the boxes
  $(".box").bind( "click", boxEventHandler);

}

