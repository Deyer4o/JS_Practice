      
        const playgrounds = document.querySelectorAll('.playground');

        playgrounds.forEach((playground) => {
            const htmlTextarea = playground.querySelector('.html-code');
            const cssTextarea = playground.querySelector('.css-code');
            const jsTextarea = playground.querySelector('.js-code');

            const htmlGroup = playground.querySelector('.html-group');
            const cssGroup = playground.querySelector('.css-group');
            const jsGroup = playground.querySelector('.js-group');

            const htmlToggle = playground.querySelector('.toggle-html');
            const cssToggle = playground.querySelector('.toggle-css');
            const jsToggle = playground.querySelector('.toggle-js');
            const autoToggle = playground.querySelector('.toggle-auto');

            const runBtn = playground.querySelector('.run-btn');
            const preview = playground.querySelector('.preview');

            function renderPreview() {
                const fullCode = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                ${cssTextarea.value}
                    </style>
                </head>
                <body>
                ${htmlTextarea.value}
                <script>
                ${jsTextarea.value}
                <\/script>
                </body>
                </html>
                `;

                preview.srcdoc = fullCode;
            }

            function updateVisibility() {
                htmlGroup.classList.toggle('hidden', !htmlToggle.checked);
                cssGroup.classList.toggle('hidden', !cssToggle.checked);
                jsGroup.classList.toggle('hidden', !jsToggle.checked);
            }

            function maybeAutoRender() {
                if (autoToggle.checked) {
                    renderPreview();
                }
            }

            htmlToggle.addEventListener('change', updateVisibility);
            cssToggle.addEventListener('change', updateVisibility);
            jsToggle.addEventListener('change', updateVisibility);

            htmlTextarea.addEventListener('input', maybeAutoRender);
            cssTextarea.addEventListener('input', maybeAutoRender);
            jsTextarea.addEventListener('input', maybeAutoRender);

            runBtn.addEventListener('click', renderPreview);

            updateVisibility();
            renderPreview();
        });

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

const textareas = document.querySelectorAll('textarea');

textareas.forEach((textarea) => {
    autoResize(textarea);

    textarea.addEventListener('input', () => {
        autoResize(textarea);
    });
});

