let value1 = "";
let currentOperator = "";
let prevCurrentOperator = "";
let value2 = "";
let prevValue2 = "";
let display = "";
let reset = false;
const keyEls = document.querySelectorAll("#keys > div");
const inputEl = document.querySelector("#calculator > input");

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
    reset = true;
  } else if (value === "=") {
    if (value1 && currentOperator && value2) {
      let result = eval(`${value1}${currentOperator}${value2}`);
      prevValue2 = value2;
      prevCurrentOperator = currentOperator;
      display = result;
      value1 = result;
    } else if (!currentOperator) {
      currentOperator = prevCurrentOperator;
      value2 = prevValue2;
      let result = eval(`${value1}${currentOperator}${value2}`);
      display = result;
      value1 = result;
    }
    currentOperator = "";
    value2 = "";
    reset = true;
  } else if (!isNaN(value)) {
    if (reset) {
      value1 = "";
      display = "";
      reset = false;
    }
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

  inputEl.value = display;
};

keyEls.forEach((keyEl) => {
  keyEl.addEventListener("click", onKeyClick);
});
