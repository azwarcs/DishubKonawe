// Navigasi antar halaman (LPJU, Galeri)
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = {
        lpju: document.getElementById('lpju'),
        galeri: document.getElementById('galeri')
    };
    
    // Function untuk mengganti active section
    function switchPage(pageId) {
        // Sembunyikan semua section
        Object.values(sections).forEach(section => {
            if(section) section.classList.remove('active-section');
        });
        // Tampilkan section yang dipilih
        const activeSection = sections[pageId];
        if(activeSection) activeSection.classList.add('active-section');
        
        // Update class active pada tombol navigasi (hanya untuk internal link)
        navLinks.forEach(link => {
            const dataPage = link.getAttribute('data-page');
            if(dataPage === pageId) {
                link.classList.add('active');
            } else if (link.getAttribute('data-page')) {
                link.classList.remove('active');
            }
        });
        
        // Ubah hash URL tanpa reload
        window.location.hash = pageId;
    }
    
    // Event listener untuk setiap nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const dataPage = link.getAttribute('data-page');
            
            // CEK: Apakah link mengarah ke index.html?
            if (href === 'index.html' || href === 'index.html#galeri') {
                // Biarkan browser pindah ke index.html
                // Tidak melakukan preventDefault()
                return;
            }
            
            // Untuk link internal (#lpju, #galeri)
            e.preventDefault();
            
            if(dataPage && sections[dataPage]) {
                switchPage(dataPage);
                // Tutup menu mobile jika terbuka
                const navMenu = document.getElementById('mainNav');
                if(navMenu && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                }
            }
        });
    });
    
    // Baca hash URL saat pertama load
    const hash = window.location.hash.substring(1);
    if(hash && sections[hash]) {
        switchPage(hash);
    } else {
        // default lpju (karena ini halaman LPJU)
        switchPage('lpju');
    }
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }
    
    // Klik di luar menu untuk menutup
    document.addEventListener('click', (e) => {
        if(mainNav && mainNav.classList.contains('open')) {
            if(!mainNav.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('open');
            }
        }
    });
    
    // ========== GALERI LIGHTBOX ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    function openLightbox(imgSrc, captionText) {
        lightboxImg.src = imgSrc;
        lightboxCaption.innerText = captionText;
        lightboxModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightboxFunc() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            const captionElem = item.querySelector('.gallery-caption');
            item.addEventListener('click', () => {
                if(img && img.src) {
                    const caption = captionElem ? captionElem.innerText : 'Dokumentasi Perbaikan LPJU';
                    openLightbox(img.src, caption);
                }
            });
        });
    }
    
    if(closeLightbox) closeLightbox.addEventListener('click', closeLightboxFunc);
    if(lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if(e.target === lightboxModal) closeLightboxFunc();
        });
    }
    
    // Fallback untuk gambar yang tidak bisa di-load
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            if(!this.dataset.fallback) {
                this.dataset.fallback = 'true';
                this.src = 'https://placehold.co/900x500/2c3e50/white?text=Ilustrasi+LPJU';
            }
        });
    });
});