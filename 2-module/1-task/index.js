function sumSalary(salaries) {
  let sum = 0;
  Object.values(salaries).map((item) => isFinite(item) ? (sum += item) : false);
  return sum;
}
