// Prism lib, adds language-htall <code> class:
// To be removed! - what if you want to add css/js style?
document.querySelectorAll("code:not([class])").forEach(element => {
    element.classList.add("language-html");
})



// HTML code to HTML-friendly text:
function escapeHTML(str) {
    return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "&#10;");
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
    // BIG HEADSCRATCH HAPPENED HERE:
    const rawCode = el.innerHTML;
    // use .textContent instead of .innerHTML
    // because otherwise the browser would reconstruct the attributes 
    // between the <> brackets going on 1 line
    // fixed with this:
    const rawCodeText = el.textContent;

    const escapedCode = escapeHTML(cleanIdentations(rawCode));
    
    const showResult = el.dataset.result !== "false";   // true unless explicitly set to "false"
    const language = el.dataset.language || "html";     // chosen one or "html" if undefined
    const title = el.dataset.title || "";
    let resultTitle = "";
    let resultHTML = "";
    let codeBoxStyle = "";


    if(showResult) {
        switch (language) {
            case "html": {
                resultHTML = `
                    <div class="code-result">
                        ${rawCode}
                    </div>
                `;
                break;
                }
            case "css": {
                const previewClass = `css-preview-${index}`;

                resultHTML = `
                    <div class="code-result">
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
                    <div class="code-result">
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

    if(title !== "") {
        resultTitle = `
            <div class="code-title">
                <span>${title}</span>
            </div>
        `;
    }

    if(resultHTML !== "") {
       codeBoxStyle = "border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;";
    }
    if(resultTitle !== ""){
        codeBoxStyle += " border-top-left-radius: 0px;";
    }

    
    el.innerHTML = `
            ${resultTitle || ''}
            <div class="code-box" style = "${codeBoxStyle}">
                <pre><code class="language-${language}">${escapedCode}</code></pre>
            </div>
            ${resultHTML || ''}
    `.trim();

    if (showResult && language === "javascript") {
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


function buttonSimpleForm() {
    const text = document.getElementById("6-simple-form-text");
    const check = document.getElementById("6-simple-form-checkbox");

    alert("Submitted!\nName: " + text.value + "\nRemember me: " + check.checked);

}


const dragItem = document.getElementById('box1');
const dropZone = document.getElementById('drop');

dragItem.addEventListener('dragstart', (e) => { // e = event object
    e.dataTransfer.setData('text/plain', dragItem.id);
    // dataTransfer = data that travels with the drag
    // 'text/plain' = type of data (just text)
    // dragItem.id = what we store (so we know what was dragged later)

    // 'text/plain'   // normal text (most common ✅)
    // 'text/html'    // HTML content
    // 'text/uri-list'// URLs
});

dragItem.addEventListener('dragend', () => {
});

// === Drop Zone Events ===
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // REQUIRED - allows dropping (browser blocks it by default)
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover'); // e.g. for visual feedback (CSS class)
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault(); // again - stops browser default (like opening files, etc.)
    dropZone.classList.remove('dragover'); // remove that same visual feedback

    const id = e.dataTransfer.getData('text/plain'); // get the stored data from dragstart
    const draggedElement = document.getElementById(id);

    if (draggedElement) { // checks if it exists
        // Option 1: show the text instead of moving the element
        dropZone.innerHTML = 'Dropped: ' + draggedElement.textContent;
        // Option 2: move the element inside drop zone
        // dropZone.appendChild(draggedElement);
    }
});


document.getElementById("test-btn-1").addEventListener("click", () => {
    alert("Hello from JavaScript!"); 
});


// =========================
// MOUSE EVENTS
// =========================

"click"        // mouse click (most common)
"dblclick"     // double click (with mouse)
"mousedown"    // mouse button pressed down
"mouseup"      // mouse button released
"mousemove"    // mouse moving
"mouseenter"   // mouse enters element (no bubbling)
"mouseleave"   // mouse leaves element (no bubbling)
"mouseover"    // mouse enters (bubbles)
"mouseout"     // mouse leaves (bubbles)

// =========================
// KEYBOARD EVENTS
// =========================

"keydown"      // key pressed (recommended)
"keyup"        // key released - fires for all keys (including Shift, Ctrl, etc)
"keypress"     // older, avoid - fires for characters only

// =========================
// INPUT / FORM EVENTS
// =========================

"input"        // fires on every change (typing, etc.)
"change"       // fires when change is finished (blur or enter)
"focus"        // element gains focus
"blur"         // element loses focus
"submit"       // form submitted
"reset"        // form reset

// =========================
// DRAG & DROP EVENTS
// =========================

"dragstart"    // start dragging
"drag"         // while dragging
"dragend"      // drag finished
"dragover"     // dragged item over target (needs preventDefault)
"dragleave"    // leaves drop zone
"drop"         // dropped on target

// =========================
// WINDOW / DOCUMENT EVENTS
// =========================

"DOMContentLoaded" // HTML loaded (safe to access DOM)
"load"             // everything loaded (images too)
"resize"           // window resized
"scroll"           // page scroll

// =========================
// TOUCH EVENTS (mobile)
// =========================

"touchstart"   // finger touches screen
"touchmove"    // finger moves
"touchend"     // finger lifted

// =========================
// INLINE HTML VERSIONS
// =========================

onclick=""        // click handler in HTML
ondblclick=""     // double click
oninput=""        // typing input
onchange=""       // change finished
onfocus=""        // focus gained
onblur=""         // focus lost
onsubmit=""       // form submit
onreset=""        // form reset
onkeydown=""      // key down
onkeyup=""        // key up
onmouseenter=""   // mouse enters
onmouseleave=""   // mouse leaves
ondragstart=""    // drag starts
ondragover=""     // drag over (needs preventDefault)
ondrop=""         // drop happens
onload=""         // element/page loaded

// =========================
// KEY CONCEPTS
// =========================

// e (event object) → contains info about the event (target, key, mouse pos, etc.)
// e.target         → element that triggered the event
// e.preventDefault() → stops default browser behavior (e.g. form submit, drop blocking)
// e.dataTransfer   → storage used during drag & drop