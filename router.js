async function loadPage(page) {
  if (page === "home") return;

  const response = await fetch(page + ".html");
  const text = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  const newContent = doc.querySelector("main").innerHTML;

  const main = document.querySelector("main");
  main.classList.add("fade-out");

  setTimeout(() => {
    main.innerHTML = newContent;
    main.classList.remove("fade-out");
  }, 150);
}

function navigate() {
  const hash = window.location.hash.replace("#", "") || "home";
  loadPage(hash);
}

document.addEventListener("DOMContentLoaded", () => {
  navigate();

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = link.getAttribute("href");
    });
  });
});

window.addEventListener("hashchange", navigate);
