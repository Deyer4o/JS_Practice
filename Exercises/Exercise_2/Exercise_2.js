///////////////////////////
// Main init: loading json:
///////////////////////////
let codeMap = {};
let pageState = {
    lastTheme: "theme-dark",
    lastRow: 0,
    lastColumn: 0
};
let grid = buildGrid();
let row = 0;
let column = 0;

function init() {
    loadPageState();
    changeTheme(pageState.lastTheme);
    updateSelection();
    loadKeyBindings();
    
    // add transitions for smooth animation only after the load and updates:
    setTimeout( () => {
        const elementsNoAnimation = document.querySelectorAll(".box, .main");
        elementsNoAnimation.forEach(el => {
            el.classList.add("smooth-transitions");
        });
    }, 200);
    
}

async function savePageState(style, column, row) {
    pageState.lastTheme = style;
    pageState.lastColumn = column;
    pageState.lastRow = row;

    localStorage.setItem('pageState', JSON.stringify(pageState));
    console.log("Saved to LocalStorage:", pageState);
}

async function loadPageState() {
    const savedData = localStorage.getItem("pageState");
    if(savedData) {
        pageState = JSON.parse(savedData);
        row = pageState.lastRow;
        column = pageState.lastColumn;
        changeTheme(pageState.lastTheme);
    }
}

async function loadKeyBindings() {
     try{
        // Fetch the local JSON file:
        const response = await fetch('./keyBindings.json');
        
        // Check if the file exists and is valid:
        if(!response.ok) throw new Error("Could not find JSON file in Init()");

        const data = await response.json();

        // Flatten data into codeMap (physical keys to actions "KeyW" = "up")

        for (let action in data) {
            data[action].forEach(item => {
                codeMap[item.code] = action;
            });
        }

        console.log("Controls loaded:", codeMap);

        // Start listening for keys only after data is ready:
        window.addEventListener('keydown', handleInput);

    }
    catch (error)
    {
        console.error("Error loading JSON: ", error);
    } 
}

////////////////
// Handle input:
////////////////
function handleInput(event) {
    const action = codeMap[event.code];

    if(action) {
        event.preventDefault(); // prevents default browser scrolling when pressing up/down
    
        console.log("Action triggered:", action);
        doAction(action);
    }
}

///////////////////////
// Selection logic:
///////////////////////
function buildGridV1() {
    const grid = [];
    const rows = [...document.getElementsByClassName("row")];
    
    rows.forEach(row => {
        // for each button - add it to the return with grid[row][column]
        const buttons = row.querySelectorAll('[id^="button-"]');
        grid.push(buttons);
    });
    return grid;
}

function buildGrid() { // returns a proper double-nested array
    return [...document.querySelectorAll(".row")].map(row =>
        [...row.querySelectorAll('[id^="button-"]')]
    );
}

// [id^="button-"] // starts with "button-"
// [id$="1"]       // ends with "1"
// [id*="button"]  // contains "button"

function updateSelection(){
    if (grid[row] && grid[row][column]) { //if the selected exists

        // Remove selection from all buttons
        grid.forEach(rowArray => {
            rowArray.forEach(button => {
                button.classList.remove("selected");
            });
        });
        // Add selection to current button
        grid[row][column].classList.add("selected");
        savePageState(pageState.lastTheme,column,row);

    }
    else {                                //if it doesn't exist
        row = 0;
        column = 0;
        console.log("Selection is out of bounds in updateSelection()!");
    }
}

function activateSelected(){
    // never assume, always do extra checks
    const selectedButton = grid[row]?.[column]; 
    if (!selectedButton) {
        console.log("Selection is out of bounds in activateSelected()!");
        return;
    }

    // visual feedback:
    selectedButton.classList.add("activated");
    setTimeout(() => {
        selectedButton.classList.remove("activated");
    }, 100);

    // action based on data-function:
    const action = selectedButton.dataset.function;

    switch (action) {
        case "say-hi":
            alert("Hello!");
            break;
        case "say-bye":
            alert("Goodbye!");
            break;
        case "theme-light":
        case "theme-dark":
            changeTheme(action);
            savePageState(action,column,row);
            break;
        default:
            console.log("No function assigned to action (" + action + ") in activateSelected()");
            break;
    }

}

function clampColumn(){
    //clamp column if new row is shorter:
    if (column >= grid[row].length) {
    column = grid[row].length - 1;
    }
}

function changeTheme(theme){
    switch (theme){
        case "theme-light":
            document.querySelectorAll(".box").forEach(box => {
                box.style.color = "black";
                box.style.borderColor = "black";
            });
            document.querySelectorAll(".main").forEach(main => {
                main.style.backgroundColor = "#cacaca";
            });
            break;
        case "theme-dark":
            document.querySelectorAll(".box").forEach(box => {
                box.style.color = "white";
                box.style.borderColor = "white";
            });
            document.querySelectorAll(".main").forEach(main => {
                main.style.backgroundColor = "#111";
            });
            break;
        default:
            console.log("Invalid Theme inside changeTheme(theme)!");
            break;
    }
}

function doAction(action){
    switch (action) {
        case "up":
            if(row > 0) {
                row--;
                clampColumn();
                updateSelection();
            }
            break;
        case "left":
            if (column > 0) {
                column--;
                updateSelection();
            }
            break;
        case "down":
            if (row < grid.length - 1) {
                row++;
                clampColumn();
                updateSelection();
            }
            break;
        case "right":
            if (column < grid[row].length - 1) {
                column++;
                updateSelection();
            }
            break;
        case "activate":
            activateSelected();
            break;
        default:
            console.log("Action that has not been handled in doAction()!");
            break;
    }
}

//Actually starts the asynch init function:
document.addEventListener("DOMContentLoaded", async () => {
    await init();
});


////////////////////////
// Corner Key Indicator:
////////////////////////

const keyElement  = document.getElementById("key");
const codeElement = document.getElementById("code");
const boxElement  = document.getElementById("box");

document.addEventListener("keydown", (e) => {
    keyElement.innerHTML = `Key:<br>${e.key}`;     //Changes the content of <p id="key">
    codeElement.innerHTML = `Code:<br>${e.code}`;  //Changes the content of <p id="code">

    //visuals:
    boxElement.classList.add("updated");

    // setTimeout(() => {
    //         box.classList.remove("updated");
    //     }, 100);
});

document.addEventListener("keyup", (e) => {
    boxElement.classList.remove("updated");
});