function factorial(n) {
  let num = 1;
  for (let i = 0; i < n; i++) {
    num *= n - i;
  }
  return num;
}