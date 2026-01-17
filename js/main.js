(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const headerEl = document.querySelector(".site-header");
  const toggleEl = document.querySelector(".menu-toggle");
  if (!headerEl || !toggleEl) return;

  const navId = toggleEl.getAttribute("aria-controls") || "site-nav";
  const navEl =
    document.getElementById(navId) || headerEl.querySelector(".nav");
  if (!navEl) return;

  const isOpen = () => headerEl.classList.contains("menu-open");

  const setOpen = (open) => {
    headerEl.classList.toggle("menu-open", open);
    toggleEl.setAttribute("aria-expanded", open ? "true" : "false");
    toggleEl.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggleEl.addEventListener("click", () => {
    setOpen(!isOpen());
  });

  navEl.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (headerEl.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!isOpen()) return;
    setOpen(false);
    toggleEl.focus();
  });

  const mq = window.matchMedia("(max-width: 900px)");
  const handleMq = () => {
    if (!mq.matches) setOpen(false);
  };
  if ("addEventListener" in mq) mq.addEventListener("change", handleMq);
  else mq.addListener(handleMq);
  handleMq();
})();
