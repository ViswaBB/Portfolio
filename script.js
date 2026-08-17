const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});

document.querySelectorAll("nav a").forEach(a =>
    a.addEventListener("click", () => {
        if (innerWidth <= 800) {
            nav.style.display = "none";
        }
    })
);

const reveal = new IntersectionObserver(
    entries =>
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = 1;
                e.target.style.transform = "translateY(0)";
            }
        }),
    { threshold: 0.12 }
);

document
    .querySelectorAll(".project, .skill-card, .big-stat, .timeline > div, .info-card")
    .forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity .7s ease, transform .7s ease";
        reveal.observe(el);
    });