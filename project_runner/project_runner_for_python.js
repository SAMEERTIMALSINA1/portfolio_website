function loadProject() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("project");

  const titleEl = document.getElementById("project-title");
  const wrapper = document.getElementById("terminal-wrapper");

  if (typeof allProjects === 'undefined' || !Array.isArray(allProjects)) {
    titleEl.textContent = "Error: project data not loaded";
    return;
  }

  const project = allProjects.find(
    p => p.runnable && p.runType === 'cli' && p.runId === projectId
  );

  if (!project) {
    titleEl.textContent = "Project not found";
    wrapper.innerHTML = "<p>No CLI project matches this link.</p>";
    return;
  }

  titleEl.textContent = project.title;

  const pyScript = document.createElement("py-script");
  pyScript.classList.add("terminal-continer");
  pyScript.setAttribute("terminal", "");
  pyScript.setAttribute("worker", "");
  pyScript.setAttribute("src", project.runScript);

  wrapper.appendChild(pyScript);
}

loadProject();