const toggleBtn = document.querySelector(".nav-toggle");
const overlay = document.querySelector(".nav-overlay");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  const open = document.body.classList.contains("menu-open");
  toggleBtn.setAttribute("aria-expanded", String(open));
  overlay.setAttribute("aria-hidden", String(!open));
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    document.body.classList.remove("menu-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
  }
});



// learn-slider.js

document.addEventListener("DOMContentLoaded", () => {
  const scroller = document.getElementById("learn-scroller");
  const prevBtn = document.querySelector(".learn__btn.prev");
  const nextBtn = document.querySelector(".learn__btn.next");

  function cardStep() {
    const card = scroller.querySelector(".learn__card");
    const gap = parseFloat(getComputedStyle(scroller).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function updateButtons() {
    prevBtn.disabled = scroller.scrollLeft <= 2;
    const max = scroller.scrollWidth - scroller.clientWidth - 2;
    nextBtn.disabled = scroller.scrollLeft >= max;
  }

  prevBtn.addEventListener("click", () =>
    scroller.scrollBy({ left: -cardStep(), behavior: "smooth" })
  );

  nextBtn.addEventListener("click", () =>
    scroller.scrollBy({ left: cardStep(), behavior: "smooth" })
  );

  scroller.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();

  // keyboard support
  scroller.setAttribute("tabindex", "0");
  scroller.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight")
      scroller.scrollBy({ left: cardStep(), behavior: "smooth" });
    if (e.key === "ArrowLeft")
      scroller.scrollBy({ left: -cardStep(), behavior: "smooth" });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-toggle").forEach((btn) => {
    const targetSel =
      btn.dataset.target || `#${btn.getAttribute("aria-controls")}`;
    const panel = document.querySelector(targetSel);
    const icon = btn.querySelector(".icons img");
    const label = btn.querySelector(".label");

    const labelClosed =
      btn.dataset.labelClosed || (label ? label.textContent.trim() : "");
    const labelOpen = btn.dataset.labelOpen || labelClosed;

    const setState = (expanded) => {
      btn.setAttribute("aria-expanded", String(expanded));
      if (panel) panel.classList.toggle("open", expanded);
      if (icon) icon.src = expanded ? "icons/Close.svg" : "icons/Plus.svg";
      if (label) label.textContent = expanded ? labelOpen : labelClosed;
    };

    // Initialize state (if you pre-add .open in HTML, it will reflect here)
    const initiallyExpanded =
      btn.getAttribute("aria-expanded") === "true" ||
      (panel && panel.classList.contains("open"));
    setState(initiallyExpanded);

    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      setState(!isExpanded);
    });
  });
});




