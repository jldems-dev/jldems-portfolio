document.querySelectorAll(".project-carousel").forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel__slide");
    const screen = carousel.querySelector(".screen");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let currentIndex = 0;

    const showSlide = (index) => {
        slides.forEach(s => s.classList.remove("active"));

        const activeSlide = slides[index];
        activeSlide.classList.add("active");

        screen.innerHTML = "";
        screen.appendChild(activeSlide.querySelector("img").cloneNode(true));
    };

    const next = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    };

    const prev = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    };

    slides.forEach((slide, i) => {
        slide.addEventListener("click", () => {
            currentIndex = i;
            showSlide(i);
        });
    });

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // init
    showSlide(0);
});