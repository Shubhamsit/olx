const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
section1.style.display = "none";
section2.style.display = "none";
let datas;

const searchTypeElement = document.getElementById("searchType");

searchTypeElement.addEventListener("change", function () {
  const selected = searchTypeElement.value;
  if (selected == "category") {
    section2.style.display = "none";
    section1.style.display = "flex";
    document.getElementById("results-container").innerHTML = "";
    console.log("cateogry");
    fetchdata_category();
  }
  if (selected == "pincode") {
    section1.style.display = "none";
    section2.style.display = "flex";

    document.getElementById("results-container").innerHTML = "";
    console.log("pincode");
    populatePincode();
    fetchdata_pincode();
  }
  if (selected == "select") {
    section1.style.display = "none";
    section2.style.display = "none";
    console.log("select");
    document.getElementById("results-container").innerHTML = "";
  }
});

function populatePincode() {
  const select = document.getElementById("pincodeInput");
  select.innerHTML = "";

  fetch_mun_pincodes()
    .then((pinCodes) => {
      console.log("Fetched pin codes:", pinCodes);

      pinCodes.forEach((pin) => {
        const option = document.createElement("option");
        option.value = pin;
        option.text = pin;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching pin codes:", error);
    });
}

function fetchdata_category() {
  document
    .getElementById("form_category")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const selectedCategory = document.getElementById("category").value;
      fetch("/api/category_muncipality", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: selectedCategory }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const result = document.getElementById("results-container");
          result.innerHTML = "";
          data.forEach((key) => {
            const listitem = document.createElement("li");
            listitem.innerHTML = `
               <div class="complaint-details">
                         <h3> Category:  ${key.category}</h3>
                       <p>State:   ${key.state}</p>
                       <p>District:   ${key.district}</p>
                    <p>Pincode:   ${key.pincode}</p>
                        <p>Issue Details:  ${key.problem}</p>
                        <p>Suggestion:   ${key.suggestion}</p>
                     <p>Landmark:   ${key.landmark}</p>
                    </div>
              `;

            result.appendChild(listitem);
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    });
}

function fetchdata_pincode() {
  document
    .getElementById("form_pincode")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const selectedPincode = document.getElementById("pincodeInput").value;
      fetch("/api/pincode_muncipality", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pincode: selectedPincode }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const result = document.getElementById("results-container");
          result.innerHTML = "";
          data.forEach((key) => {
            const listitem = document.createElement("li");
            listitem.innerHTML = `
               <div class="complaint-details">
                         <h3> Category:  ${key.category}</h3>
                       <p>State:   ${key.state}</p>
                       <p>District:   ${key.district}</p>
                    <p>Pincode:   ${key.pincode}</p>
                        <p>Issue Details:  ${key.problem}</p>
                        <p>Suggestion:   ${key.suggestion}</p>
                     <p>Landmark:   ${key.landmark}</p>
                    </div>
              `;

            result.appendChild(listitem);
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    });
}

function fetch_mun_pincodes() {
  return new Promise((resolve, reject) => {
    fetch("/api/retrieve_mun_pincodes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
          console.log('Data from /api/retrieve_mun_pincodes:', data);
        resolve(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
}
