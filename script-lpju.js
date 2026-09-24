/* ============================================================
   script-lpju.js - Navbar & Interaksi Halaman LPJU
   Dinas Perhubungan Kabupaten Konawe
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

    /* ============================================
       1. MOBILE MENU TOGGLE
       ============================================ */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Tutup menu saat klik link (mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });

        // Tutup menu saat klik di luar
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992 && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }

    /* ============================================
       2. NAVBAR SCROLL EFFECT
       ============================================ */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ============================================
       3. EFEK SMOOTH PADA CARD BERITA
       ============================================ */
    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            console.log('Klik card berita');
        });
    });

    /* ============================================
       4. FALLBACK LOGO
       ============================================ */
    const logoImg = document.getElementById('logoKonawe');
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.closest('.logo-area');
            if (parent && !parent.querySelector('.logo-fallback')) {
                const fallbackSpan = document.createElement('span');
                fallbackSpan.className = 'logo-fallback';
                fallbackSpan.style.backgroundColor = '#fff';
                fallbackSpan.style.padding = '10px';
                fallbackSpan.style.borderRadius = '8px';
                fallbackSpan.style.fontWeight = 'bold';
                fallbackSpan.style.fontSize = '12px';
                fallbackSpan.style.color = '#0d2233';
                fallbackSpan.innerText = 'Logo Konawe';
                this.insertAdjacentElement('afterend', fallbackSpan);
            }
        });
    }

    /* ============================================
       5. LOG KONFIRMASI
       ============================================ */
    console.log('✅ Halaman LPJU - Dinas Perhubungan Kabupaten Konawe siap digunakan');
});