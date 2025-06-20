function drawLabel(params, canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background gradient or solid
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, params.bg1);
    bgGrad.addColorStop(1, params.bg2);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // border
    const borderGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    borderGrad.addColorStop(0, params.border1);
    borderGrad.addColorStop(1, params.border2);
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // text
    const textGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    textGrad.addColorStop(0, params.text1);
    textGrad.addColorStop(1, params.text2);
    ctx.fillStyle = textGrad;
    ctx.font = 'bold 56px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const strokeGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    strokeGrad.addColorStop(0, params.stroke1);
    strokeGrad.addColorStop(1, params.stroke2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = strokeGrad;
    ctx.strokeText(params.text, canvas.width / 2, canvas.height / 2);
    ctx.fillText(params.text, canvas.width / 2, canvas.height / 2);
}

function getParams() {
    return {
        text: document.getElementById('labelText').value || '默认',
        text1: document.getElementById('textColor1').value,
        text2: document.getElementById('textColor2').value,
        stroke1: document.getElementById('textStroke1').value,
        stroke2: document.getElementById('textStroke2').value,
        bg1: document.getElementById('bgColor1').value,
        bg2: document.getElementById('bgColor2').value,
        border1: document.getElementById('borderColor1').value,
        border2: document.getElementById('borderColor2').value,
    };
}

function updatePreview() {
    drawLabel(getParams(), document.getElementById('preview'));
}

function saveTemplate() {
    const templates = JSON.parse(localStorage.getItem('labelTemplates') || '[]');
    const params = getParams();
    templates.push(params);
    localStorage.setItem('labelTemplates', JSON.stringify(templates));
    loadTemplates();
}

function loadTemplates() {
    const list = document.getElementById('templates');
    list.innerHTML = '';
    const templates = JSON.parse(localStorage.getItem('labelTemplates') || '[]');
    templates.forEach((t, index) => {
        const item = document.createElement('div');
        item.className = 'template-item';
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 78;
        drawLabel(t, canvas);
        const btn = document.createElement('button');
        btn.textContent = '使用';
        btn.onclick = () => {
            document.getElementById('labelText').value = t.text;
            document.getElementById('textColor1').value = t.text1;
            document.getElementById('textColor2').value = t.text2;
            document.getElementById('textStroke1').value = t.stroke1;
            document.getElementById('textStroke2').value = t.stroke2;
            document.getElementById('bgColor1').value = t.bg1;
            document.getElementById('bgColor2').value = t.bg2;
            document.getElementById('borderColor1').value = t.border1;
            document.getElementById('borderColor2').value = t.border2;
            updatePreview();
        };
        item.appendChild(canvas);
        item.appendChild(document.createElement('br'));
        item.appendChild(btn);
        list.appendChild(item);
    });
}

function downloadImage() {
    const canvas = document.getElementById('preview');
    const link = document.createElement('a');
    link.download = 'label.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

document.querySelectorAll('#controls input').forEach(input => {
    input.addEventListener('input', updatePreview);
});

document.getElementById('saveTemplate').addEventListener('click', saveTemplate);
document.getElementById('downloadImage').addEventListener('click', downloadImage);

loadTemplates();
updatePreview();
