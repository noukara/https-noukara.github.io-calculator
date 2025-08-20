function append(value) {
  const display = document.getElementById("display");
  const lastChar = display.value.slice(-1);

  // 演算記号が重複していたら追加しない
  const operators = ['+', '-', '*', '/', '×', '÷'];
  if (operators.includes(value)) {
    if (operators.includes(lastChar)) {
      return;
    }
  }
  display.value += value;
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.value = "";
  decimalUsed = false; // 小数点の利用フラグをリセット 
}

function deleteLast() {
  const display = document.getElementById("display");
  // 最後が小数点ならフラグをリセット 
  if (display.value.slice(-1) === ".") {
    decimalUsed = false;
  }
  display.value = display.value.slice(0, -1);
}

function appendDecimal() {
  if (!decimalUsed) {
    document.getElementById("display").value += ".";
    decimalUsed = true;
  }
}

function calculate() {
  const display = document.getElementById("display");
  let expression = display.value;
  // 表示の×と÷を*と/に変換 
  expression = expression.replace(/÷/g, "/").replace(/×/g, "*");
  try {
    display.value = eval(expression);
  } catch {
    alert("Error");
  }
  decimalUsed = false;
}

// 小数点を1回に制限するフラグを作成 
let decimalUsed = false;
