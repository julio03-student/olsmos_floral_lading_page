document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = track ? track.querySelectorAll('.carousel-slide') : [];
    let current = 0;
    let autoplayTimer;

    function goTo(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        current = index;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-secondary', i === current);
            dot.classList.toggle('bg-white/30', i !== current);
            dot.classList.toggle('active', i === current);
        });
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => goTo(current + 1), 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    if (prevBtn && nextBtn && track) {
        prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
        nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goTo(parseInt(dot.dataset.index));
                startAutoplay();
            });
        });

        goTo(0);
        startAutoplay();
    }

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
