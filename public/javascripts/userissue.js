document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/userissue")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const complaintsList = document.getElementById("issuelist");

      // Clear existing content
      complaintsList.innerHTML = "";

      // Iterate through the complaints and append them to the list
      data.forEach((complaint) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                    <div class="complaint-details">
                        <h3> Category:  ${complaint.category}</h3>
                        <p>State:   ${complaint.state}</p>
                        <p>District:   ${complaint.district}</p>
                        <p>Pincode:   ${complaint.pincode}</p>
                        <p>Issue Details:  ${complaint.problem}</p>
                        <p>Suggestion:   ${complaint.suggestion}</p>
                        <p>Landmark:   ${complaint.landmark}</p>
                    </div>
                `;
        complaintsList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching complaints:", error));
});

fetch("/api/pincode_issue")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const complaintsList = document.getElementById("issuelist");

    // Clear existing content
    complaintsList.innerHTML = "";

    // Iterate through the complaints and append them to the list
    data.forEach((complaint) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <div class="complaint-details">
                    <h3> Category:  ${complaint.category}</h3>
                    <p>State:   ${complaint.state}</p>
                    <p>District:   ${complaint.district}</p>
                    <p>Pincode:   ${complaint.pincode}</p>
                    <p>Issue Details:  ${complaint.problem}</p>
                    <p>Suggestion:   ${complaint.suggestion}</p>
                    <p>Landmark:   ${complaint.landmark}</p>
                </div>
            `;
      complaintsList.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Error fetching complaints:", error));
