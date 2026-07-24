// Dynamically loads PyScript core CSS + JS so it doesn't have to be
// hardcoded into every page's <head>.
(function loadPyScript(version = "2026.3.1") {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `https://pyscript.net/releases/${version}/core.css`;
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.type = "module";
    script.src = `https://pyscript.net/releases/${version}/core.js`;
    document.head.appendChild(script);
})();

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