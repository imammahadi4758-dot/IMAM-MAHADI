/* =========================================================
   IMAM MAHADI — PERSONAL WEBSITE
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. PAGE LOADER
   ========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 900);

});


/* =========================================================
   2. DOM ELEMENTS
   ========================================================= */

const body = document.body;

const navbar = document.querySelector(".navbar");

const menuButton = document.getElementById("menuButton");

const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll(".section");

const scrollProgress = document.getElementById("scrollProgress");


/* =========================================================
   3. MOBILE NAVIGATION
   ========================================================= */

if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        menuButton.classList.toggle("active");

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuButton.classList.remove("active");

        });

    });

}


/* =========================================================
   4. NAVBAR SCROLL EFFECT
   ========================================================= */

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================================
   5. SCROLL PROGRESS
   ========================================================= */

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) return;

    const progress =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.height =
        `${progress}%`;

}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


/* =========================================================
   6. AUTOMATIC THEME CHANGING
   ========================================================= */

/*
   Each section contains:

   data-theme="space"
   data-theme="flow"
   data-theme="digital"
   data-theme="cyber"
   data-theme="tech"
   data-theme="cinematic"
   data-theme="luxury"

   When the user scrolls into a section,
   the BODY receives the matching theme class.
*/


const themeClasses = [
    "theme-space",
    "theme-flow",
    "theme-digital",
    "theme-cyber",
    "theme-tech",
    "theme-cinematic",
    "theme-luxury"
];


function changeTheme(theme) {

    if (!theme) return;


    /* Remove previous themes */

    themeClasses.forEach(themeClass => {

        body.classList.remove(themeClass);

    });


    /* Add new theme */

    body.classList.add(
        `theme-${theme}`
    );

}


/* Default theme */

changeTheme("space");


/* Intersection Observer */

const themeObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const theme =
                        entry.target.dataset.theme;

                    changeTheme(theme);

                }

            });

        },

        {
            threshold: 0.45
        }

    );


sections.forEach(section => {

    themeObserver.observe(section);

});


/* =========================================================
   7. ACTIVE NAVIGATION
   ========================================================= */

const navObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        link.classList.remove("active");


                        const href =
                            link.getAttribute("href");


                        if (href === `#${currentId}`) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }

    );


sections.forEach(section => {

    navObserver.observe(section);

});


/* =========================================================
   8. SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-label, " +
    ".section-title, " +
    ".about-text, " +
    ".info-card, " +
    ".timeline-item, " +
    ".skill-card, " +
    ".project-card, " +
    ".gallery-placeholder, " +
    ".contact-intro, " +
    ".contact-card"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );


                    /*
                       Once revealed, stop observing
                       to improve performance.
                    */

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   9. STAGGER CARD ANIMATION
   ========================================================= */

function addStaggerAnimation(selector) {

    const elements =
        document.querySelectorAll(selector);


    elements.forEach((element, index) => {

        element.style.transitionDelay =
            `${index * 100}ms`;

    });

}


addStaggerAnimation(".skill-card");

addStaggerAnimation(".project-card");

addStaggerAnimation(".info-card");

addStaggerAnimation(".contact-card");


/* =========================================================
   10. MOUSE PARALLAX
   ========================================================= */

const heroImageArea =
    document.querySelector(".hero-image-area");

const profileImage =
    document.querySelector(".profile-image");


if (
    heroImageArea &&
    profileImage &&
    window.matchMedia("(pointer: fine)").matches
) {

    heroImageArea.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroImageArea.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -4;


            const rotateY =
                ((x - centerX) / centerX) * 4;


            profileImage.style.transform =
                `scale(1.025)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    heroImageArea.addEventListener(
        "mouseleave",
        () => {

            profileImage.style.transform =
                "scale(1) rotateX(0deg) rotateY(0deg)";

        }
    );

}


/* =========================================================
   11. BACKGROUND PARALLAX
   ========================================================= */

const orbs =
    document.querySelectorAll(".gradient-orb");


if (
    orbs.length > 0 &&
    window.matchMedia("(pointer: fine)").matches
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX / window.innerWidth) - 0.5;


            const y =
                (event.clientY / window.innerHeight) - 0.5;


            orbs.forEach((orb, index) => {

                const movement =
                    (index + 1) * 18;


                orb.style.marginLeft =
                    `${x * movement}px`;


                orb.style.marginTop =
                    `${y * movement}px`;

            });

        }
    );

}


/* =========================================================
   12. FLOATING PARTICLES
   ========================================================= */

const particlesContainer =
    document.querySelector(".particles");


function createParticles() {

    if (!particlesContainer) return;


    /*
       Don't create too many particles
       on small devices.
    */

    const isMobile =
        window.innerWidth <= 768;


    const particleCount =
        isMobile ? 25 : 50;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.className =
            "particle";


        const size =
            Math.random() * 3 + 1;


        const left =
            Math.random() * 100;


        const top =
            Math.random() * 100;


        const duration =
            Math.random() * 12 + 8;


        const delay =
            Math.random() * 8;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particle.style.left =
            `${left}%`;


        particle.style.top =
            `${top}%`;


        particle.style.animationDuration =
            `${duration}s`;


        particle.style.animationDelay =
            `${delay}s`;


        particlesContainer.appendChild(
            particle
        );

    }

}


createParticles();


/* =========================================================
   13. CURSOR GLOW
   ========================================================= */

let cursorGlow = null;


if (
    window.matchMedia("(pointer: fine)").matches
) {

    cursorGlow =
        document.createElement("div");


    cursorGlow.className =
        "cursor-glow";


    document.body.appendChild(
        cursorGlow
    );


    window.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;


            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================================
   14. SMOOTH BUTTON RIPPLE
   ========================================================= */

const buttons =
    document.querySelectorAll(
        ".primary-button, .secondary-button"
    );


buttons.forEach(button => {

    button.addEventListener(
        "click",
        function(event) {

            const ripple =
                document.createElement("span");


            ripple.className =
                "button-ripple";


            const rect =
                this.getBoundingClientRect();


            ripple.style.left =
                `${event.clientX - rect.left}px`;


            ripple.style.top =
                `${event.clientY - rect.top}px`;


            this.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 700);

        }
    );

});


/* =========================================================
   15. KEYBOARD ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            if (navMenu) {

                navMenu.classList.remove(
                    "open"
                );

            }

            if (menuButton) {

                menuButton.classList.remove(
                    "active"
                );

            }

        }

    }
);


/* =========================================================
   16. PREVENT HASH JUMP
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   17. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            body.classList.add(
                "page-hidden"
            );

        } else {

            body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* =========================================================
   18. CONSOLE BRANDING
   ========================================================= */

console.log(
`
╔════════════════════════════════════╗
║          IMAM MAHADI               ║
║                                    ║
║   STUDENT • DEVELOPER • CREATOR    ║
║                                    ║
║   Welcome to my digital world.     ║
╚════════════════════════════════════╝
`
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */