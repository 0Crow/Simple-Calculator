let on = false;  
let lastCalculated = false; 

function appendValue(value) { //stores and display expressions
    if (!on) return; 

    const expression = document.getElementById("expression");
    const maxLength = 12;
    const operators = ['+', '-', '*', '/', '%'];
    const displayMap = { '*': '×', '/': '÷', '%': '%' };

    if (lastCalculated) { //checks if lastCalculated exist.
        if (operators.includes(value)) {
            expression.textContent = document.getElementById("display").textContent;
        } else {
            expression.textContent = "";
            document.getElementById("display").textContent = "";
        }
        lastCalculated = false;
    }

    if (expression.textContent === "0" && !operators.includes(value)) { //checks if expression is null.
        expression.textContent = value;
        return;
    }

    if (expression.textContent.length < maxLength) { //checks if expression reached maximum length.
        expression.textContent += value in displayMap ? displayMap[value] : value;
    } else {
        alert("Maximum input length reached");
    }
}

function backspace() { //function for deleting expression, one by one
    if (!on || lastCalculated) return;

    const expression = document.getElementById("expression");
    expression.textContent = expression.textContent.slice(0, -1); //delete the last input of the user.

    if (expression.textContent === "") { //checks if the expression is null and it displays zero.
        expression.textContent = "0";
    }
}

function calculate() { //calculate the expression.
    if (!on) return;

    const expression = document.getElementById("expression");
    const output = document.getElementById("display");

    try {
        let evalExpression = expression.textContent
            .replace(/×/g, '*') //replace user friendly expression. This enable je to solve the expression.
            .replace(/÷/g, '/'); //same here.

        output.textContent = eval(evalExpression); //solves the expression.
        lastCalculated = true;
    } catch {
        output.textContent = "0"; 
        lastCalculated = true;
    }
}

function clearDisplay() { //clear all input by the user.
    const expression = document.getElementById("expression");
    const output = document.getElementById("display");

    expression.textContent = "0"; //change input into zero.
    output.textContent = "";
    lastCalculated = false;
}

function offCalcu(value) { //check ang change if the user click on or off the calculator.
    const outputColor = document.getElementById("output-displayer");

    if (value) { //if user clicks on button
        outputColor.style.backgroundColor = "#93a300"; 
        on = true;
    } else { //if user clicks off button
        outputColor.style.backgroundColor = "black";   
        on = false;
        clearDisplay();
    }
}

window.addEventListener('DOMContentLoaded', () => { //prepares everything before any action occurs.
    const expression = document.getElementById("expression");
    const output = document.getElementById("display");
    expression.textContent = "0";
    output.textContent = "";
    document.getElementById("output-displayer").style.backgroundColor = "black";
});

