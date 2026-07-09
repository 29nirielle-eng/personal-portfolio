const helloButton = document.getElementById("helloButton");
const message = document.getElementById("message");

helloButton.addEventListener("click", function () {
  message.textContent = "Hello! Welcome to my portfolio page.";
});

const loadProjectButton = document.getElementById("loadProjectButton");

loadProjectButton.addEventListener("click", function () {
  loadProjectButton.textContent = "Loading Project...";
  const projectUrl = "http://localhost:5173";
  const taskCommandUrl = "command:workbench.action.tasks.runTask?%5B%22Start%20International%20Sports%20Explorer%22%5D";

  if (window.location.protocol === "vscode-webview:" || window.location.protocol === "vscode-file:") {
    try {
      window.location.href = taskCommandUrl;
    } catch (error) {
      console.warn("Unable to launch the VS Code task automatically.", error);
    }
  }

  setTimeout(() => {
    try {
      window.open(projectUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.warn("Unable to open the project automatically.", error);
      loadProjectButton.textContent = "Open project manually";
    }
  }, 2000);
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


let count = 0;
const counter = document.getElementById("counter")
const add = document.getElementById("add")
add.addEventListener("click", function() {

count++;
counter.textContent = count;

});


const quotes = ["'Life is roblox'", "'Another one'", "'what?'", "'ay'"];
const quoteAuthors = ["-DJ Khalid", "-DJ Khalid", "-DJ Khalid", "-Bad Bunny"];
const text1 = document.getElementById("rotating-text1");
const text2 = document.getElementById("rotating-text2");

let index = 0;

function showNextWord() {
  text1.classList.add("fade-out");
  text2.classList.add("fade-out");

  setTimeout(() => {
    text1.textContent = quotes[index];
    text1.classList.remove("fade-out");
    text2.textContent = quoteAuthors[index];
    text2.classList.remove("fade-out");
    index = (index + 1) % quotes.length;
  }, 600);
}

showNextWord();
setInterval(showNextWord, 5000);


const downloadButton = document.getElementById("downloadButton");

downloadButton.addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = "resume.txt";
  link.download = "resume.txt";
  link.click();
});