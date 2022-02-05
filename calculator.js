class Calculator {
    constructor(calculatorScreen, screenExpressionRow, expressionContainer, screenResultRow, buttons){
        this.calculatorScreen = calculatorScreen;
        this.screenExpressionRow = screenExpressionRow;
        this.expressionContainer = expressionContainer;
        this.screenResultRow = screenResultRow;
        this.buttons = buttons;
        this.isTurnedOn = false;
        buttons.forEach(button => {
            button.addEventListener('click', this.buttonClick.bind(this, button));
        });
    }
    calculatorOff (){
        this.isTurnedOn = false;
        console.log(this.calculatorScreen);
        this.calculatorScreen.classList.add("screen-off");
        this.screenExpressionRow.innerHTML="";
        this.screenResultRow.innerHTML="";
    }

    calculatorOn (){
        this.isTurnedOn = true;
        console.log(this.calculatorScreen);
        this.calculatorScreen.classList.remove("screen-off");
    }

    expressionConcatinate(inputString){
        if(this.isTurnedOn){
            if (inputString == 44) {
                this.screenExpressionRow.innerHTML += ".";
            } else{
                this.screenExpressionRow.innerHTML += String.fromCharCode(parseInt(inputString));
            }  
            this.expressionContainer.scrollLeft += this.expressionContainer.scrollWidth;
        }
        this.screenResultRow.innerHTML="";
    }

    clear(){
        this.screenExpressionRow.innerHTML="";
        this.screenResultRow.innerHTML="";
    }

    backspace(){
        this.screenResultRow.innerHTML="";
        this.screenExpressionRow.innerHTML = this.screenExpressionRow.innerHTML.slice(0, -1);
    }

    evaluateExpression(){
        if(this.isTurnedOn){
        
            const operators = ["+", "-", "*", "/"];
            let operatorsIndexes = [];
            let expression = this.screenExpressionRow.innerHTML;
            for (let i = 0; i < expression.length; i++){
                if (operators.indexOf(expression[i]) != -1){
                    operatorsIndexes.push([i,expression[i]]);
                }
            }
            let numbers = [];
            let firstfield = 0;
            operatorsIndexes.forEach(operatorIndexPair => {
                numbers.push(expression.slice(firstfield,operatorIndexPair[0]));
                firstfield = operatorIndexPair[0] + 1;
            });
            numbers.push(expression.slice(firstfield));
            let expressionOperators = operatorsIndexes.map(x => x[1]);
            console.log("Razdvojeni");
            console.log(numbers);
            console.log(expressionOperators);
            let divisionIndex, multiplicationIndex, additionIndex, subtractionIndex;
            do{
                console.log(numbers);
                console.log(expressionOperators);
                divisionIndex = expressionOperators.indexOf("/");
                multiplicationIndex = expressionOperators.indexOf("*");
                if ( divisionIndex == -1 && multiplicationIndex != -1){
                    const result = this.multiply(numbers[multiplicationIndex],numbers[multiplicationIndex+1]);
                    expressionOperators.splice(multiplicationIndex, 1);
                    numbers[multiplicationIndex] = result;
                    numbers.splice(multiplicationIndex + 1, 1);
                } else if(divisionIndex != -1 && multiplicationIndex == -1){
                    const result = this.divide(numbers[divisionIndex],numbers[divisionIndex+1]);
                    expressionOperators.splice(divisionIndex, 1);
                    numbers[divisionIndex] = result;
                    numbers.splice(divisionIndex+1, 1);
                } else if (divisionIndex < multiplicationIndex){
                    const result = this.divide(numbers[divisionIndex],numbers[divisionIndex+1]);
                    expressionOperators.splice(divisionIndex, 1);
                    numbers[divisionIndex] = result;
                    numbers.splice(divisionIndex+1, 1);
                } else if (divisionIndex > multiplicationIndex){
                    const result = this.multiply(numbers[multiplicationIndex],numbers[multiplicationIndex+1]);
                    expressionOperators.splice(multiplicationIndex, 1);
                    numbers[multiplicationIndex] = result;
                    numbers.splice(multiplicationIndex+1, 1);
                }
            } while(divisionIndex != -1 || multiplicationIndex != -1);

            do{
                additionIndex = expressionOperators.indexOf("+");
                subtractionIndex = expressionOperators.indexOf("-");
                if ( additionIndex == -1 && subtractionIndex != -1){
                    const result = this.subtract(numbers[subtractionIndex],numbers[subtractionIndex+1]);
                    expressionOperators.splice(subtractionIndex, 1);
                    numbers[subtractionIndex] = result;
                    numbers.splice(subtractionIndex + 1, 1);
                } else if(additionIndex != -1 && subtractionIndex == -1){
                    const result = this.add(numbers[additionIndex],numbers[additionIndex+1]);
                    expressionOperators.splice(additionIndex, 1);
                    numbers[additionIndex] = result;
                    numbers.splice(additionIndex+1, 1);
                } else if (additionIndex < subtractionIndex){
                    const result = this.add(numbers[additionIndex],numbers[additionIndex+1]);
                    expressionOperators.splice(additionIndex, 1);
                    numbers[additionIndex] = result;
                    numbers.splice(additionIndex+1, 1);
                } else if (additionIndex > subtractionIndex){
                    const result = this.subtract(numbers[subtractionIndex],numbers[subtractionIndex+1]);
                    expressionOperators.splice(subtractionIndex, 1);
                    numbers[subtractionIndex] = result;
                    numbers.splice(subtractionIndex+1, 1);
                }
            } while(additionIndex != -1 || subtractionIndex != -1);
            console.log("Number = " + numbers);
            this.screenResultRow.innerHTML = `= ${this.formatNumber(numbers[0])}`; 
        }
    }

    add(a,b){
        return parseFloat(a)+parseFloat(b);
    }
    subtract(a,b){
        return parseFloat(a)-parseFloat(b);
    }
    multiply(a,b){
        return parseFloat(a)*parseFloat(b);
    }
    divide(a,b){
        return parseFloat(a)/parseFloat(b);
    }

    formatNumber(number){
        const fieldLength = 8;
        number = number.toString();
        if (number.length < fieldLength) return number;
        const decimalPlace = number.indexOf(".");
        if (decimalPlace == -1 || decimalPlace > fieldLength){
            return Number.parseFloat(number).toExponential(5);
        }
        return number.slice(0,fieldLength)
    }

    buttonClick(button){
        let buttonKeyCode;
        if (button instanceof KeyboardEvent){
            buttonKeyCode = button.keyCode.toString();
        } else {
            buttonKeyCode = button.attributes["data-keycode"].value;
        }
        
        switch(buttonKeyCode){
            case "97": 
                this.calculatorOn();
                break;
            case "115": 
                this.calculatorOff();
                break;
            case "100":
                this.backspace();
                break;
            case "102":
                this.clear();
                break;
            case "13":
                this.evaluateExpression();
                break;
            default:
                if (buttonKeyCode >= 48 && buttonKeyCode <= 57 || buttonKeyCode == 42 || buttonKeyCode == 43 || buttonKeyCode == 44 || buttonKeyCode == 46 || buttonKeyCode == 47 || buttonKeyCode == 45){
                    this.expressionConcatinate(buttonKeyCode);
                }
        }
    }
}

const calculatorScreen = document.querySelector(".calculator-screen");
const screenExpressionRow = document.getElementById("first-row");
const screenResultRow = document.getElementById("second-row");
const buttons = document.querySelectorAll("button");
const expressionContainer = document.getElementById("expression-container");
let calc = new Calculator(calculatorScreen, screenExpressionRow, expressionContainer, screenResultRow, buttons);

window.addEventListener('keypress', calc.buttonClick.bind(calc));

calc.calculatorOff();