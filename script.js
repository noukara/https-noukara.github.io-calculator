function append(value) {
  let display = document.getElementById("display");
  display.value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
  decimalUsed = false; // 小数点の利用フラグをリセット
}

function deleteLast() {
  let display = document.getElementById("display");
  let val = display.value;
  // 最後が小数点ならフラグ戻す
  if (val.slice(-1) === ".") {
    decimalUsed = false;
  }
  display.value = val.slice(0, -1);
}

function appendDecimal() {
  if (!decimalUsed) {
    document.getElementById("display").value += ".";
    decimalUsed = true;
  }
}

function calculate() {
  let display = document.getElementById("display");
  let expression = display.value;
  // 表示用の ÷ と × を JS用の / と * に変換
  expression = expression.replace(/÷/g, "/").replace(/×/g, "*");
  try {
    display.value = eval(expression);
  } catch {
    alert("Error");
  }
  decimalUsed = false;
}

// 小数点を1回に制限するフラグ
let decimalUsed = false;
