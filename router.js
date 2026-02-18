let homeContent = "";

async function loadPage(page) {
  const main = document.querySelector("main");

  // Save home content once
  if (!homeContent) {
    homeContent = main.innerHTML;
  }

  // If home → restore
  if (page === "home") {
    main.classList.add("fade-out");
    setTimeout(() => {
      main.innerHTML = homeContent;
      main.classList.remove("fade-out");
      setActive(page);
    }, 150);
    return;
  }

  try {
    const response = await fetch(page + ".html");
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const newMain = doc.querySelector("main");

    if (!newMain) return;

    main.classList.add("fade-out");
    setTimeout(() => {
      main.innerHTML = newMain.innerHTML;
      main.classList.remove("fade-out");
      setActive(page);
    }, 150);

  } catch (err) {
    console.error(err);
  }
}

function setActive(page) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + page) {
      link.classList.add("active");
    }
  });
}

function handleNavigation() {
  const page = window.location.hash.replace("#", "") || "home";
  loadPage(page);
}

// 🔥 IMPORTANT: DO NOT prevent default click
document.addEventListener("DOMContentLoaded", handleNavigation);
window.addEventListener("hashchange", handleNavigation);
