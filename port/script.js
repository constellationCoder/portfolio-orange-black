/**
 * ABDELRHMAN MAGDY MOHAMED — PORTFOLIO SCRIPTS
 * Product Designer & UI/UX Specialist
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ── PAGE LOADER & HERO TRIGGER ── */
  const loader = document.getElementById("pageLoader");
  setTimeout(() => {
    if (loader) loader.classList.add("done");
    document.body.classList.add("site-ready");
  }, 500);

  /* ── MOBILE MENU TOGGLE ── */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      mobileMenuBtn.classList.toggle("hamburger-active", isOpen);
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Auto-close menu when tapping any link
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        mobileMenuBtn.classList.remove("hamburger-active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── NAV SCROLL BEHAVIOR ── */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── NAV ACTIVE STATE ── */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const sectionToNav = {
    hero: null,
    mindset: null,
    about: "about",
    expertise: "expertise",
    work: "work",
    process: "process",
    experience: "experience",
    contact: null,
  };

  function clearActive() {
    navLinks.forEach(l => l.classList.remove("active"));
  }

  function setActive(id) {
    clearActive();
    const target = sectionToNav[id];
    if (!target) return;
    const link = document.querySelector(`.nav-link[data-section="${target}"]`);
    if (link) link.classList.add("active");
  }

  const navObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    }),
    { rootMargin: "-15% 0px -60% 0px", threshold: 0 }
  );
  sections.forEach(s => navObserver.observe(s));

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("data-section");
      const target = document.getElementById(id);
      if (target) {
        clearActive();
        link.classList.add("active");
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ── RELIABLE SCROLL REVEAL (MOBILE & DESKTOP) ── */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          entry.target.querySelectorAll(".clip-reveal").forEach(el => el.classList.add("revealed"));
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "50px 0px -20px 0px", threshold: 0.01 }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  // Clip-reveal direct observer
  document.querySelectorAll(".clip-reveal").forEach(el => {
    const clipObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            clipObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px 0px -20px 0px", threshold: 0.01 }
    );
    clipObserver.observe(el);
  });

  /* ── ABOUT PROGRESSION NODES ── */
  const progressNodes = document.querySelectorAll("[data-progress]");
  const progressObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { rootMargin: "0px 0px -30px 0px", threshold: 0.1 }
  );
  progressNodes.forEach(n => progressObserver.observe(n));

  /* ── PROCESS LINE (DESKTOP & MOBILE TOUCH) ── */
  const processSection = document.getElementById("processTrack");
  const processLineFill = document.getElementById("processLineFill");
  const processLineFillMobile = document.getElementById("processLineFillMobile");
  const processSteps = document.querySelectorAll(".process-step");

  function updateProcess() {
    if (!processSection) return;
    const rect = processSection.getBoundingClientRect();
    const viewH = window.innerHeight;
    const start = viewH * 0.75;
    const end = -rect.height + viewH * 0.25;
    const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

    if (processLineFill) processLineFill.style.width = (progress * 100) + "%";
    if (processLineFillMobile) processLineFillMobile.style.height = (progress * 100) + "%";

    processSteps.forEach((step, i) => {
      const stepProgress = (i + 0.5) / processSteps.length;
      if (progress >= stepProgress - 0.2) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }
  window.addEventListener("scroll", updateProcess, { passive: true });
  window.addEventListener("touchmove", updateProcess, { passive: true });
  updateProcess();

  /* ── CUSTOM CURSOR (DESKTOP ONLY) ── */
  const cursor = document.getElementById("customCursor");
  const projectEls = document.querySelectorAll("[data-project]");
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  if (!isTouchDevice && cursor) {
    document.addEventListener("mousemove", e => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
    projectEls.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
        el.style.cursor = "none";
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
        el.style.cursor = "";
      });
    });
  }

});
