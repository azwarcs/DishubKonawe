// inspeksi-keselamatan.js - Navigasi dan efek responsif

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Ubah icon hamburger menjadi X jika perlu
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Tutup menu ketika klik link di mobile
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 860) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Efek klik pada card (opsional)
    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.tagName === 'A') return;
            console.log('Klik card inspeksi keselamatan');
        });
    });
    
    // Fallback jika logo tidak ditemukan
    const logoImg = document.getElementById('logoKonawe');
    if(logoImg) {
        logoImg.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.closest('.logo-area');
            if(parent && !parent.querySelector('.logo-fallback')) {
                const fallbackSpan = document.createElement('span');
                fallbackSpan.className = 'logo-fallback';
                fallbackSpan.style.backgroundColor = '#fff';
                fallbackSpan.style.padding = '10px';
                fallbackSpan.style.borderRadius = '12px';
                fallbackSpan.style.fontWeight = 'bold';
                fallbackSpan.style.fontSize = '12px';
                fallbackSpan.innerText = 'Logo Konawe';
                this.insertAdjacentElement('afterend', fallbackSpan);
            }
        });
    }
    
    console.log('Halaman Inspeksi Keselamatan - Dinas Perhubungan Kabupaten Konawe siap');
});