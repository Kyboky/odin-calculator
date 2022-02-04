class Calculator {
    constructor(calculatorScreen, screenEquationRow, screenResultRow, buttons){
        this.calculatorScreen = calculatorScreen;
        this.screenExpressionRow = screenEquationRow;
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
            this.screenExpressionRow.innerHTML += String.fromCharCode(parseInt(inputString));
        }
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
            console.log("Racunam :D");
            this.screenResultRow.innerHTML="= Neznam :P";
        }
    }

    buttonClick(button){
        console.log(button.attributes["data-keycode"]);
        switch(button.attributes["data-keycode"].value){
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
                const pressedButton = button.attributes["data-keycode"].value;
                if (pressedButton >= 48 && pressedButton <= 57 || pressedButton == 42 || pressedButton == 43 || pressedButton == 44 || pressedButton == 47 || pressedButton == 45){
                    this.expressionConcatinate(pressedButton);
                }
        }
    }
}

window.addEventListener('keypress', buttonClick);

function buttonClick(event){
    console.log(event.keyCode);
}

const calculatorScreen = document.querySelector(".calculator-screen");
const screenEquationRow = document.getElementById("first-row");
const screenResultRow = document.getElementById("second-row");
const buttons = document.querySelectorAll("button");

let calc = new Calculator(calculatorScreen, screenEquationRow, screenResultRow, buttons);
calc.calculatorOff();