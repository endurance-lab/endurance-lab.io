(() => {
  // <stdin>
  var burgerBtn = document.getElementById("burgerBtn");
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  var open = false;
  burgerBtn.addEventListener("click", () => {
    open = !open;
    sidebar.classList.toggle("translate-x-full", !open);
    overlay.classList.toggle("hidden", !open);
    const [line1, line2, line3] = burgerBtn.querySelectorAll("span");
    if (open) {
      line1.classList.add("transform", "rotate-45", "-translate-y-1/2");
      line2.classList.add("opacity-0");
      line3.classList.add("transform", "-rotate-45", "-translate-y-1/2");
    } else {
      line1.classList.remove("transform", "rotate-45", "-translate-y-1/2");
      line2.classList.remove("opacity-0");
      line3.classList.remove("transform", "-rotate-45", "-translate-y-1/2");
    }
  });
  overlay.addEventListener("click", () => burgerBtn.click());
})();
