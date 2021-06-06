function makeFriendsList(friends) {
  let UliLast = document.createElement("ul");
  for (let key of friends) {
    UliLast.innerHTML += `<li>${key.firstName} ${key.lastName}</li>`;
  }
  return UliLast;
}
