function getMinMax(str) {
  let arr = str.split(",").join(" ").split(" ");
  let newArr = [];
  arr.forEach((item) => {
    if (parseInt(item)) {
      newArr.push(parseFloat(item));
    }
  });
  let result = {
    min: Math.min(...newArr),
    max: Math.max(...newArr),
  };
  return result;
}
