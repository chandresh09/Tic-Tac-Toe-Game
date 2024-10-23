let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.querySelector(".new-btn");
let display = document.querySelector(".display");
let count = 0;

// Players turn
let turnO = true;

// Wining Patterns (one pattern should match to win game)
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Enable Boxes for Reset and Start New Game
const enableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Reset game or New game
const resetGame = ()=> {
    count = 0;
    turnO = true;
    enableBoxes();
    display.classList.add("hide");
};

// Change Value according to players trun
boxes.forEach((box)=> {
    box.addEventListener("click", ()=> {
        if(turnO) {
            box.innerText = "O";
            box.style.color = "red";
            turnO = false;
            count++;
        } else {
            box.innerText = "X";
            box.style.color = "#03f7a8";
            turnO = true;
            count++;
        }
        gameDraw(count);
        box.disabled = true;
        checkWinner();        
    })
})

// If Game Draws
const gameDraw = (count)=> {
    if(count == 9) {
        display.classList.remove("hide");
        display.innerText = `Game is Draw`;
    }
}

// Disable Boxes after displaying Winner
const disableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = true;
    }
};

// Display winner
const showWinner = (winner)=> {
    if(winner === "O") {
        winner = "Player 1";
    }
    else {
        winner = "Player 2";
    }
    display.innerText = `🎊 Congratulations 🎊 Winner is ${winner}`;
    display.classList.remove("hide");
    disableBoxes();
};

// Check winner
const checkWinner = ()=> {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos1Va2 = boxes[pattern[1]].innerText;
        let pos1Va3 = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos1Va2 != "" && pos1Va3 != "") {
            if(pos1Val === pos1Va2 && pos1Va2 === pos1Va3) {
                showWinner(pos1Val);
            }
        }
    }
};

// Reset and New Game Button
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);