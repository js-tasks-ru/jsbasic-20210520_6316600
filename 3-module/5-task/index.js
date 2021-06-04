function getMinMax(str) {
  let arra = str.split(",").join(" ").split(" ");
  let newArr = [];
  arra.forEach((item) => {
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
