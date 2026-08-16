const loader = document.querySelector("#loader");
const nav = document.querySelector(".nav");
const progress = document.querySelector("#progress");
const glow = document.querySelector(".glow");
const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");
const toTop = document.querySelector(".to-top");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("done"), 550);
});

document.querySelector("#year").textContent = new Date().getFullYear();

menu.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener(
  "scroll",
  () => {
    const max = document.documentElement.scrollHeight - innerHeight;

    progress.style.width = (scrollY / max) * 100 + "%";
    nav.classList.toggle("scrolled", scrollY > 18);
    toTop.classList.toggle("visible", scrollY > 500);
  },
  { passive: true }
);

/* Glow effect: desktop only */
if (window.innerWidth > 830) {
  window.addEventListener(
    "pointermove",
    (event) => {
      glow.style.left = event.clientX + "px";
      glow.style.top = event.clientY + "px";
    },
    { passive: true }
  );
}

/* Scroll reveal animation */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

/* Typing text */
const words = [
  "C Programmer",
  "C++ Developer",
  "Linux Enthusiast",
  "Cyber Security Learner",
  "Problem Solver"
];

let word = 0;
const typed = document.querySelector("#typed");

setInterval(() => {
  word = (word + 1) % words.length;

  typed.style.opacity = 0;

  setTimeout(() => {
    typed.textContent = words[word];
    typed.style.opacity = 1;
  }, 180);
}, 2200);

/* Button ripple */
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    const rect = button.getBoundingClientRect();

    button.style.setProperty("--x", event.clientX - rect.left + "px");
    button.style.setProperty("--y", event.clientY - rect.top + "px");

    button.classList.add("rippling");

    setTimeout(() => {
      button.classList.remove("rippling");
    }, 450);
  });
});

/* Card tilt: desktop only */
if (window.innerWidth > 830) {
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        "perspective(800px) rotateX(" +
        -y * 7 +
        "deg) rotateY(" +
        x * 7 +
        "deg) translateY(-5px)";
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

/* Contact form */
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const status = document.querySelector("#form-status");

  const subject = encodeURIComponent(
    "Portfolio enquiry from " + form.name.value
  );

  const body = encodeURIComponent(
    "Name: " +
      form.name.value +
      "\nEmail: " +
      form.email.value +
      "\n\n" +
      form.message.value
  );

  status.textContent = "Opening your email app…";

  window.location.href =
    "mailto:vinayyadav67050@gmail.com?subject=" +
    subject +
    "&body=" +
    body;

  form.reset();
});

/* Konami-code easter egg */
const konami = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

let keys = [];

window.addEventListener("keydown", (event) => {
  keys.push(event.key);
  keys = keys.slice(-10);

  if (keys.join(",") === konami.join(",")) {
    document.querySelector("#toast").classList.add("show");

    setTimeout(() => {
      document.querySelector("#toast").classList.remove("show");
    }, 3500);
  }
});