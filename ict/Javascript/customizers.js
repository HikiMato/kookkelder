document.addEventListener("DOMContentLoaded", function() {
    const backgroundColorPickers = document.querySelectorAll('.bgcolor');
    const backgroundColorPicker = document.getElementById('backgroundColorPicker');
    
    const textColorPickers = document.querySelectorAll('.txtcolor');
    const textColorPicker = document.getElementById('textColorPicker');

    // Listen for background color changes
    backgroundColorPicker.addEventListener('input', handleBackgroundColorChange);

    // Listen for text color changes
    textColorPicker.addEventListener('input', handleTextColorChange);

    function handleBackgroundColorChange(event) {
        const backgroundColor = event.target.value;
        backgroundColorPickers.forEach(element => {
            element.style.backgroundColor = backgroundColor;
        });

        // Save the selected background color to local storage
        localStorage.setItem('selectedBackgroundColor', backgroundColor);
    }

    function handleTextColorChange(event) {
        const textColor = event.target.value;
        textColorPickers.forEach(element => {
            element.style.color = textColor;
        });

        // Save the selected text color to local storage
        localStorage.setItem('selectedTextColor', textColor);
    }

    const savedBackgroundColor = localStorage.getItem('selectedBackgroundColor') || '#008489';
    const savedTextColor = localStorage.getItem('selectedTextColor') || 'white';

    // Apply the saved colors
    backgroundColorPicker.value = savedBackgroundColor;
    textColorPicker.value = savedTextColor;
    handleBackgroundColorChange({ target: { value: savedBackgroundColor } }); // Apply initial background color
    handleTextColorChange({ target: { value: savedTextColor } }); // Apply initial text color
});

window.onload = function() {
    var savedLogo = localStorage.getItem('uploadedLogo');
    if (savedLogo) {
        document.getElementById('uploaded-logo').src = savedLogo;
    }
};

function displayLogo() {
    var logo = document.getElementById('uploaded-logo');
    var input = document.getElementById('logo-upload');
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Set logo source to the data URL
            logo.src = e.target.result;

            // Save data URL to local storage
            localStorage.setItem('uploadedLogo', e.target.result);
        }
        reader.readAsDataURL(file);
    }
}
