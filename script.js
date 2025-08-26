const operators = ['+', '-', '*', '/', '×', '÷'];
let decimalUsed = false; // 小数点を使ったか
let resultShown = false; // 結果が出たか

function append(value) {
  const display = document.getElementById("display");
  const lastChar = display.value.slice(-1);

  // 結果表示直後の入力制限
  if (resultShown && !(operators.includes(value) || value === 'C')) return;

  // 何も入力されていないときに.の入力を禁止
  if (display.value === '' && (operators.includes(value) || value === '.')) {
      return;
  }

  // 小数点は数字の後にだけ入力可能にする
  if (value === '.') {
    if (display.value === '' || operators.includes(lastChar)) return;
    if (lastChar >= '0' && lastChar <= '9' && !decimalUsed) {
        display.value += value;
        decimalUsed = true;
    }
    return;
  }

  // 演算記号が重複していたら追加しない
  if (operators.includes(value)) {
    if (operators.includes(lastChar) || lastChar === '') return;
    decimalUsed = false; // 演算子入力で小数点フラグをリセット
    display.value += value;
    resultShown = false; // 演算子入力でresultShownをリセット
    return;
  }
  
  // "("を演算子の後にだけ許可
  if (value === '(') {
    if (display.value === '' || operators.includes(lastChar)) {
      display.value += value;
    }
    return;
  }

  // ")"を数字の後及び"("がすでに入力されているときだけ許可
  if (value === ')') {
    const openCount = (display.value.match(/\(/g) || []).length;
    const closeCount = (display.value.match(/\)/g) || []).length;
    if (lastChar >= '0' && lastChar <= '9' && openCount > closeCount) {
      display.value += value;
    }
    return;
  }
  
  display.value += value;
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.value = "";
  decimalUsed = false; // 小数点の利用フラグをリセット 
  resultShown = false;
}

function deleteLast() {
  const display = document.getElementById("display");
  // 最後が小数点ならフラグ戻す 
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
  const lastChar = expression.slice(-1);

  if (expression === '') return;

  // 演算子直後に=を押すと無効
  if (operators.includes(lastChar)) return;

  // 括弧の数が合わない場合はエラーを表示
  const openCount = (expression.match(/\(/g) || []).length;
  const closeCount = (expression.match(/\)/g) || []).length;
  if (openCount !== closeCount) {
    alert("Error: 括弧の対応が正しくありません");
    return;
  }
  
  // 表示の×と÷を*と/に変換 
  expression = expression.replace(/÷/g, "/").replace(/×/g, "*");
  try {
    display.value = eval(expression);
    resultShown = true;
  } catch {
    alert("Error");
  }
}
