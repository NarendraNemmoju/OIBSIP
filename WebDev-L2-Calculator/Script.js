(function () {
  "use strict";

  const displayEl = document.getElementById("display");
  const historyEl = document.getElementById("history");
  const keys = document.querySelectorAll(".key");

  const MAX_DIGITS = 12;

  let current = "0";        // value currently shown
  let previous = null;      // stored operand
  let operator = null;      // pending operator symbol
  let overwrite = true;     // next digit should replace current display

  function updateDisplay() {
    displayEl.textContent = formatForDisplay(current);
    historyEl.textContent = previous !== null && operator
      ? `${formatForDisplay(previous)} ${operator}`
      : "\u00A0";

    keys.forEach((key) => {
      const isPendingOperator =
        key.dataset.action === "operator" && key.dataset.op === operator && overwrite;
      key.classList.toggle("is-active", isPendingOperator);
    });
  }

  function formatForDisplay(value) {
    if (value === "Error") return value;
    const num = Number(value);
    if (Number.isNaN(num)) return "0";

    const str = value.includes(".") ? value : String(num);
    if (str.replace(/[-.]/g, "").length > MAX_DIGITS) {
      return num.toExponential(5);
    }
    return str;
  }

  function inputDigit(digit) {
    if (current === "Error") {
      current = "0";
      overwrite = true;
    }
    if (overwrite) {
      current = digit === "0" ? "0" : digit;
      overwrite = false;
    } else {
      if (current.replace(/[-.]/g, "").length >= MAX_DIGITS) return;
      current = current === "0" ? digit : current + digit;
    }
  }

  function inputDecimal() {
    if (current === "Error") {
      current = "0";
      overwrite = false;
    }
    if (overwrite) {
      current = "0.";
      overwrite = false;
      return;
    }
    if (!current.includes(".")) {
      current += ".";
    }
  }

  function toggleSign() {
    if (current === "Error" || current === "0") return;
    current = current.startsWith("-") ? current.slice(1) : "-" + current;
  }

  function applyPercent() {
    if (current === "Error") return;
    const num = parseFloat(current);
    current = String(num / 100);
    overwrite = false;
  }

  function clearAll() {
    current = "0";
    previous = null;
    operator = null;
    overwrite = true;
  }

  function backspace() {
    if (current === "Error" || overwrite) {
      current = "0";
      overwrite = true;
      return;
    }
    current = current.length > 1 ? current.slice(0, -1) : "0";
    if (current === "-") current = "0";
  }

  function compute(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      default: return b;
    }
  }

  function chooseOperator(nextOp) {
    if (current === "Error") return;

    if (operator && !overwrite) {
      const result = compute(previous, parseFloat(current), operator);
      if (Number.isNaN(result)) {
        current = "Error";
        previous = null;
        operator = null;
        overwrite = true;
        return;
      }
      current = trimResult(result);
      previous = parseFloat(current);
    } else {
      previous = parseFloat(current);
    }

    operator = nextOp;
    overwrite = true;
  }

  function equals() {
    if (current === "Error" || operator === null || previous === null) return;
    const result = compute(previous, parseFloat(current), operator);
    if (Number.isNaN(result)) {
      current = "Error";
    } else {
      current = trimResult(result);
    }
    previous = null;
    operator = null;
    overwrite = true;
  }

  function trimResult(num) {
    const rounded = Math.round((num + Number.EPSILON) * 1e9) / 1e9;
    return String(rounded);
  }

  function handleAction(action, target) {
    switch (action) {
      case "number": inputDigit(target.dataset.num); break;
      case "decimal": inputDecimal(); break;
      case "sign": toggleSign(); break;
      case "percent": applyPercent(); break;
      case "clear": clearAll(); break;
      case "backspace": backspace(); break;
      case "operator": chooseOperator(target.dataset.op); break;
      case "equals": equals(); break;
    }
    updateDisplay();
  }

  keys.forEach((key) => {
    key.addEventListener("click", () => handleAction(key.dataset.action, key));
  });

  const keyMap = {
    "+": '[data-action="operator"][data-op="+"]',
    "-": '[data-action="operator"][data-op="−"]',
    "*": '[data-action="operator"][data-op="×"]',
    "/": '[data-action="operator"][data-op="÷"]',
    "Enter": '[data-action="equals"]',
    "=": '[data-action="equals"]',
    ".": '[data-action="decimal"]',
    "Backspace": '[data-action="backspace"]',
    "Escape": '[data-action="clear"]',
    "%": '[data-action="percent"]',
  };

  document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      handleAction("number", { dataset: { num: e.key } });
      flashKey(`[data-action="number"][data-num="${e.key}"]`);
      return;
    }
    const selector = keyMap[e.key];
    if (selector) {
      e.preventDefault();
      const el = document.querySelector(selector);
      if (el) {
        handleAction(el.dataset.action, el);
        flashKey(selector);
      }
    }
  });

  function flashKey(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.filter = "brightness(1.2)";
    setTimeout(() => (el.style.filter = ""), 100);
  }

  updateDisplay();
})();