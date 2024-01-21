// Assume the following data structure for districts and pincodes
var districtData = {
  state1: ["District 1", "District 2", "District 3"],
  state2: ["District A", "District B", "District C"],
};

var pincodeData = {
  " District 1": ["12345", "123458", "554354"],
  "District 2": ["67890", "36436", "463674", "6r6747"],
  "District 3": ["54321"],
  "District A": ["98765"],
  "District B": ["45678"],
  "District C": ["87654"],
};

function populateDistricts() {
  var stateSelect = document.getElementById("state");
  var districtSelect = document.getElementById("district");
  var selectedState = stateSelect.value;

  // Remove existing options
  while (districtSelect.options.length > 0) {
    districtSelect.remove(0);
  }

  if (selectedState !== "select") {
    var districts = districtData[selectedState];
    populateDropdown(districtSelect, districts);
  }
}

function populatePincode() {
  var districtSelect = document.getElementById("district");
  var pincodeSelect = document.getElementById("pincode");
  var selectedDistrict = districtSelect.value;

  while (pincodeSelect.options.length > 0) {
    pincodeSelect.remove(0);
  }
  // Populate pincode based on the selected district
  if (selectedDistrict !== "select") {
    var pincode = pincodeData[selectedDistrict];
    populatePincodeDropdown(pincodeSelect, pincode);
  }
}

function populateDropdown(select, options) {
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];
    select.add(option);
  }
}

function populatePincodeDropdown(select, options) {
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];
    select.add(option);
  }
}

// Add event listeners to call the functions when state and district selections change
document.getElementById("state").addEventListener("change", populateDistricts);
document.getElementById("district").addEventListener("change", populatePincode);
