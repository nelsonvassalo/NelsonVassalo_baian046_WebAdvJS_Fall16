document.addEventListener("DOMContentLoaded", function(event) {
    init();
  });

function init() {
	var outputValue,
		rate = 1.8,
		baseValue = 32,
		inputId = document.getElementById("fahrenheit"),
		outputId = document.getElementById("outputValue"),
		outputContainer = document.getElementsByClassName("output")[0],
		inputValue;


	inputId.addEventListener("keyup", function() {
		inputValue = inputId.value
		outputValue = Math.round(((inputValue - baseValue) / rate)*10)/10;
		outputContainer.style.display = "block";
		outputId.innerHTML = outputValue;
		
	})
}