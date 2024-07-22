//Global Variables
let currentColour = "black";
let currentBrush = "brush"; // brush, rgb, shader, bucket,  eraser
let isMouseDown = false;

//DOM variables

const canvasBoard = document.querySelector('.canvas-board');
const gridSizeSlider = document.querySelector("#grid-size");
const gridSizeOutput = document.querySelector("#grid-size-output");
const toggleGridLinesCheckbox = document.querySelector("#toggle-gridlines-checkbox");
const colourPicker = document.querySelector("#colour-picker");

const toggleBrushBtn = document.querySelector("#brush-btn");
const toggleShaderBtn = document.querySelector("#shader-btn");
const toggleRgbBtn = document.querySelector("#rgb-btn");
const toggleBucketBtn = document.querySelector("#bucket-btn");
const toggleEraserBtn = document.querySelector("#eraser-btn");
const clearAllBtn = document.querySelector("#clear-all-btn")

gridSizeOutput.innerText = gridSizeSlider.value;

function startUp() {

    createBoardGrids(16);

    //set up controls

    canvasBoard.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        colourGrid(e.target, e.target.style.backgroundColor);
    
    });

    document.body.addEventListener("mouseup",() => {
        isMouseDown = false;
    });
    
    //pick colour 
    colourPicker.addEventListener("input", (e) => {
        currentColour=e.target.value;
    });

    //paint
    toggleBrushBtn.addEventListener("click", (e) => {
        currentBrush = "brush";
        e.target.style.backgroundColor = "green";

        toggleRgbBtn.style.backgroundColor = "#EFEFEF";
        toggleEraserBtn.style.backgroundColor = "#EFEFEF";
        toggleShaderBtn.style.backgroundColor = "#EFEFEF";
        toggleBucketBtn.style.backgroundColor = "#EFEFEF";

    })

    //bucket
    toggleBucketBtn.addEventListener("click", (e) => {
        currentBrush = "bucket";
        e.target.style.backgroundColor = "green";

        toggleRgbBtn.style,backgroundColor = "#EFEFEF";
        toggleBrushBtn.style.backgroundColor = "#EFEFEF";
        toggleShaderBtn.style.backgroundColor = "#EFEFEF";
        toggleEraserBtn.style.backgroundColor = "#EFEFEF";
        
    })

    //erase
    toggleEraserBtn.addEventListener("click", (e) => {
        currentBrush = "eraser";
        e.target.style.backgroundColor = "green";

        toggleRgbBtn.style,backgroundColor = "#EFEFEF";
        toggleBrushBtn.style.backgroundColor = "#EFEFEF";
        toggleShaderBtn.style.backgroundColor = "#EFEFEF";
        toggleBucketBtn.style.backgroundColor = "#EFEFEF";
    })

    //clear all
    clearAllBtn.addEventListener("click", () => createBoardGrids(gridSizeSlider.value));

    //grid slider
    gridSizeSlider.addEventListener("input", () => {
        let size = gridSizeSlider.value;
        gridSizeOutput.innerText = size;
        createBoardGrids(size);
} );

}

function colourGrid(grid, currentGridColour) {

    //brush
    if (currentBrush === "brush") {
        if (isMouseDown && (currentGridColour !== grid.style.backgroundColor || grid.style.backgroundColor === "")) {
            grid.style.backgroundColor = currentColour;
        }

    }

    //erase
    if(currentBrush === "eraser") {
        if(isMouseDown && currentGridColour !== "") {
            grid.style.backgroundColor = "";
        }
    }

    //bucket
    if(currentBrush === "bucket") {
        if(isMouseDown) {
            document.querySelectorAll(".row").forEach(() => {
                document.querySelectorAll(".grid").forEach((grid) => {
                    grid.style.backgroundColor = currentColour;
                })
            })
        }
    }    

    //rgb

    //shader
}

function createBoardGrids(size) {
    clearBoard();
    for(let i=0; i < size; i++) {
        const newRow = document.createElement("div");
        for(let j=0; j < size; j++) {
            const newGrid = document.createElement('div');
            newGrid.classList.add('grid');
            //paint targetted grid on mouse down
            newGrid.addEventListener("mouseover", (e) => {
                colourGrid(e.target, e.target.style.backgroundColor);
            })
                
            newRow.append(newGrid);
            
        }
        newRow.classList.add("row");
        canvasBoard.append(newRow);
    }
    checkToggleGridLines();
}


function clearBoard() {
    document.querySelectorAll('.row').forEach((row) => {
        row.querySelectorAll(".grid").forEach((grid) => {
            grid.remove();
        })
        row.remove();
    })
}

toggleGridLinesCheckbox.addEventListener("change", () => checkToggleGridLines());

function checkToggleGridLines() {
    if(toggleGridLinesCheckbox.checked) {
        document.querySelectorAll('.row').forEach(() => {
            document.querySelectorAll(".grid").forEach((grid) => {
                grid.style.border = "1px solid gray";
            })
        })
    }
    else {
        document.querySelectorAll('.row').forEach(() => {
            document.querySelectorAll(".grid").forEach((grid) => {
                grid.style.border = "none";
            })
        })
    }
}

startUp();