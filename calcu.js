let on = false;  
let lastCalculated = false; 

function appendValue(value) {
    if (!on) return; 

    const expression = document.getElementById("expression");
    const maxLength = 12;
    const operators = ['+', '-', '*', '/', '%'];
    const displayMap = { '*': '×', '/': '÷', '%': '%' };

    if (lastCalculated) {
        if (operators.includes(value)) {
            expression.textContent = document.getElementById("display").textContent;
        } else {
            expression.textContent = "";
            document.getElementById("display").textContent = "";
        }
        lastCalculated = false;
    }

    if (expression.textContent === "0" && !operators.includes(value)) {
        expression.textContent = value;
        return;
    }

    if (expression.textContent.length < maxLength) {
        expression.textContent += value in displayMap ? displayMap[value] : value;
    } else {
        alert("Maximum input length reached");
    }
}

function backspace() {
    if (!on || lastCalculated) return;

    const expression = document.getElementById("expression");
    expression.textContent = expression.textContent.slice(0, -1);

    if (expression.textContent === "") {
        expression.textContent = "0";
    }
}

function calculate() {
    if (!on) return;

    const expression = document.getElementById("expression");
    const output = document.getElementById("display");

    try {
        let evalExpression = expression.textContent
            .replace(/×/g, '*')
            .replace(/÷/g, '/');

        output.textContent = eval(evalExpression);
        lastCalculated = true;
    } catch {
        output.textContent = "0";
        lastCalculated = true;
    }
}

function clearDisplay() {
    const expression = document.getElementById("expression");
    const output = document.getElementById("display");

    expression.textContent = "0";
    output.textContent = "";
    lastCalculated = false;
}

function offCalcu(value) {
    const outputColor = document.getElementById("output-displayer");

    if (value) {
        outputColor.style.backgroundColor = "#93a300"; 
        on = true;
    } else {
        outputColor.style.backgroundColor = "black";   
        on = false;
        clearDisplay();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const expression = document.getElementById("expression");
    const output = document.getElementById("display");
    expression.textContent = "0";
    output.textContent = "";
    document.getElementById("output-displayer").style.backgroundColor = "black";
});
