//Areas to select elements
const calcArea = document.querySelector('.calculation-area');
const resutArea = document.querySelector('.result-container');
const btnArea = calcArea.querySelector('.btn-container');

//elements to be used
const inputData = calcArea.querySelectorAll('.input-tip');
const btnTips = btnArea.querySelectorAll('button');
const result = resutArea.querySelectorAll('.result');
const customTip = calcArea.querySelector('.custom-input')

//cleaning the inputs when load
window.addEventListener('load', ()=>{
    inputData[0].value = '';
    inputData[1].value = '';
    customTip.value = '';
});

//adding event listener to the elements that contains the values
inputData[0].addEventListener('input', validateBill);


btnTips.forEach((item) => {
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

inputData[1].addEventListener('input', performOperations)


function validateBill() {
    let bill = inputData[0].value;
    const inputError = calcArea.querySelectorAll('.text-error')[0];

    if (bill === '0') {
        inputData[0].blur();
        inputData[0].classList.add('error')
        inputError.innerHTML = "can't be zero"
    } else if (bill === '') {
        inputData[0].blur();
        inputData[0].classList.add('error')
        inputError.innerHTML = "can't be empty"
    } else {

        inputError.innerHTML = ""
    }
}

//performing final operations using the input event of the second input
function performOperations() {

    const inputError = calcArea.querySelectorAll('.text-error')[1];
    //both input data values
    let bill = parseInt(inputData[0].value);
    let people = parseInt(inputData[1].value);


    //get the value of the button or the custom element
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


    if (people === '0') {
        inputData[1].blur();
        inputData[1].classList.add('error')
        inputError.innerHTML = "can't be zero"
    } else if (people === '') {
        inputData[1].blur();
        inputData[1].classList.add('error')
        inputError.innerHTML = "can't be empty"
    } else {

        let tipValue = getTipValue();

        let correctTip = (bill * tipValue) / 100;
        let totalPeople = people * correctTip;

        result[0].innerHTML = '$' + correctTip;
        result[1].innerHTML = '$' + totalPeople
    }
}

