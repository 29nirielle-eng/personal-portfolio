const helloButton = document.getElementById("helloButton");
const message = document.getElementById("message");

helloButton.addEventListener("click", function () {
  message.textContent = "Hello! Welcome to my portfolio page.";
});

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "Light Mode";
  } else {
    themeButton.textContent = "Dark Mode";
  }
});

const changeText = document.getElementById("changeText")
changeText.addEventListener("click", function() {

    if(changeText.textContent="Change Text"){
        changeText.textContent = "Text has changed!";
    }

});

let count = 0;
const counter = document.getElementById("counter")
const add = document.getElementById("add")
add.addEventListener("click", function() {

count++;
counter.textContent = count;

});



