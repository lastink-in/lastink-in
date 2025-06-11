// =========================
// Carousel Logic
// =========================
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const dots = document.querySelectorAll('.carousel-dot');
const carousel = document.querySelector('.carousel-container');

let index = 0;
let autoScroll;

function moveToSlide(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[i].classList.add('active');
  index = i;
}

function startAutoScroll() {
  autoScroll = setInterval(() => {
    index = (index + 1) % slides.length;
    moveToSlide(index);
  }, 7000);
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

nextButton.onclick = () => {
  index = (index + 1) % slides.length;
  moveToSlide(index);
};

prevButton.onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  moveToSlide(index);
};

dots.forEach((dot, i) => {
  dot.onclick = () => moveToSlide(i);
});

carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);
startAutoScroll();

// =========================
// Email Subscription
// =========================
const notifyButtons = document.querySelectorAll('.notify-btn');
const emailInputs = document.querySelectorAll('input[type="email"]');

notifyButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const email = emailInputs[i].value.trim();
    if (!email) return alert('Please enter your email.');
    fetch('/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => alert(data.message || data.error))
    .catch(err => alert('Something went wrong!'));
  });
});

// =========================
// Ribbon Cutting Ceremony
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const ribbon = document.getElementById("ribbon-img");
  const scissors = document.getElementById("scissors-icon");
  const overlay = document.getElementById("ribbon-overlay");

  // Set fallback cut image from data attribute
  const cutImage = ribbon.dataset.cut || "/static/images/ribbon_cut.png";

  // Follow mouse with scissors
  document.addEventListener("mousemove", (e) => {
    scissors.style.left = `${e.clientX - 40}px`;
    scissors.style.top = `${e.clientY - 40}px`;
  });

  // On click - Cut ribbon
  overlay.addEventListener("click", () => {
    ribbon.src = cutImage;
    ribbon.classList.add("cut");
    scissors.style.transform = "rotate(-45deg)";

    // Launch confetti
    if (typeof confetti === "function") {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
      });
    }

    // Remove overlay after 2s
    setTimeout(() => {
      overlay.classList.add("hide");
    }, 2000);
  });
});
