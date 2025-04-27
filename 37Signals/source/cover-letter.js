console.log("loaded cover-letter.js");

function generatePDF() {
    const element = document.getElementById('_cover-letter');
    const opt = {
        margin:       0,
        filename:     '_cover-letter.pdf',
        html2canvas:  { scale: 3 },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    replaceSvgCssVars(document.querySelector('#stack-overflow-logo'));
    html2pdf().set(opt).from(element).save();
}

function replaceSvgCssVars(element) {
    const svgs = element.querySelectorAll('svg *');

    svgs.forEach(el => {
        ['fill', 'stroke', 'color'].forEach(attr => {
            const val = el.getAttribute(attr);
            if (val && val.startsWith('var(')) {
                const cssVarName = val.slice(4, -1).trim();
                const realColor = getComputedStyle(el).getPropertyValue(cssVarName).trim();
                if (realColor) {
                    el.setAttribute(attr, realColor);
                }
            }
        });
    });
}