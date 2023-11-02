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
  if (!file) alert("Please select a file to upload.");
  return;
}

const formData = new FormData();
formData.append("file", file);

fetch("http://127.0.0.1:5000/upload", {
  method: "POST",
  body: formData,
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((data) => {
        throw new Error(data.error);
      });
    }
  })
  .then((data) => {
    alert(`Picture uploaded successfully. Filename: ${data.filename}`);
    // Display the uploaded image
    uploadedLogo.src = URL.createObjectURL(file);
  })
  .catch((error) => {
    alert(`Error: ${error.message}`);
    console.error("An error occurred:", error);
  });

function toggleNavbar() {
  var popupBox = document.getElementById("popupBox");
  popupBox.style.display =
    popupBox.style.display === "block" ? "none" : "block";
}
