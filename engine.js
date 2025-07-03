// handle for gridContainer
const gridContainer = document.querySelector(".grid-container");

// access CSS and change the --squares-per-side
let style = getComputedStyle(gridContainer)
let squaresPerSide = style.getPropertyValue('--squares-per-side').trim();

console.log(squaresPerSide); // "16" - default size is 16x16 in CSS

// prompts user for size of the grid 
function getSquaresPerSide() {
    squaresPerSide = parseInt(prompt("Size of the new grid:"));
    console.log(squaresPerSide);

    if (squaresPerSide > 64) {
        alert("Maximum size is 64");
        squaresPerSide = 64;
    } else if (squaresPerSide === null || squaresPerSide === "" || isNaN(squaresPerSide)) {
        squaresPerSide = 16;
        console.log("error is null || '' || isNaN");
    } else if (squaresPerSide > 0 && squaresPerSide < 65) {
        console.log("normal");
    }

    gridContainer.style.setProperty('--squares-per-side', squaresPerSide);
    return squaresPerSide;
}

// creates squares in gridContainer
function newSquares() {
    squaresPerSide = getSquaresPerSide();
    console.log(squaresPerSide); // test

    // Clear existing squares first
    gridContainer.innerHTML = '';

    let divSquare = 0;
    for (let i = 1; i <= squaresPerSide * squaresPerSide; i++) {
        divSquare = document.createElement("div");
        divSquare.classList.add("grid-square");
        gridContainer.appendChild(divSquare);
    }
    // Reattach event listeners to new squares
    attachHoverListeners();
}

//  -non grid on page load, only after click new grid btn
for (let i = 1; i <= squaresPerSide * squaresPerSide; i++) {
    const divSquare = document.createElement("div");
    divSquare.classList.add("grid-square");
    gridContainer.appendChild(divSquare);
}
attachHoverListeners();

// newSquares();

// adds hover effect on new grids created with a button
function attachHoverListeners() {
    const currentGridSquares = document.querySelectorAll(".grid-square");
    currentGridSquares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            square.setAttribute("style", "background: grey;")
        });
    });
}

function reset() {
    const currentGridSquares = document.querySelectorAll(".grid-square");
    currentGridSquares.forEach((square) => 
        square.setAttribute("style", "background: white;"));
}

// Buttons
const btnNewGrid = document.querySelector(".new-grid");
const btnReset = document.querySelector(".reset");


// Button callback
function onUserChoice(callback) {
    btnNewGrid.addEventListener("click", () => callback("NewGrid"));
    btnReset.addEventListener("click", () => callback("Reset"));
}

// Calling for callback
onUserChoice((choice) => {
    if (choice === "Reset") {
        reset();
    } else if (choice === "NewGrid") {
        newSquares();
    }
});

