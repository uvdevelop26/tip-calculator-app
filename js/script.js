//Areas to select elements
const calcArea = document.querySelector('.calculation-area');
const resutArea = document.querySelector('.result-container');
const btnArea = calcArea.querySelector('.btn-container');

//elements to be used
const inputData = calcArea.querySelectorAll('.input-tip');
const btnTips = btnArea.querySelectorAll('button');
const result = resutArea.querySelectorAll('.result');
const customTip = calcArea.querySelector('.custom-input')
const btnReset = resutArea.querySelector('.btn-reset');



//===============================Event Listener Areas===========================
window.addEventListener('load', cleanEverything); //reset after load 

inputData[0].addEventListener('input', validateBill); //validate first input

btnTips.forEach((item) => { //adding class to the selected tip (button)
    item.addEventListener('click', (e) => {
        let selected = e.target;
        selected.classList.toggle('light-cyan-button')
        let notSelected = btnArea.querySelectorAll("button:not(" + '#' + selected.id + ")")
        for (const elem of notSelected) {
            if (elem.classList.contains('light-cyan-button')) {
                elem.classList.remove('light-cyan-button');
            }
        }
    });
});

inputData[1].addEventListener('input', performOperations) //second input perform all the operations

btnReset.addEventListener('click', () => { //reset button config
    cleanEverything()

    if (btnReset.classList.contains('btn-enabled')) {
        btnReset.classList.remove('btn-enabled');
        btnReset.disabled = true;
    }
});


//========================functions area======================================

function cleanEverything() { //function reset the calculator
    inputData[0].value = '';
    inputData[1].value = '';
    customTip.value = '';
    result[0].innerHTML = '$0.00';
    result[1].innerHTML = '$0.00';

    btnTips.forEach(elem => {
        elem.value = '';
    })
}

function handeInputErrors(input, inputError) { //validate input errors
    let data = parseInt(input.value);

    if (data === 0) {
        input.blur();
        input.classList.add('error');
        inputError.innerHTML = "can't be zero"
    } else if (isNaN(data)) {
        input.blur();
        input.classList.add('error');
        inputError.innerHTML = "is not a number"
    } else if (!isNaN(data)) {
        inputError.innerHTML = ""

    }
}


function validateBill() { //validate first input

    const inputError = calcArea.querySelectorAll('.text-error')[0]

    handeInputErrors(inputData[0], inputError)
}

//performing final operations using the input event of the second input
function performOperations() {

    //validate second input 
    const inputError = calcArea.querySelectorAll('.text-error')[1]

    handeInputErrors(inputData[1], inputError)

    //get all the values to perform the operations
    let bill = parseInt(inputData[0].value);
    let people = parseInt(inputData[1].value);

    const getTipValue = () => {
        let tip = btnArea.querySelector('.light-cyan-button')
        const customTipValue = customTip.value;

        if (tip === null && customTipValue === '') {
            return 'error'
        } else if (tip === null && customTipValue !== '') {
            return parseInt(customTipValue)
        } else if (tip !== null && customTipValue === '') {
            let newTip = tip.innerHTML;
            return parseInt(newTip.replace('%', ''))
        } else if (tip !== null && customTipValue !== '') {
            return 'error'
        }
    }

    let tipValue = getTipValue()

    if (!isNaN(tipValue)) {
        btnReset.disabled = false;
        btnReset.classList.add('btn-enabled')
        let correctTip = (bill * tipValue) / 100
        let totalPeople = correctTip / people;
        result[0].innerHTML = '$' + correctTip;
        result[1].innerHTML = '$' + totalPeople.toFixed(2)
    }else if(isNaN(tipValue)){
        result[0].innerHTML = tipValue;
        result[1].innerHTML = tipValue   
    }

   


}
