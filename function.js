const display = document.querySelector(".display");

display.textContent = "";

document.addEventListener("keydown", function(e) {
    console.log(e.key)
    numberKeys(e);
    operationKeys(e);
    backspaceKey(e);
    enterKey(e);
});
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
    const re = /\s.\s/g;
    let numbers = display.textContent.split(re);
    const re2 = /\W(?=\s)/g;
    let operators = display.textContent.match(re2);

    // console.log(numbers);
    // console.log(operators);

    

    // for(let i = 0; numbers.length; i++){
    //     numbers[i] = Number(numbers[i]);
    // }
    multiply(numbers, operators);
    divide(numbers, operators);
    minus(numbers, operators);
    plus(numbers, operators);
    display.textContent = Number(numbers[0]).toFixed(2).toString();
    // console.log(numbers, operators);
}

function multiply(numbers, operators){
    let flag = true;
    while(flag){
        let index = operators.indexOf("*");
        // console.log(index);
        if(index != -1){
            operators.splice(index, 1);
            numbers[index] = (Number(numbers[index]) * Number(numbers[index +1])).toString();
            // console.log(numbers);
            // console.log(operators);
            numbers.splice((index+1), 1);
        }
        else{
            flag = false;
        }
    }
}

function divide(numbers, operators){
    let flag = true;
    while(flag){
        let index = operators.indexOf("/");
        // console.log(index);
        if(index != -1){
            operators.splice(index, 1);
            numbers[index] = (Number(numbers[index]) / Number(numbers[index +1])).toString();
            // console.log(numbers);
            // console.log(operators);
            numbers.splice((index+1), 1);
        }
        else{
            flag = false;
        }
    }
}

function minus(numbers, operators){
    let flag = true;
    while(flag){
        let index = operators.indexOf("-");
        // console.log(index);
        if(index != -1){
            operators.splice(index, 1);
            numbers[index] = (Number(numbers[index]) - Number(numbers[index +1])).toString();
            // console.log(numbers);
            // console.log(operators);
            numbers.splice((index+1), 1);
        }
        else{
            flag = false;
        }
    }
}

function plus(numbers, operators){
    let flag = true;
    while(flag){
        let index = operators.indexOf("+");
        // console.log(index);
        if(index != -1){
            operators.splice(index, 1);
            numbers[index] = (Number(numbers[index]) + Number(numbers[index +1])).toString();
            // console.log(numbers);
            // console.log(operators);
            numbers.splice((index+1), 1);
        }
        else{
            flag = false;
        }
    }
}

function numberKeys(e){
    if(Number(e.key) >= 0 && Number(e.key) <= 9){
        display.textContent = display.textContent.concat(e.key);
        if(operationTracker){
            operationTracker = false;
        }
    }
}

function operationKeys(e){
    if(e.key == "/" || e.key == "*" || e.key == "+" || e.key == "-"){
        let toAdd = " " + e.key + " ";
        console.log(toAdd);
        if(operationTracker == false){
            display.textContent = display.textContent.concat(toAdd);
            operationTracker = true;
        }
        else{
            display.textContent = display.textContent.slice(0, -3);
            display.textContent = display.textContent.concat(toAdd);
        }

        if(pointTracker){
            pointTracker = false;
        }
    }
}

function backspaceKey(e){
    if(e.code == "Backspace"){
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
    }
}

function enterKey(e){
    if(e.key == "Enter"){
        Calculate();
    }
}