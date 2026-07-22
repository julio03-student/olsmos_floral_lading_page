document.addEventListener('DOMContentLoaded', () => {
    // --- Carrusel ---
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

    // --- Carrusel Taller ---
    const tallerTrack = document.getElementById('carousel-taller-track');
    const tallerPrev = document.getElementById('taller-prev');
    const tallerNext = document.getElementById('taller-next');
    const tallerDots = document.querySelectorAll('.taller-dot');
    const tallerSlides = tallerTrack ? tallerTrack.querySelectorAll('.taller-slide') : [];
    let tallerCurrent = 0;
    let tallerTimer;

    function goToTaller(index) {
        if (index < 0) index = tallerSlides.length - 1;
        if (index >= tallerSlides.length) index = 0;
        tallerCurrent = index;
        tallerTrack.style.transform = `translateX(-${tallerCurrent * 100}%)`;
        tallerDots.forEach((dot, i) => {
            dot.classList.toggle('bg-secondary', i === tallerCurrent);
            dot.classList.toggle('bg-white/30', i !== tallerCurrent);
            dot.classList.toggle('active', i === tallerCurrent);
        });
    }

    function startTallerAutoplay() {
        stopTallerAutoplay();
        tallerTimer = setInterval(() => goToTaller(tallerCurrent + 1), 4000);
    }

    function stopTallerAutoplay() {
        clearInterval(tallerTimer);
    }

    if (tallerPrev && tallerNext && tallerTrack) {
        tallerPrev.addEventListener('click', () => { goToTaller(tallerCurrent - 1); startTallerAutoplay(); });
        tallerNext.addEventListener('click', () => { goToTaller(tallerCurrent + 1); startTallerAutoplay(); });
        tallerDots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToTaller(parseInt(dot.dataset.index));
                startTallerAutoplay();
            });
        });

        goToTaller(0);
        startTallerAutoplay();
    }

    // --- Modal Cotización ---
    const modal = document.getElementById('quote-modal');
    const openBtn = document.getElementById('open-quote-modal');
    const closeBtn = document.getElementById('close-quote-modal');
    const overlay = document.getElementById('quote-overlay');
    const form = document.getElementById('quote-form');
    const tipoInputs = document.querySelectorAll('input[name="tipo"]');
    const floresSection = document.getElementById('flores-section');

    function openModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    // Mostrar/ocultar sección de flores según tipo
    tipoInputs.forEach(input => {
        input.addEventListener('change', () => {
            floresSection.style.display = input.value === 'Cerámica' ? 'none' : 'block';
        });
    });

    // Enviar por WhatsApp
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = new FormData(form);
            const tipo = data.get('tipo');
            const tamanio = data.get('tamanio');
            const flores = data.get('flores');
            const coloresArr = data.getAll('colores');
            const presupuesto = data.get('presupuesto');
            const notas = data.get('notas');

            const colores = coloresArr.length > 0 ? coloresArr.join(', ') : 'Sin preferencia';

            let mensaje = `*~Olmos Floral - Cotizacion~*\n`;
            mensaje += `_______________________\n\n`;
            mensaje += `Hola Valentina, me gustaria cotizar un diseño:\n\n`;
            mensaje += `*Tipo:* ${tipo}\n`;
            mensaje += `*Tamaño:* ${tamanio}\n`;
            if (tipo === 'Arreglo Floral' && flores) {
                mensaje += `*Flores frescas:* ${flores}\n`;
            }
            mensaje += `*Paleta de colores:* ${colores}\n`;
            mensaje += `*Presupuesto:* ${presupuesto}\n`;
            if (notas) {
                mensaje += `\n*Notas adicionales:*\n_${notas}_\n`;
            }
            mensaje += `\n_______________________\n`;
            mensaje += `*Gracias!*`;

            const numeroWhatsApp = '573217607316';
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        });
    }

    // --- Mobile menu toggle ---
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
