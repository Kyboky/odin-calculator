class Calculator {
    constructor(calculatorScreen, screenEquationRow, screenResultRow, buttons){
        this.calculatorScreen = calculatorScreen;
        this.screenEquationRow = screenEquationRow;
        this.screenResultRow = screenResultRow;
        this.buttons = buttons;
        let that = this;
        buttons.forEach(button => {
            button.addEventListener('click', this.buttonClick.bind(this, button));
        });
    }
    calculatorOff (){
        this.isTurnedOn = false;
        console.log(this.calculatorScreen);
        this.calculatorScreen.classList.add("screen-off");
        this.screenEquationRow.innerHTML="";
        this.screenResultRow.innerHTML="";
    }

    calculatorOn (){
        this.isTurnedOn = false;
        console.log(this.calculatorScreen);
        this.calculatorScreen.classList.remove("screen-off");
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
            default:
                console.log("missing function");
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