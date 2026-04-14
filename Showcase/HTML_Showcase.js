// Prism lib, adds language-htall <code> class:
// To be removed! - what if you want to add css/js style?
document.querySelectorAll("code:not([class])").forEach(element => {
    element.classList.add("language-html");
    console.log("this runs");
})



// HTML code to HTML-friendly text:
function escapeHTML(str) {
    return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Ident code-source to <pre> ready code-source (using Loops)
function cleanIdentationsLoops(str){
    const splitLines = str.split("\n");
    const lines = [];

    // Remove empty lines
    for (let i = 0; i < splitLines.length; i++){
        if(splitLines[i].trim() !== ""){
            lines.push(splitLines[i]);
        }
    }

    // Find smallest identation
    let minIdent = Infinity;

    for(let i = 0; i < lines.length; i++){
        const match = lines[i].match(/^\s*/);
        const ident = match[0].length;

        if(ident < minIdent) {
            minIdent = ident;
        }
    }

    // Remove smallest ident from every line
    lines.forEach((el, i) => {
        lines[i] = el.slice(minIdent);
    });

    // Join the lines together and return
    return lines.join("\n");
}

// Ident code-source to <pre> ready code-source
function cleanIdentations(str){
    // trim and split str into lines
    const lines = str.split("\n").filter(line => line.trim() !== "");;

    // find smallest identation
    const minIdent = Math.min(
        ...lines.map(line => line.match(/^\s*/)[0].length)
    );

    //remove the identations from every line and output the joined lines as a string
    return lines.map(line => line.slice(minIdent)).join("\n");
}

document.querySelectorAll(".code-source").forEach(el => {
    const rawHTML = el.innerHTML;
    const textHTML = cleanIdentationsLoops(escapeHTML(rawHTML));

    const codeBlock = `
    <div class="codeBlock">
        <pre><code class="language-html">${textHTML}</code></pre>
    </div>
        <div class="resultBlock">${rawHTML}</div>
    `;

    el.innerHTML = codeBlock;
})