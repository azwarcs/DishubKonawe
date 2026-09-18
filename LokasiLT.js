/* ============================================================
   LokasiLT.js - Peta Titik Lokasi Dishub Konawe
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ============================================
       1. DATA TITIK LOKASI
       ============================================
       Data ini akan ditampilkan di daftar sebelah kanan peta.
       Anda bisa menyesuaikan data ini sesuai titik lokasi
       yang ada di Google My Maps Anda.

       Kategori: parkir | lampu | rawan | rambu
       ============================================ */
    const lokasiData = [
        {
            id: 1,
            name: "Parkir Pasar Unaaha",
            address: "Jl. Pasar Unaaha, Kel. Unaaha, Kec. Unaaha",
            category: "parkir",
            icon: "fa-parking"
        },
        {
            id: 2,
            name: "Parkir Terminal Asinua",
            address: "Jl. Poros Unaaha, Kel. Asinua, Kec. Unaaha",
            category: "parkir",
            icon: "fa-parking"
        },
        {
            id: 3,
            name: "Parkir RSUD Konawe",
            address: "Jl. Kesehatan, Kel. Unaaha, Kec. Unaaha",
            category: "parkir",
            icon: "fa-parking"
        },
        {
            id: 4,
            name: "Lampu Tempel Jl. Poros Kendari",
            address: "Jl. Poros Unaaha-Kendari, KM 5",
            category: "lampu",
            icon: "fa-lightbulb"
        },
        {
            id: 5,
            name: "Lampu Tempel Adipura",
            address: "Kawasan Tugu Adipura, Kel. Unaaha",
            category: "lampu",
            icon: "fa-lightbulb"
        },
        {
            id: 6,
            name: "Lampu Tempel Jl. Lakidende",
            address: "Jl. Lakidende, Kel. Lalosabila",
            category: "lampu",
            icon: "fa-lightbulb"
        },
        {
            id: 7,
            name: "Rawan Laka Simpang Lima",
            address: "Simpang Lima Unaaha, Kec. Unaaha",
            category: "rawan",
            icon: "fa-exclamation-triangle"
        },
        {
            id: 8,
            name: "Rawan Laka Jl. Trans Sulawesi",
            address: "Jl. Trans Sulawesi, Kec. Wawotobi",
            category: "rawan",
            icon: "fa-exclamation-triangle"
        },
        {
            id: 9,
            name: "Rambu Lalin Jl. Ahmad Yani",
            address: "Jl. Ahmad Yani, Kel. Unaaha",
            category: "rambu",
            icon: "fa-sign"
        },
        {
            id: 10,
            name: "Rambu Lalin Depan Sekolah",
            address: "Jl. Pendidikan, Kel. Unaaha",
            category: "rambu",
            icon: "fa-sign"
        }
    ];

    /* ============================================
       2. KONFIGURASI KATEGORI
       ============================================ */
    const kategoriLabel = {
        parkir: "Parkir",
        lampu: "Lampu Tempel",
        rawan: "Rawan Laka",
        rambu: "Rambu Lalin"
    };

    /* ============================================
       3. RENDER DAFTAR LOKASI
       ============================================ */
    const lokasiList = document.getElementById('lokasiList');
    const totalLokasi = document.getElementById('totalLokasi');

    function renderLokasi(filter = 'all', keyword = '') {
        if (!lokasiList) return;

        const filtered = lokasiData.filter(item => {
            const matchFilter = filter === 'all' || item.category === filter;
            const matchKeyword = keyword === '' ||
                item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                item.address.toLowerCase().includes(keyword.toLowerCase());
            return matchFilter && matchKeyword;
        });

        lokasiList.innerHTML = '';

        if (filtered.length === 0) {
            lokasiList.innerHTML = `
                <div style="padding: 2rem 1rem; text-align: center; color: #64748b;">
                    <i class="fas fa-search" style="font-size: 2rem; opacity: 0.3; margin-bottom: 0.5rem; display: block;"></i>
                    <p style="font-size: 0.85rem;">Tidak ada lokasi ditemukan</p>
                </div>
            `;
        } else {
            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'lokasi-item';
                div.setAttribute('data-category', item.category);
                div.innerHTML = `
                    <div class="lokasi-icon ${item.category}">
                        <i class="fas ${item.icon}"></i>
                    </div>
                    <div class="lokasi-info">
                        <div class="lokasi-name">${item.name}</div>
                        <div class="lokasi-address">${item.address}</div>
                    </div>
                    <span class="lokasi-badge ${item.category}">
                        ${kategoriLabel[item.category]}
                    </span>
                `;

                // Klik item → scroll ke peta (opsional)
                div.addEventListener('click', function () {
                    const mapSection = document.querySelector('.map-section');
                    if (mapSection) {
                        mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        mapSection.style.transition = 'box-shadow 0.3s ease';
                        mapSection.style.boxShadow = '0 0 0 4px #ffb347';
                        setTimeout(() => {
                            mapSection.style.boxShadow = '';
                        }, 1500);
                    }
                });

                lokasiList.appendChild(div);
            });
        }

        // Update total
        if (totalLokasi) {
            totalLokasi.textContent = filtered.length;
        }
    }

    /* ============================================
       4. FILTER KATEGORI
       ============================================ */
    const filterButtons = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';
    let activeKeyword = '';

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            renderLokasi(activeFilter, activeKeyword);
        });
    });

    /* ============================================
       5. SEARCH INPUT
       ============================================ */
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            activeKeyword = this.value.trim();
            renderLokasi(activeFilter, activeKeyword);
        });
    }

    /* ============================================
       6. MOBILE MENU TOGGLE
       ============================================ */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
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

        // Tutup menu saat klik link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 860) {
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
        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 860 && navMenu.classList.contains('active')) {
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
       7. FALLBACK LOGO
       ============================================ */
    const logoImg = document.getElementById('logoKonawe');
    if (logoImg) {
        logoImg.addEventListener('error', function () {
            this.style.display = 'none';
            const parent = this.closest('.logo-area');
            if (parent && !parent.querySelector('.logo-fallback')) {
                const fallback = document.createElement('span');
                fallback.className = 'logo-fallback';
                fallback.style.cssText = 'background:#fff;padding:10px;border-radius:12px;font-weight:bold;font-size:12px;color:#0b2b3b;';
                fallback.innerText = 'Logo Konawe';
                this.insertAdjacentElement('afterend', fallback);
            }
        });
    }

    /* ============================================
       8. INISIALISASI
       ============================================ */
    renderLokasi('all', '');

    console.log('✅ Halaman Titik Lokasi - Dishub Konawe siap');
});