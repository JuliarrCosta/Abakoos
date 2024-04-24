let previewContainer = document.querySelector('.products-preview');
let previewBox = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.columns .product-card').forEach(product => {
    product.onclick = () => {
        previewContainer.style.display = 'flex';
        let name = product.getAttribute('data-name');
        previewBox.forEach(preview => {
            let target = preview.getAttribute('data-target');
            if (name === target) {
                preview.classList.add('active');
            } else {
                preview.classList.remove('active');
            }
        });
    };
});

previewBox.forEach(close => {
    close.querySelector('.close').onclick = () => {
        close.classList.remove('active');
        previewContainer.style.display = 'none';
    };
});
