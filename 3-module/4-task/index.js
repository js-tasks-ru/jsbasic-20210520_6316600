function showSalary(users, age) {
  let useAge = users.filter((item) => item.age <= age);
  let str = useAge.map((item) => item.name + ', ' + item.balance).join('\n');
  return str;
}
