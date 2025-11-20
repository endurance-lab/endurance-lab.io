document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.footer-logo-container');
  if (!container) return;

  const svg = container.querySelector('.footer-logo-svg');
  const outerRing = container.querySelector('.logo-outer-ring');
  const glitchRed = container.querySelector('.logo-glitch-red');
  const glitchBlue = container.querySelector('.logo-glitch-blue');
  const dashedPath = container.querySelector('.logo-dashed-path');
  const orbit1 = container.querySelector('.logo-inner-orbit-1');
  const orbit2 = container.querySelector('.logo-inner-orbit-2');
  const particle1 = container.querySelector('.logo-particle-1');
  const particle2 = container.querySelector('.logo-particle-2');

  // --- Idle Animation (Biological / Organic) ---
  // Particles floating
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

  // Gentle orbit breathing
  gsap.to([orbit1, orbit2], {
    attr: { rx: 28, ry: 43 },
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.5
  });

  // Dashed path slow rotation
  gsap.to(dashedPath, {
    rotation: 360,
    transformOrigin: "50% 50%",
    duration: 60,
    repeat: -1,
    ease: "none"
  });


  // --- Hover Interaction ---
  let glitchTimeline;
  let biologyTimeline;

  container.addEventListener('mouseenter', () => {
    // 1. Accelerate & Organize Particles (Swarm Intelligence)
    biologyTimeline = gsap.timeline();
    
    biologyTimeline.to([particle1, particle2], {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: "auto" // Overwrite idle animation
    });
    
    // Orbit them fast
    biologyTimeline.to(particle1, {
      motionPath: {
        path: [{x:10, y:0}, {x:0, y:10}, {x:-10, y:0}, {x:0, y:-10}],
        curviness: 1.5
      },
      duration: 1,
      repeat: -1,
      ease: "none"
    }, "-=0.5");

    biologyTimeline.to(particle2, {
      motionPath: {
        path: [{x:-15, y:0}, {x:0, y:-15}, {x:15, y:0}, {x:0, y:15}],
        curviness: 1.5
      },
      duration: 1.5,
      repeat: -1,
      ease: "none"
    }, "-=1");

    // 2. Distort Orbits (Tension)
    gsap.to([orbit1, orbit2], {
      scale: 0.9,
      rotation: "+=45",
      transformOrigin: "50% 50%",
      duration: 0.5,
      ease: "back.out(1.7)"
    });
    
    // 3. Glitch Effect
    glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Occasional glitch
    
    const glitchStep = () => {
        const tl = gsap.timeline();
        
        // Split RGB
        tl.set([glitchRed, glitchBlue], { display: 'block', opacity: 0.8 })
          .set(outerRing, { opacity: 0.2 })
          .to(glitchRed, { x: -2, duration: 0.05, ease: "steps(1)" })
          .to(glitchBlue, { x: 2, duration: 0.05, ease: "steps(1)" }, "<")
          
          // Shift Vertical
          .to(svg, { y: 1, duration: 0.05, ease: "steps(1)" })
          .to(svg, { y: -1, duration: 0.05, ease: "steps(1)" })
          
          // Reset
          .set([glitchRed, glitchBlue], { display: 'none', opacity: 0, x: 0 })
          .set(outerRing, { opacity: 1 })
          .to(svg, { y: 0, duration: 0.05 });
          
        return tl;
    };
    
    // Initial glitch on hover enter
    glitchTimeline.add(glitchStep());
    // Random glitches follow
    glitchTimeline.add(glitchStep(), "+=0.2");
    glitchTimeline.add(glitchStep(), "+=1.5");
  });

  container.addEventListener('mouseleave', () => {
    // Stop interactions
    if (glitchTimeline) glitchTimeline.kill();
    if (biologyTimeline) biologyTimeline.kill();
    
    // Reset Styles
    gsap.set([glitchRed, glitchBlue], { display: 'none', opacity: 0, x:0 });
    gsap.set(outerRing, { opacity: 1 });
    gsap.to(svg, { y: 0, duration: 0.1 });
    
    // Return to Idle State
    gsap.to([orbit1, orbit2], {
      scale: 1,
      rotation: (i) => i === 0 ? 45 : -45, // Return to original angles
      attr: { rx: 30, ry: 45 },
      duration: 1,
      ease: "power2.out"
    });

    // Return particles to random float
    gsap.to([particle1, particle2], {
      x: "random(-10, 10)",
      y: "random(-10, 10)",
      duration: 2,
      ease: "sine.inOut",
      onComplete: () => {
         // Restart idle tweens (simplified for this demo, ideally we'd store references to idle tweens and restart them)
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

