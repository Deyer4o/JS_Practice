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

document.querySelectorAll(".code-source").forEach(el => {
    const rawHTML = el.innerHTML;
    const textHTML = escapeHTML(rawHTML);

    const codeBlock = `
    <div class="codeBlock">
        <pre><code class="language-html">${textHTML}</code></pre>
    </div>
        <div class="resultBlock">${rawHTML}</div>
    `;

    el.innerHTML = codeBlock;
})