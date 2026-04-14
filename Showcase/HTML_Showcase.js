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
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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


document.querySelectorAll(".code-source").forEach((el, index) => {

    const rawCode = el.innerHTML;
    const escapedCode = escapeHTML(cleanIdentations(rawCode));
    
    const showResultBlock = el.dataset.resultblock !== "false"; // true unless explicitly set to "false"
    const language = el.dataset.language || "html";             // chosen one or "html" if undefined
    let resultHTML = "";

    if(showResultBlock) {
        switch (language) {
            case "html": {
                resultHTML = `
                    <div class="resultBlock">
                        ${rawCode}
                    </div>
                `;
                break;
                }
            case "css": {
                const previewClass = `css-preview-${index}`;

                resultHTML = `
                    <div class="resultBlock">
                        <div class="${previewClass}">
                            <p>Preview Text</p>
                            <button>Button</button>
                            <div class="box">Box</div>
                        </div>
                        <style>
                            .${previewClass} ${rawCode}
                        </style>
                    </div>
                `;
                break;
                }
            case "javascript": {
                resultHTML = `
                    <div class="resultBlock">
                        <button class="run-js-btn-${index}">Run JS</button>
                        <div class="js-output-${index}"></div>
                    </div>
                `;
                break;
                }
            default: {
                console.warn("Unexpected language var (not even defaulted to html)");
                break;
                }
                
        }
    }

    el.innerHTML = `
        <div class="codeBlock">
            <pre><code class="language-${language}">${escapedCode}</code></pre>
        </div>
        ${resultHTML}
    `;

    if (showResultBlock && language === "javascript") {
        const button = el.querySelector(".run-js-btn-" + index);
        const output = el.querySelector(".js-output-" + index);

        button.addEventListener("click", () => {
            try {
                output.innerHTML = "";

                const runCode = new Function("output", rawCode);
                runCode(output);

            } catch (error) {
                output.textContent = "Error: " + error.message;
            }
        });
    }

})