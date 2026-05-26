function sayHi() {
    alert("Hello from Example 1!");
}

function multiplyParagraph(n){
    // ToDo:
    // 1 - DONE - find desired paragraph
    // 2 - DONE -  add "n" number of new paragraphs under it and include their "i" serial number
    // 3 - DONE -  give them id-s "paragraph-i" (using "i")
    // 4 - DONE -  use CSS to pain the 2nd element in red

    var originalParagraph = document.getElementById("paragraph").innerHTML;

    for (let i = 0; i < n; i++) {
        newText = i + " - " + originalParagraph;

        const newParagraph = document.createElement("p");
        newParagraph.textContent = newText;
        newParagraph.id = "paragraph-" + i;
        
        paragraphList = document.getElementById("paragraphList");
        paragraphList.appendChild(newParagraph);
    }



}