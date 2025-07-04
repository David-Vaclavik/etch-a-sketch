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

//  Default grid on page load
for (let i = 1; i <= squaresPerSide * squaresPerSide; i++) {
    const divSquare = document.createElement("div");
    divSquare.classList.add("grid-square");
    gridContainer.appendChild(divSquare);
}
attachHoverListeners();

// Enables Rainbow function
let rainbowMode = false;
// let randomColor = (Math.floor(Math.random() * 360));
let resetValue = 0;

// adds hover effect on new grids created with a button
function attachHoverListeners() {
    const currentGridSquares = document.querySelectorAll(".grid-square");
    currentGridSquares.forEach((square) => {
        let randomColor = (Math.floor(Math.random() * 360));
        let opacity = 0.1;
        square.addEventListener("mouseover", () => {
            if (rainbowMode === false) {
                square.setAttribute("style", `background: black; opacity: ${opacity};`);
            } else if (rainbowMode) {
                square.setAttribute("style", `background: hsl(${randomColor}, 100%, 50%);`);
            }

            // checks opacity value and increases opacity by 0.1
            const computedStyle = window.getComputedStyle(square);
            const currentOpacity = parseFloat(computedStyle.getPropertyValue("opacity"));
            if (currentOpacity < 1) {
                opacity += 0.1;
            }
        });
    });
}

// function getRainbow() {
//     console.log(Math.floor(Math.random() * 360));
//     return Math.floor(Math.random())
// }


function reset() {
    const currentGridSquares = document.querySelectorAll(".grid-square");
    currentGridSquares.forEach((square) => 
        square.setAttribute("style", "background: white; opacity: 1"));
    resetValue = 1;
    // This resets opacity
    attachHoverListeners();
}

// Buttons selector
const btnNewGrid = document.querySelector(".new-grid");
const btnReset = document.querySelector(".reset");
const btnRainbow = document.querySelector(".rainbow");

// Button callback
function onUserChoice(callback) {
    btnNewGrid.addEventListener("click", () => callback("NewGrid"));
    btnReset.addEventListener("click", () => callback("Reset"));
    btnRainbow.addEventListener("click", () => callback("Rainbow"));
}

// Calling for callback
onUserChoice((choice) => {
    if (choice === "Reset") {
        reset();
    } else if (choice === "NewGrid") {
        newSquares();
    } else if (choice === "Rainbow") {
        rainbowMode = !rainbowMode;
        if (rainbowMode) {
            btnRainbow.classList.add("active");
        } else if (rainbowMode === false) {
            btnRainbow.classList.remove("active");
        }
        // getRainbow();
    }
});

