// Create a webpage with a 16x16 grid of square divs.
// Create the divs using JavaScript. 
// Don’t try to create them by hand by copying and pasting them in your HTML file!
//      -Use Flexbox to make the divs appear as a grid 16x16 of squares



const gridContainer = document.querySelector(".grid-container");

for (let i = 1; i <= 16 * 16; i++) {
    const divSquare = document.createElement("div");
    divSquare.textContent = i;
    // divSquare.setAttribute("style", "background: white; border: 1px solid red; color: red;");
    divSquare.classList.add("grid-square");
    gridContainer.appendChild(divSquare);
}


