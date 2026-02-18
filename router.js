let homeContent = "";

async function loadPage(page) {

  const main = document.querySelector("main");

  // Save original home content once
  if (!homeContent) {
    homeContent = main.innerHTML;
  }

  // If home, restore original content
  if (page === "home") {
    main.classList.add("fade-out");

    setTimeout(() => {
      main.innerHTML = homeContent;
      main.classList.remove("fade-out");
      setActiveLink("home");
    }, 150);

    return;
  }

  try {
    const response = await fetch(page + ".html");
    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const newContent = doc.querySelector("main").innerHTML;

    main.classList.add("fade-out");

    setTimeout(() => {
      main.innerHTML = newContent;
      main.classList.remove("fade-out");
      setActiveLink(page);
    }, 150);

  } catch (err) {
    console.error("Page load error:", err);
  }
}

function setActiveLink(page) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + page) {
      link.classList.add("active");
    }
  });
}

function navigate() {
  const hash = window.location.hash.replace("#", "") || "home";
  loadPage(hash);
}

document.addEventListener("DOMContentLoaded", navigate);
window.addEventListe
