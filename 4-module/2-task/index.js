function makeDiagonalRed(table) {
  for (let key of table.rows) {
    key.cells[key.rowIndex].style.backgroundColor = "red";
  }
}
