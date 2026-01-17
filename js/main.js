(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const initLucide = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  const initCookieBanner = () => {
    const storageKey = "cookieConsent";
    const existing = localStorage.getItem(storageKey);
    if (existing === "accepted" || existing === "declined") return;

    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie consent");

    banner.innerHTML = `
      <div class="cookie-banner__inner">
        <div class="cookie-banner__text">
          <strong>We use cookies</strong> to enhance your browsing experience and analyze site traffic.
          By continuing to use our website, you consent to our use of cookies.
          <a class="cookie-banner__link" href="/cookies.html">Learn more</a>
        </div>
        <div class="cookie-banner__actions">
          <button class="cookie-banner__btn cookie-banner__btn--ghost" type="button" data-action="decline">Decline</button>
          <button class="cookie-banner__btn cookie-banner__btn--solid" type="button" data-action="accept">Accept</button>
        </div>
      </div>
    `.trim();

    const setConsent = (value) => {
      localStorage.setItem(storageKey, value);
      banner.classList.add("cookie-banner--closing");
      window.setTimeout(() => banner.remove(), 180);
    };

    banner.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      const action = btn.getAttribute("data-action");
      setConsent(action === "accept" ? "accepted" : "declined");
    });

    document.body.appendChild(banner);
  };

  const initReveal = () => {
    const revealSelectors = [
      ".hero__content",
      ".section",
      ".service-item",
      ".service-card",
      ".value-prop__card",
      ".about__media",
      ".about__item",
      ".trust__media",
      ".trust__feature",
      ".journey-step",
      ".process-step",
      ".project-card",
      ".project-feature",
      ".project-mini",
      ".contact__card",
      ".expect",
      ".faq-card",
      ".faq",
    ];

    const elements = document.querySelectorAll(revealSelectors.join(","));
    elements.forEach((el) => el.classList.add("reveal"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((el) => observer.observe(el));
  };

  initLucide();
  window.addEventListener("load", initLucide, { once: true });
  initCookieBanner();
  initReveal();

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
