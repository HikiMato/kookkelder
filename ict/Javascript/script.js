const testBtn = document.getElementById('testBtn');
const topbar = document.querySelector('.topbar');
const colorPicker = document.getElementById('colorPicker');
const textColorPicker = document.getElementById('textColorPicker');
const p = document.querySelector('.topbar > p');
const boxes = document.querySelectorAll('.box');
const suggestedBtn = document.querySelector('.suggestedbtn');
const popupBtn = document.querySelector('.hoverbtn');
const popupBtns = document.querySelectorAll('.popup-btn');
const popupBox = document.querySelector('.popup');
const colorpickers = document.querySelector('.color-pickers');
const label = document.querySelector('label');

// Load saved colors from localStorage or use default colors
const savedColor = localStorage.getItem('selectedColor') || '#008489';
const savedTextColor = localStorage.getItem('selectedTextColor') || 'white';

setColor(savedColor);
setTextColor(savedTextColor);

colorPicker.value = savedColor;
textColorPicker.value = savedTextColor;

colorPicker.addEventListener('input', handleColorChange);
textColorPicker.addEventListener('input', handleTextColorChange);

function handleColorChange(event) {
    const color = event.target.value;
    setColor(color);
    localStorage.setItem('selectedColor', color);
}

function handleTextColorChange(event) {
    const textColor = event.target.value;
    setTextColor(textColor);
    localStorage.setItem('selectedTextColor', textColor);
}

function setColor(color) {
    topbar.style.backgroundColor = color;
    p.style.backgroundColor = color;
    boxes.forEach(box => {
        box.style.backgroundColor = color;
    });
    suggestedBtn.style.backgroundColor = color;
    popupBtn.style.backgroundColor = color;
    popupBtns.forEach(popupBtn => {
        popupBtn.style.backgroundColor = color;
    });
    popupBox.style.backgroundColor = color;
    colorpickers.style.backgroundColor = color;
    label.style.backgroundColor = color;
}

function setTextColor(color) {
    p.style.color = color;
    boxes.forEach(box => {
        box.style.color = color;
    });
    suggestedBtn.style.color = color;
    popupBtn.style.color = color;
    popupBtns.forEach(popupBtn => {
        popupBtn.style.color = color;
    });
    popupBox.style.color = color;
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.style.color = color;
    });
}
popupBtn.addEventListener('click', () => {
    if (popupBox.style.display === 'block') {
        popupBox.style.display = 'none';
    } else {
        popupBox.style.display = 'block';
    }
});

// Function to call the /test route of your Flask API and show an alert
function testAPI() {
    fetch("http://127.0.0.1:5000/")
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Show an alert with the response from /test
        })
        .catch(error => console.error("Error testing API: ", error));
}

// Event listener for the "Test API" button (testBtn)
testBtn.addEventListener('click', testAPI);