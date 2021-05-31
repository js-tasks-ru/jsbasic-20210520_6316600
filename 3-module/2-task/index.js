let filterArr = [];
function filterRange(arr, a, b) {
  arr.forEach((element) => {
    b >= element >= a ? filterArr.push(element) : false;
  });
  return filterArr;
}
