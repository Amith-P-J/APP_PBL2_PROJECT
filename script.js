// Demo internship data
let internships = [
  { title: "Web Developer Intern", company: "TechNova", type: "remote" },
  { title: "Data Analyst Intern", company: "InsightWorks", type: "offline" },
  { title: "Embedded Systems Intern", company: "RoboCore", type: "hybrid" }
];

let applications = [];

// Student Dashboard logic
if (document.getElementById("internshipsList")) {
  const internshipsList = document.getElementById("internshipsList");
  const filter = document.getElementById("filterType");
  const table = document.getElementById("applicationsTable");

  function renderInternships() {
    const type = filter.value;
    internshipsList.innerHTML = "";
    internships
      .filter(i => type === "all" || i.type === type)
      .forEach(i => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${i.title}</h3>
          <p>Company: ${i.company}</p>
          <p>Type: ${i.type}</p>
          <button class="btn applyBtn">Apply</button>
        `;
        div.querySelector(".applyBtn").addEventListener("click", () => {
          applications.push({ role: i.title, company: i.company, status: "Pending" });
          alert("Applied successfully!");
          renderApplications();
        });
        internshipsList.appendChild(div);
      });
  }

  function renderApplications() {
    table.innerHTML = `<tr><th>Role</th><th>Company</th><th>Status</th></tr>`;
    applications.forEach(a => {
      const row = `<tr><td>${a.role}</td><td>${a.company}</td><td>${a.status}</td></tr>`;
      table.insertAdjacentHTML("beforeend", row);
    });
  }

  filter.addEventListener("change", renderInternships);
  document.getElementById("browseTab").addEventListener("click", () => {
    document.getElementById("browseSection").classList.add("active");
    document.getElementById("applicationsSection").classList.remove("active");
  });
  document.getElementById("applicationsTab").addEventListener("click", () => {
    document.getElementById("applicationsSection").classList.add("active");
    document.getElementById("browseSection").classList.remove("active");
  });

  renderInternships();
  renderApplications();
}

// Recruiter Dashboard logic
if (document.getElementById("postForm")) {
  const postForm = document.getElementById("postForm");
  const table = document.getElementById("recruiterTable");

  postForm.addEventListener("submit", e => {
    e.preventDefault();
    const job = {
      title: document.getElementById("jobTitle").value,
      company: document.getElementById("company").value,
      type: document.getElementById("type").value
    };
    internships.push(job);
    alert("Internship posted!");
    postForm.reset();
  });

  // Display applicants (demo)
  function showApplicants() {
    table.innerHTML = `<tr><th>Student</th><th>Role</th><th>Status</th></tr>`;
    applications.forEach(a => {
      table.insertAdjacentHTML("beforeend", `<tr><td>Student1</td><td>${a.role}</td><td>${a.status}</td></tr>`);
    });
  }
  showApplicants();
}
