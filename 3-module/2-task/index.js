let arrTwo = [];
function filterRange(arr, a, b) {
  arr.forEach((element) => {
    b >= element >= a ? arrTwo.push(element) : false;
  });
  return arrTwo;
}
