const popupBtn = document.getElementById('popupBtn');
const popupBox = document.getElementById('popupBox');

popupBtn.addEventListener('click', () => {
    if (popupBox.style.display === 'block') {
        popupBox.style.display = 'none';
    } else {
        popupBox.style.display = 'block';
    }
});