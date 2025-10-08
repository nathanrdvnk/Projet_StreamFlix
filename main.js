const scrollers = document.querySelectorAll(".container1");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerInner = scroller.querySelector(".grid1");
    const scrollerContent = Array.from(scrollerInner.children);

    const style = getComputedStyle(scrollerInner);
    const gap = parseFloat(style.gap) || 0;

    //Le +3 compense les trous des arrondis
    let originalWidth = 0;
    scrollerContent.forEach((item, index) => {
      originalWidth += item.offsetWidth;
      if (index < scrollerContent.length - 1) originalWidth += gap + 3;
    });

    //Dupliquer pour couvrir 2x l'écran (éviter les trous)
    const screenWidth = window.innerWidth;
    while (scrollerInner.scrollWidth < screenWidth * 2) {
      scrollerContent.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(clone);
      });
    }
    scrollerInner.style.setProperty("--_scroll-distance", `${originalWidth}px`);
  });
}
