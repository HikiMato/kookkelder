document.addEventListener("DOMContentLoaded", function () {
  const backgroundColorPickers = document.querySelectorAll(".bgcolor");
  const backgroundColorPicker = document.getElementById(
    "backgroundColorPicker"
  );

  const textColorPickers = document.querySelectorAll(".txtcolor");
  const textColorPicker = document.getElementById("textColorPicker");

  // Listen for background color changes
  backgroundColorPicker.addEventListener("input", handleBackgroundColorChange);

  // Listen for text color changes
  textColorPicker.addEventListener("input", handleTextColorChange);

  function handleBackgroundColorChange(event) {
    const backgroundColor = event.target.value;
    backgroundColorPickers.forEach((element) => {
      element.style.backgroundColor = backgroundColor;
    });

    // Save the selected background color to local storage
    localStorage.setItem("selectedBackgroundColor", backgroundColor);
  }

  function handleTextColorChange(event) {
    const textColor = event.target.value;
    textColorPickers.forEach((element) => {
      element.style.color = textColor;
    });

    // Save the selected text color to local storage
    localStorage.setItem("selectedTextColor", textColor);
  }

  const savedBackgroundColor =
    localStorage.getItem("selectedBackgroundColor") || "#008489";
  const savedTextColor = localStorage.getItem("selectedTextColor") || "white";

  // Apply the saved colors
  backgroundColorPicker.value = savedBackgroundColor;
  textColorPicker.value = savedTextColor;
  handleBackgroundColorChange({ target: { value: savedBackgroundColor } }); // Apply initial background color
  handleTextColorChange({ target: { value: savedTextColor } }); // Apply initial text color
});

window.onload = function () {
  var savedLogo = localStorage.getItem("uploadedLogo");
  if (savedLogo) {
    document.getElementById("uploaded-logo").src = savedLogo;
  }
};

// Function to handle logo upload
function handleLogoUpload() {
  const fileInput = document.getElementById("logo-upload");
  const uploadedLogo = document.getElementById("uploaded-logo");

  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  // Display the uploaded image
  const reader = new FileReader();
  reader.onload = function (e) {
    uploadedLogo.src = e.target.result;
    // Save the selected image in local storage
    localStorage.setItem("uploadedImage", e.target.result);
  };

  reader.readAsDataURL(file);
}

// Check if there's a saved image in local storage and display it
document.addEventListener("DOMContentLoaded", function () {
  const savedImage = localStorage.getItem("uploadedImage");
  const uploadedLogo = document.getElementById("uploaded-logo");
  if (savedImage) {
    uploadedLogo.src = savedImage;
  }
});

function toggleNavbar() {
  var popupBox = document.getElementById("popupBox");
  popupBox.style.display =
    popupBox.style.display === "block" ? "none" : "block";
}
