(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".footer-logo-container");
    if (!container) return;
    const svg = container.querySelector(".footer-logo-svg");
    const outerRing = container.querySelector(".logo-outer-ring");
    const glitchRed = container.querySelector(".logo-glitch-red");
    const glitchBlue = container.querySelector(".logo-glitch-blue");
    const dashedPath = container.querySelector(".logo-dashed-path");
    const orbit1 = container.querySelector(".logo-inner-orbit-1");
    const orbit2 = container.querySelector(".logo-inner-orbit-2");
    const particle1 = container.querySelector(".logo-particle-1");
    const particle2 = container.querySelector(".logo-particle-2");
    gsap.to(particle1, {
      x: "random(-10, 10)",
      y: "random(-10, 10)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to(particle2, {
      x: "random(-8, 8)",
      y: "random(-8, 8)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });
    gsap.to([orbit1, orbit2], {
      attr: { rx: 28, ry: 43 },
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });
    gsap.to(dashedPath, {
      rotation: 360,
      transformOrigin: "50% 50%",
      duration: 60,
      repeat: -1,
      ease: "none"
    });
    let glitchTimeline;
    let biologyTimeline;
    container.addEventListener("mouseenter", () => {
      biologyTimeline = gsap.timeline();
      biologyTimeline.to([particle1, particle2], {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
        // Overwrite idle animation
      });
      biologyTimeline.to(particle1, {
        motionPath: {
          path: [{ x: 10, y: 0 }, { x: 0, y: 10 }, { x: -10, y: 0 }, { x: 0, y: -10 }],
          curviness: 1.5
        },
        duration: 1,
        repeat: -1,
        ease: "none"
      }, "-=0.5");
      biologyTimeline.to(particle2, {
        motionPath: {
          path: [{ x: -15, y: 0 }, { x: 0, y: -15 }, { x: 15, y: 0 }, { x: 0, y: 15 }],
          curviness: 1.5
        },
        duration: 1.5,
        repeat: -1,
        ease: "none"
      }, "-=1");
      gsap.to([orbit1, orbit2], {
        scale: 0.9,
        rotation: "+=45",
        transformOrigin: "50% 50%",
        duration: 0.5,
        ease: "back.out(1.7)"
      });
      glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      const glitchStep = () => {
        const tl = gsap.timeline();
        tl.set([glitchRed, glitchBlue], { display: "block", opacity: 0.8 }).set(outerRing, { opacity: 0.2 }).to(glitchRed, { x: -2, duration: 0.05, ease: "steps(1)" }).to(glitchBlue, { x: 2, duration: 0.05, ease: "steps(1)" }, "<").to(svg, { y: 1, duration: 0.05, ease: "steps(1)" }).to(svg, { y: -1, duration: 0.05, ease: "steps(1)" }).set([glitchRed, glitchBlue], { display: "none", opacity: 0, x: 0 }).set(outerRing, { opacity: 1 }).to(svg, { y: 0, duration: 0.05 });
        return tl;
      };
      glitchTimeline.add(glitchStep());
      glitchTimeline.add(glitchStep(), "+=0.2");
      glitchTimeline.add(glitchStep(), "+=1.5");
    });
    container.addEventListener("mouseleave", () => {
      if (glitchTimeline) glitchTimeline.kill();
      if (biologyTimeline) biologyTimeline.kill();
      gsap.set([glitchRed, glitchBlue], { display: "none", opacity: 0, x: 0 });
      gsap.set(outerRing, { opacity: 1 });
      gsap.to(svg, { y: 0, duration: 0.1 });
      gsap.to([orbit1, orbit2], {
        scale: 1,
        rotation: (i) => i === 0 ? 45 : -45,
        // Return to original angles
        attr: { rx: 30, ry: 45 },
        duration: 1,
        ease: "power2.out"
      });
      gsap.to([particle1, particle2], {
        x: "random(-10, 10)",
        y: "random(-10, 10)",
        duration: 2,
        ease: "sine.inOut",
        onComplete: () => {
          gsap.to(particle1, {
            x: "random(-10, 10)",
            y: "random(-10, 10)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
          gsap.to(particle2, {
            x: "random(-8, 8)",
            y: "random(-8, 8)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });
    });
  });
})();
