window.onload = (e) => {
  lazyLoading();
  projectTitleMouse();
  breakpointAnimations();
};

// load images when seeing them
function lazyLoading() {
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
}

// each title of project of the gallery follows mouse
function projectTitleMouse() {
  // get all projects from gallery
  let projects = document.querySelectorAll(".gallery_item");
  let titles = document.querySelectorAll(".project_title");

  // get each title for each project
  projects.forEach((project) => {
    titles.forEach((title) => {
      // titles follow mouse position
      project.addEventListener("mousemove", (event) => {
        let rect = project.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        title.style.transform = `translate(${x + 7}px, ${y}px)`;
      });
    });
  });
}

// fade in gallery images when resizing on 2 breakpoints (will probably use on all images/videos)
function breakpointAnimations() {
  let lastBreakpoint = getBreakpoint();

  window.addEventListener("resize", () => {
    const gallery = document.querySelector(".gallery");
    const currentBreakpoint = getBreakpoint();

    // If the breakpoint actually changed, reset animation
    if (currentBreakpoint !== lastBreakpoint) {
      gallery.style.animation = "none"; // Remove animation
      void gallery.offsetWidth; // Force reflow (restarts CSS animation)
      gallery.style.animation = "fadeInReorder 0.5s ease-in-out"; // Reapply animation
    }

    lastBreakpoint = currentBreakpoint; // Update the last known breakpoint
  });
}
// Function to determine the current breakpoint
function getBreakpoint() {
  const width = window.innerWidth;
  if (width <= 560) return "small"; // ≤35rem
  if (width <= 960) return "medium"; // ≤60rem
  return "large"; // >60rem
}
