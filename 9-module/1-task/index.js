export default function promiseClick(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener(
      "click",
      (event) => {
        resolve(event);
      },
      { once: true }
    );
  });
}
let button = document.createElement('button');
promiseClick(button).then((event) => console.log(event));

