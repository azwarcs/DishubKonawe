// LPJU.js - Navigasi dan penguatan responsif

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Ubah icon hamburger menjadi X jika perlu (opsional)
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
    
    // Validasi gambar (Jika gambar gagal dimuat, fallback sudah dari HTML onerror)
    // Memberikan efek smooth pada card
    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Hanya untuk efek, tidak mengganggu jika ada link di dalam
            if(e.target.tagName === 'A') return;
            console.log('Klik card berita');
        });
    });
    
    // Optional: Menampilkan pesan sambutan ringan di console
    console.log('Halaman LPJU - Dinas Perhubungan Kabupaten Konawe siap digunakan');
    
    // Deteksi jika logo tidak ada, beri placeholder (tapi lebih baik Anda pasang file logo sendiri)
    const logoImg = document.getElementById('logoKonawe');
    if(logoImg) {
        logoImg.addEventListener('error', function() {
            this.style.display = 'none';
            // Anda bisa menambahkan text fallback jika logo tidak ditemukan
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
});