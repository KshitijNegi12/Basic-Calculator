const display = document.getElementById('display');

function isSymbol(val){
    return '+-/*'.includes(val);
}

function prevDigit(){
    let st = display.value.length-1;
    while(st > 0 && !isSymbol(display.value[st])){
        st--;
    }
    let digit = display.value.slice(st);
    if(isSymbol(digit[0])){
        digit = digit.slice(1);
        st++;
    }
    return digit;
}

function appendValue(value) {
    const digit =  prevDigit();
    console.log(digit);
    
    const symbol = isSymbol(value);
    if(value == '.' && digit.includes('.')){
        return;
    }
    else if ((symbol && isSymbol(display.value[display.value.length-1])) || (digit.length && digit[0] == '0')){ 
        display.value = display.value.slice(0, display.value.length-1) + value;
    }    
    else{
        display.value += value;
    }   
    
}

function clearDisplay() {
    display.value = '0';
}

function backspace() {
    if(display.value === 'Error' || display.value.length == 1){
        clearDisplay();
    }
    else{
        display.value = display.value.slice(0, -1);
    }
}

function calculateResult() {
    try {
        const result = eval(display.value);
        if (result === Infinity || isNaN(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch {
        display.value = 'Error';
    }
}

document.addEventListener('keydown', (event) => {
    const regex = /^\d+$|^Backspace$|^Enter$|[+-]$|[*/.]$/;    
    if (regex.test(event.key)) {
        event.preventDefault();
        if (event.key === 'Enter') {
            calculateResult();
        } else if (event.key === 'Backspace') {
            backspace();
        } else if (event.key === '=') {
            calculateResult();
        } else {
            appendValue(event.key);
        }
    }
});

document.getElementsByClassName('buttons')[0].addEventListener('click', (e)=>{
    if(e.target.name){
        switch(e.target.name){
            case 'clear':
                clearDisplay();
                break;
            
            case 'backspace':
                backspace();
                break;
            
            case '=':
                calculateResult();
                break;
    
            default:
                appendValue(e.target.name);
                break;
        }
    }  
});