const display = document.querySelector(".display");

display.textContent = "";

const numbers = document.querySelectorAll(".number");

numbers.forEach((number) =>{
    number.addEventListener("click", () => {
        display.textContent = display.textContent.concat(number.textContent);
        if(operationTracker){
            operationTracker = false;
        }
    });
});

const operations = document.querySelectorAll(".operation");
let pointTracker = false;
let operationTracker = false;

operations.forEach((operation) =>{
    operation.addEventListener("click", () => {
        if(operationTracker == false){
            display.textContent = display.textContent.concat(operation.textContent);
            operationTracker = true;
        }
        else{
            display.textContent = display.textContent.slice(0, -3);
            display.textContent = display.textContent.concat(operation.textContent);

        }

        if(pointTracker){
            pointTracker = false;
        }
    });
});

const point = document.getElementById("point");

point.addEventListener("click", ()=>{
    if(pointTracker == false)
    display.textContent = display.textContent.concat(point.textContent);
    pointTracker = true;
});

const clear = document.getElementById("clear");

clear.addEventListener("click", ()=>{
    display.textContent = "";
});

const backspace = document.getElementById("backspace");

backspace.addEventListener("click", ()=>{
    if(operationTracker){
        display.textContent = display.textContent.slice(0, -3);
        operationTracker = false;
    }
    else{
        display.textContent = display.textContent.slice(0, -1);
        if(display.textContent.slice(-1) == " "){
            operationTracker = true;
        }
    }
});


const equal = document.getElementById("equal");

equal.addEventListener("click", ()=>{
    Calculate();
});

function Calculate(){
    numbers = display.textContent.split(" * ");
    console.log(numbers);
}
