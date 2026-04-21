const keyElement  = document.getElementById("key");
const codeElement = document.getElementById("code");
const boxElement  = document.getElementById("box");

document.addEventListener("keydown", (e) => {
    keyElement.textContent = `Key: ${e.key}`;    //Changes the content of <p id="key">
    codeElement.textContent = `Code: ${e.code}`;  //Changes the content of <p id="code">

    //visuals:
    boxElement.classList.add("active");

});

document.addEventListener("keyup", (e) => {
    boxElement.classList.remove("active");
});