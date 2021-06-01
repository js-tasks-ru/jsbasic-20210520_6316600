function showSalary(users, age) {
  let userAge = users.filter((item) => item.age <= age);
  let str = userAge.map((item) => item.name + ', ' + item.balance).join('\n');
  return str;
}
