const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';  // Menyimpan input pengguna
let lastResult = '';    // Menyimpan hasil terakhir

function updateDisplay() {
  display.value = currentInput || '0';
}

function calculate() {
  try {
    const sanitizedInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
    const result = eval(sanitizedInput);
    if (result === Infinity || isNaN(result)) {
      display.value = 'Error';
      currentInput = '';
    } else {
      display.value = result;
      currentInput = result.toString();
      lastResult = result;
    }
  } catch {
    display.value = 'Error';
    currentInput = '';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    const value = button.value;

    if (value === 'C') {
      currentInput = '';
      updateDisplay();
    } 
    else if (value === 'DEL') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    }
    else if (value === '=') {
      calculate();
    } 
    else {
      currentInput += value;
      updateDisplay();
    }
  });
});

document.addEventListener('keydown', e => {
  const key = e.key;

  if (!isNaN(key) || key === '.' || ['+', '-', '*', '/'].includes(key)) {
    currentInput += key;
    updateDisplay();
  } 
  else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } 
  else if (key === 'Enter' || key === '=') {
    calculate();
  } 
  else if (key.toLowerCase() === 'c') {
    currentInput = '';
    updateDisplay();
  }
});
