let operator = "";
let prevStore = "";
let currStore = "";

document.addEventListener("DOMContentLoaded", function () {
  const clear = document.querySelector(".clear");
  const equal = document.querySelector(".equal");
  const decimal = document.querySelector(".decimal");

  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");

  const previous = document.querySelector(".topBar");
  const current = document.querySelector(".bottomBar");
  
  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      current.textContent = currStore;
    })
  );
  
  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOperator(e.target.textContent);
      previous.textContent = prevStore + " " + operator;
      current.textContent = currStore;
    })
  );
  
  clear.addEventListener("click", function () {
    prevStore = "";
    currStore = "";
    operator = "";
    previous.textContent = currStore;
    current.textContent = currStore;
  });
  
  equal.addEventListener("click", function () {
    calculate();
    previous.textContent = "";
    if (prevStore.length <= 5) {
      current.textContent = prevStore;
    } else {
      current.textContent = prevStore.slice(0, 5) + "...";
    }
    current.textContent = prevStore;
  });

  decimal.addEventListener("click", function () {
    putDecimal();
    current.textContent += ".";
  });
});

function handleNumber(num) {
  if (currStore.length <= 5) {
    currStore += num;
  }
}

function handleOperator(op) {
  operator = op;
  prevStore = currStore;
  currStore = "";
}

function calculate() {
  //Typecasting
  prevStore = Number(prevStore); 
  currStore = Number(currStore);

  //Calculator Logic
  if (operator === "+") prevStore += currStore;
  else if (operator === "-") prevStore -= currStore;
  else if (operator === "x") prevStore *= currStore;
  else if (operator === "/" && currStore)
    prevStore /= currStore; //Avoids Zero Division Error
  else console.log("Wrong input");

  console.log(prevStore);
  prevStore = prevStore.toString();
  currStore = currStore.toString();
}

function putDecimal() {
  if (!currStore.includes(".")) {
    currStore += ".";
  }
}
