document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme() {
        const savedTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    }

    applyTheme();

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme();
        }
    });

    const slider = document.querySelector('.slider');
    let slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const sliderContainer = document.querySelector('.slider-container');

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    slider.appendChild(firstClone);
    slider.prepend(lastClone);

    slides = document.querySelectorAll('.slide');
    let currentIndex = 1;
    const slideCount = slides.length;
    const slideWidth = 100;

    slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === (currentIndex - 1 + dots.length) % dots.length);
        });
    }

    function moveToSlide(index) {
        slider.style.transition = 'transform 0.5s ease-in-out';
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        updateDots();
    }

    function nextSlide() {
        if (currentIndex >= slideCount - 1) return;
        moveToSlide(currentIndex + 1);
    }

    function prevSlide() {
        if (currentIndex <= 0) return;
        moveToSlide(currentIndex - 1);
    }

    slider.addEventListener('transitionend', () => {
        if (slides[currentIndex].classList.contains('clone')) {
            slider.style.transition = 'none';
            currentIndex = currentIndex === 0 ? slides.length - 2 : 1;
            slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        }
    });

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index + 1);
        });
    });

    let slideInterval = setInterval(nextSlide, 5000);

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    updateDots();
});

