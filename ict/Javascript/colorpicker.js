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
