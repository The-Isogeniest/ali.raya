function getPreferredTheme() {
  // If user already chose
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  // Otherwise use system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function updateThemeButton() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const theme = document.documentElement.getAttribute("data-theme");
  btn.textContent = theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode";
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
  updateThemeButton();
}

// Apply theme as early as possible
applyTheme(getPreferredTheme());

document.addEventListener("DOMContentLoaded", () => {
  updateThemeButton();

  const btn = document.getElementById("themeToggle");
  if (btn) btn.addEventListener("click", toggleTheme);
});
