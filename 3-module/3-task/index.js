function camelize(str) {
  let arr = str.split("");
  let newStr;
  arr.forEach((element, index) => {
    element == "-"
      ? arr.splice(index, 1) | arr.splice(index, 1, arr[index].toUpperCase())
      : false;
  });
  return (newStr = arr.join(""));
}
