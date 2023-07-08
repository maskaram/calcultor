const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')
const currentoperator = document.querySelector('[data-current-operator]')
const result = document.querySelector('[data-result]')
let previousOperator=""

deleteButton.addEventListener('click',()=>{
 
let text=currentOperand.innerText
currentOperand.innerText = text.slice(0, text.length - 1);

})

allClearButton.addEventListener('click', () => {
  previousOperand.innerText = "0"
  currentOperand.innerText = ""
  previousOperator.innerText = ""
  previousOperator= ""
  currentoperator.innerText = ""
})

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const number = button.innerText
    //[..] or [1.2.3]
    if (number === ('.') && currentOperand.innerText.includes('.')) {return}
    //[some result ] [num]
    else if (currentoperator.innerText === "" && previousOperand.innerText != "0") {
      previousOperand.innerText = "0"
      currentOperand.innerText = currentOperand.innerText + number;
    }else{
      currentOperand.innerText = currentOperand.innerText + number;
    }
    
  })
})

const compute = (operator) => {
  const prev = parseFloat(previousOperand.innerText)
  const current = parseFloat(currentOperand.innerText)
  let result;
  switch (operator) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '/':
      result = prev / current
      break
    case 'xy':
      result = Math.pow(prev, current)
      break
    default:
      return
  }
  previousOperand.innerText = result
  currentOperand.innerText = ""
  result.innerText = result
}

operationButtons.forEach(operation => {
  operation.addEventListener('click', () => {
    // [-] [any] => any key except - need to be deactive cause they have no interpretations eg[-5+]
    if (previousOperand.innerText === '0' && currentOperand.innerText === '' && previousOperator === "" && operation.innerText === "-") {
      previousOperand.innerText = 0
      compute(previousOperator)
    } 
    //[-][num][any] eg[- 12 +]
    else if (previousOperand.innerText === '0' && currentOperand.innerText != '' && previousOperator === "-" ) {
      previousOperand.innerText = 0
      compute(previousOperator)
    } 
    // [any except - ] or [.][any] eg[+] or [.+]
    else if (currentOperand.innerText === '' && operation.innerText != "-" &&(previousOperator === "-" && previousOperand.innerText === "0") || currentOperand.innerText === '.')  {
      return
    //[num][any] => [12+]
    } else if (previousOperand.innerText === '0') {
      previousOperand.innerText = currentOperand.innerText
      currentOperand.innerText = ""
    } 
    //[any][any] => operator need to be replaced eg [12+-]
    else if (currentOperand.innerText === "") {
      previousOperator = operation.innerText
    }
    else {
        compute(previousOperator)
    }
    currentoperator.innerText = operation.innerText
    previousOperator = operation.innerText
  })
})

equalsButton.addEventListener('click', () => {
  //[-][=]
  if(previousOperator==="-" && previousOperand.innerText==="0" && currentOperand.innerText==="") {
    return
  }
  //[num][any][=]
    else if(previousOperand.innerText !="0" && currentOperand.innerText==="" && previousOperator !=""){
    return
  }
  else{
    compute(previousOperator)
    previousOperator = ''
    currentoperator.innerText = ''
  }
})