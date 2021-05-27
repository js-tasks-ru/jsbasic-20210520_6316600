let calculator = {
  read(firstNum, secondNum) {
    this.firstNum = firstNum;
    this.secondNum = secondNum;
  },
  sum() {
    return this.firstNum + this.secondNum;
  },
  mul() {
    return this.firstNum * this.secondNum;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
