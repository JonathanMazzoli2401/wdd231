const params = new URLSearchParams(window.location.search);

const fname = params.get("fname");
const lname = params.get("lname");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const membership = params.get("membership");
const timestamp = params.get("timestamp");

const output = document.getElementById("output");

output.innerHTML = `
    <p><strong>First Name:</strong> ${fname}</p>
    <p><strong>Last Name:</strong> ${lname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phone}</p>
    <p><strong>Organization Name:</strong> ${organization}</p>
    <p><strong>Membership Level:</strong> ${membership}</p>
    <p><strong>Submission Time:</strong> ${timestamp}</p>
`;
