const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const runBtn = document.getElementById('runBtn');
const preview = document.getElementById('preview');

function updatePreview() {
    const fullCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
${cssCode.value}
    </style>
</head>
<body>
${htmlCode.value}

<script>
${jsCode.value}
<\/script>
</body>
</html>`;

    const previewDoc = preview.contentDocument || preview.contentWindow.document;
    previewDoc.open();
    previewDoc.write(fullCode);
    previewDoc.close();
}

runBtn.addEventListener('click', updatePreview);
updatePreview();
