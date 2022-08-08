let value1 = "";
let currentOperator = "";
let value2 = "";
let display = "";
let reset = false;
const keyEls = document.querySelectorAll("#keys > div");
const inputEl = document.querySelector("#calculator > input");

const updateDisplay = () => {
  inputEl.value = display;
  console.log(`v1: ${value1}\nop: ${currentOperator}\nv2: ${value2}`);
};

const onKeyClick = (e) => {
  const value = e.target.innerText;

  if (value === "C") {
    display = "";
    value1 = "";
    currentOperator = "";
    value2 = "";
  } else if (value === "√") {
    let sqrt = Math.sqrt(+value1 || +value2);
    display = sqrt;
    value1 = sqrt;
    currentOperator = "";
    value2 = "";
  } else if (value === "=") {
    let result = eval(`${value1}${currentOperator}${value2}`);
    display = result;
    value1 = result;
    currentOperator = "";
    value2 = "";
    reset = true;
  } else if (!isNaN(value)) {
    if (reset) display = "";
    currentOperator ? (value2 += value) : (value1 += value);
    display += value;
  } else {
    if (reset) {
      value1 = display;
      reset = false;
    }
    if (currentOperator) {
      value1 = eval(`${value1}${currentOperator}${value2}`);
      value2 = "";
    }
    display = "";
    currentOperator = value;
  }

  updateDisplay();
};

keyEls.forEach((keyEl) => {
  keyEl.addEventListener("click", onKeyClick);
});
