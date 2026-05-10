// Mobile Menu Toggle
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMenu");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});


// Typing Effect (Loop + Delete + Multiple Texts)
const texts = [
    "New Fashion Collection",
    "Trendy & Stylish Outfits",
    "Upgrade Your Wardrobe"
];

let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
    currentText = texts[i];

    if (isDeleting) {
        document.getElementById("typing").innerHTML =
            currentText.substring(0, j--);
    } else {
        document.getElementById("typing").innerHTML =
            currentText.substring(0, j++);
    }

    if (!isDeleting && j === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
        return;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % texts.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
// 3D Tilt Effect
const cards = document.querySelectorAll(".card");

// Check if device is mobile
const isMobile = window.innerWidth < 768;

if (!isMobile) {
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / 12;
            const rotateY = (x - centerX) / 12;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });
    });
}
// Wishlist Toggle ❤️
document.querySelectorAll(".wishlist").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        btn.style.color = btn.classList.contains("active") ? "red" : "white";
    });
});
document.querySelectorAll(".wishlist").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        btn.style.color = btn.classList.contains("active") ? "#ff4d6d" : "#fff";
    });
});
/* Premium Smooth Auto Slider */

const brandTrack = document.querySelector(".brand-track");

let brandPos = 0;
let brandSpeed = 0.7;

function moveBrands() {

    brandPos -= brandSpeed;

    if (Math.abs(brandPos) >= brandTrack.scrollWidth / 2) {
        brandPos = 0;
    }

    brandTrack.style.transform = `translateX(${brandPos}px)`;

    requestAnimationFrame(moveBrands);
}

moveBrands();

/* Pause on Hover */
document.querySelector(".brand-slider")
    .addEventListener("mouseenter", () => {
        brandSpeed = 0;
    });

document.querySelector(".brand-slider")
    .addEventListener("mouseleave", () => {
        brandSpeed = 0.7;
    });
/* Scroll Reveal Animation */

const galleryItems = document.querySelectorAll(".gallery-item");

function revealGallery() {

    galleryItems.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }

    });

}

window.addEventListener("scroll", revealGallery);
revealGallery();
/* Smooth Infinite Review Slider */

const reviewTrack = document.querySelector(".reviews-track");

let reviewPos = 0;
let reviewSpeed = 0.6;

function moveReviews() {

    reviewPos -= reviewSpeed;

    if (Math.abs(reviewPos) >= reviewTrack.scrollWidth / 2) {
        reviewPos = 0;
    }

    reviewTrack.style.transform = `translateX(${reviewPos}px)`;

    requestAnimationFrame(moveReviews);
}

moveReviews();

/* Pause on Hover */
document.querySelector(".reviews-slider")
    .addEventListener("mouseenter", () => {
        reviewSpeed = 0;
    });

document.querySelector(".reviews-slider")
    .addEventListener("mouseleave", () => {
        reviewSpeed = 0.6;
    });
/* Scratch Card Effect */

/* Scratch Card + Boom Sound + Red Flower Blast */

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const card = document.querySelector(".coupon-card");
const resetBtn = document.querySelector(".reset-btn");

/* Boom Sound */
const boomSound = new Audio(
    "https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3"
);

boomSound.volume = 1;

let scratching = false;
let effectPlayed = false;

/* Setup Canvas */
function setCanvas() {

    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#bcbcbc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#111";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH HERE", canvas.width / 2, canvas.height / 2);

    effectPlayed = false;
}

setCanvas();

/* Scratch Circle */
function scratch(x, y) {

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
}

/* Check Reveal % */
function checkReveal() {

    const pixels =
        ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let clear = 0;

    for (let i = 3; i < pixels.length; i += 4) {

        if (pixels[i] === 0) clear++;

    }

    const percent =
        clear / (canvas.width * canvas.height) * 100;

    if (percent > 35 && !effectPlayed) {

        effectPlayed = true;

        boomSound.currentTime = 0;
        boomSound.play();

        flowerBlast();

    }

}

/* Red Flower Blast */
function flowerBlast() {

    for (let i = 0; i < 35; i++) {

        let petal = document.createElement("span");
        petal.classList.add("flower");

        const size = Math.random() * 14 + 8;

        petal.style.width = size + "px";
        petal.style.height = size + "px";

        petal.style.left =
            card.offsetLeft + card.offsetWidth / 2 + "px";

        petal.style.top =
            card.offsetTop + card.offsetHeight / 2 + "px";

        petal.style.setProperty(
            "--x",
            (Math.random() * 500 - 250) + "px"
        );

        petal.style.setProperty(
            "--y",
            (Math.random() * -350 - 80) + "px"
        );

        document.body.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 1800);

    }

}

/* Mouse */
canvas.addEventListener("mousedown", () => scratching = true);
canvas.addEventListener("mouseup", () => scratching = false);
canvas.addEventListener("mouseleave", () => scratching = false);

canvas.addEventListener("mousemove", (e) => {

    if (!scratching) return;

    const rect = canvas.getBoundingClientRect();

    scratch(
        e.clientX - rect.left,
        e.clientY - rect.top
    );

});

/* Mobile */
canvas.addEventListener("touchstart", () => scratching = true);
canvas.addEventListener("touchend", () => scratching = false);

canvas.addEventListener("touchmove", (e) => {

    e.preventDefault();

    if (!scratching) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];

    scratch(
        touch.clientX - rect.left,
        touch.clientY - rect.top
    );

});

/* Reset */
resetBtn.onclick = () => setCanvas();

window.addEventListener("resize", setCanvas);
/* Contact Form Animation */

const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    formMsg.innerText = "✅ Message sent successfully!";

    contactForm.reset();

});

/* Input Glow */
document.querySelectorAll(".contact-form input, .contact-form textarea")
    .forEach(input => {

        input.addEventListener("focus", () => {

            input.style.boxShadow =
                "0 0 15px rgba(255,0,128,.35)";

        });

        input.addEventListener("blur", () => {

            input.style.boxShadow = "none";

        });

    });
function openMap() {
    window.open("https://www.google.com/maps/place/Dehri-on-Sone,+Bihar", "_blank");
}