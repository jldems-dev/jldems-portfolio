 // Initialize all carousels
        document.querySelectorAll('.carousel').forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            const slides = carousel.querySelectorAll('.carousel-slide');
            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            const nextBtn = carousel.querySelector('.carousel-btn.next');
            const dotsContainer = carousel.querySelector('.carousel-dots');
            const currentEl = carousel.querySelector('.carousel-counter .current');
            const totalEl = carousel.querySelector('.carousel-counter .total');

            let currentIndex = 0;
            const totalSlides = slides.length;

            // Update counter
            totalEl.textContent = totalSlides;

            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            const dots = carousel.querySelectorAll('.carousel-dot');

            function updateCarousel() {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;

                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });

                currentEl.textContent = currentIndex + 1;
            }

            function goToSlide(index) {
                currentIndex = index;
                updateCarousel();
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel();
            }

            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);

            // Auto-play (optional - uncomment if you want auto-slide)
            // setInterval(nextSlide, 5000);

            // Touch support
            let touchStartX = 0;
            let touchEndX = 0;

            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            }
        });