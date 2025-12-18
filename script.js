document.addEventListener('DOMContentLoaded', () => {
  const strip = document.querySelector('.filmstrip');
  if (!strip) return;

  strip.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card || !strip.contains(card)) return;

    const current = strip.querySelector('.card.active');
    if (current !== card) {
      current?.classList.remove('active');
      card.classList.add('active');
    }
  });

  // (Nice to have) Keyboard accessibility
  strip.querySelectorAll('.card').forEach((c) => {
    c.tabIndex = 0;
    c.setAttribute('role', 'button');
    c.setAttribute('aria-pressed', c.classList.contains('active') ? 'true' : 'false');

    c.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        c.click();
      }
    });
  });

  // Keep aria-pressed in sync when active changes
  strip.addEventListener('click', () => {
    strip.querySelectorAll('.card').forEach((c) =>
      c.setAttribute('aria-pressed', c.classList.contains('active') ? 'true' : 'false')
    );
  });
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



