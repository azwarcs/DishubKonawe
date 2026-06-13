// rute-bus-sekolah.js - Peta dan interaksi titik pemberhentian

document.addEventListener('DOMContentLoaded', function() {
            
    const busStops = [
        { id: 1, name: "MTS Puosu", address: "Desa Puosu", lat: -3.858656248192555, lng: 122.03660388485301, type: "start", 
          photo: "img/MTS 1 UNAAHA.png", description: "TITIK AWAL KEBERANGKATAN: Bus mulai berangkat menjemput anak sekolah pukul 06.00 WITA" },
        { id: 2, name: "SMP Negeri 2 Unaaha", address: "Jl. Poros Timur, Unaaha", lat: -3.865855962488158, lng: 122.04157631729032, type: "stop",
          photo: "img/SMP NEG 2 UNAAHA.png", description: "Penjemputan siswa SMP Negeri 2 Unaaha" },
        { id: 3, name: "MAN 1 Unaaha", address: "Jl. Pendidikan, Unaaha", lat: -3.854587786720032, lng: 122.05189146601336, type: "stop",
          photo: "img/MAN 1 UNAAHA.png", description: "Penjemputan siswa MAN 1 Unaaha" },
        { id: 4, name: "SMA Negeri 1 Unaaha", address: "Jl. Ahmad Yani, Unaaha", lat: -3.857467339134288, lng: 122.05543202721535, type: "stop",
          photo: "img/SMA 1 UNAAHA.png", description: "Penjemputan siswa SMA Negeri 1 Unaaha" },
        { id: 5, name: "SMK Negeri 1 Unaaha", address: "Jl. Poros Unaaha", lat: -3.8586923523990166, lng: 122.05705046376332, type: "stop",
          photo: "img/SMK 1 UNAAHA.png", description: "Penjemputan siswa SMK Negeri 1 Unaaha" },
        { id: 6, name: "SMP Negeri 1 Unaaha", address: "Jl. Pendidikan, Unaaha", lat: -3.86347068681396, lng: 122.0569606511111, type: "stop",
          photo: "img/SMP 1 UNAAHA.png", description: "Penjemputan siswa SMP Negeri 1 Unaaha" },
        { id: 7, name: "SD Negeri 1 Lalosabila", address: "Desa Lalosabila", lat: -3.8697327377523774, lng: 122.08577177634005, type: "stop",
          photo: "img/SDN 1 LALOSABILA.png", description: "Penjemputan siswa SD Negeri 1 Lalosabila" },
        { id: 8, name: "SD Negeri 1 Touy", address: "Desa Touy", lat: -3.86593318438159, lng: 122.06620835704338, type: "stop",
          photo: "img/SDN TUOY.png", description: "Penjemputan siswa SD Negeri 1 Touy" },
        { id: 9, name: "SD Negeri 1 Ambekairi", address: "Desa Ambekairi", lat: -3.8642051076666997, lng: 122.05811351532402, type: "stop",
          photo: "img/SD AMBEKAIRI.png", description: "Penjemputan siswa SD Negeri 1 Ambekairi" },
        { id: 10, name: "SMP Negeri 1 Unaaha", address: "Jl. Pendidikan, Unaaha", lat: -3.86347068681396, lng: 122.0569606511111, type: "stop",
          photo: "img/SMP 1 UNAAHA.png", description: "Penjemputan siswa SMP Negeri 1 Unaaha (titik kedua)" },
        { id: 11, name: "Adipura Kab. Konawe", address: "Pusat Kabupaten Konawe", lat: -3.8628415069004967, lng: 122.05224480274089, type: "end", 
          photo: "img/TUGU ADIPURA.png", description: "TITIK AKHIR PENJEMPUTAN: Bus selesai menjemput anak sekolah" }
    ];

    // ========== INISIALISASI PETA ==========
    const map = L.map('busMap').setView([-3.8628415069004967, 122.05224480274089], 14);

    // Tile layer (peta dasar)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 10
    }).addTo(map);

    // ========== MENAMBAHKAN MARKER & POPUP FOTO ==========
    const markers = [];
    
    function getMarkerIcon(type) {
        let color = type === 'start' ? '#22c55e' : (type === 'end' ? '#ef4444' : '#f59e0b');
        return L.divIcon({
            html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                       <i class="fas fa-bus" style="color: white; font-size: 14px;"></i>
                   </div>`,
            className: 'custom-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    }

    busStops.forEach(stop => {
        const marker = L.marker([stop.lat, stop.lng], { icon: getMarkerIcon(stop.type) })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center; cursor: pointer;" onclick="showStopPhoto(${stop.id})">
                    <strong>${stop.name}</strong><br>
                    <small>${stop.address}</small><br>
                    <span style="color: #f59e0b; font-size: 12px;">📸 Klik untuk lihat foto</span>
                </div>
            `);
        
        marker.on('popupopen', function() {
            setTimeout(() => {
                const popupContent = document.querySelector('.leaflet-popup-content');
                if(popupContent) {
                    const clickDiv = popupContent.querySelector('div');
                    if(clickDiv) {
                        clickDiv.onclick = () => showStopPhoto(stop.id);
                    }
                }
            }, 100);
        });
        
        markers.push({ marker, stop });
    });

    // ========== MEMBUAT DAFTAR HALTE ==========
    const stopsListDiv = document.getElementById('stopsList');
    
    busStops.forEach((stop, index) => {
        const stopDiv = document.createElement('div');
        stopDiv.className = `stop-item ${stop.type}`;
        stopDiv.setAttribute('data-id', stop.id);
        stopDiv.innerHTML = `
            <div class="stop-icon">${index + 1}</div>
            <div class="stop-info">
                <div class="stop-name">${stop.name}</div>
                <div class="stop-address">${stop.address}</div>
            </div>
            <div class="stop-badge">
                <i class="fas fa-map-marker-alt"></i>
            </div>
        `;
        
        stopDiv.addEventListener('click', () => {
            const markerData = markers.find(m => m.stop.id === stop.id);
            if(markerData) {
                map.setView([stop.lat, stop.lng], 16);
                markerData.marker.openPopup();
            }
            showStopPhoto(stop.id);
        });
        
        stopsListDiv.appendChild(stopDiv);
    });

    // ========== MODAL UNTUK FOTO LOKASI ==========
    const modal = document.getElementById('photoModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.querySelector('.modal-close');
    
    window.showStopPhoto = function(stopId) {
        const stop = busStops.find(s => s.id === stopId);
        if(stop) {
            const imgSrc = stop.photo;
            modalPhoto.src = imgSrc;
            modalPhoto.onerror = function() {
                this.src = `https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(stop.name)}`;
            };
            modalTitle.textContent = stop.name;
            let descText = stop.description;
            if(stop.type === 'start') {
                descText = `🚌 TITIK AWAL KEBERANGKATAN: ${stop.description}`;
            } else if(stop.type === 'end') {
                descText = `🏁 TITIK AKHIR PENJEMPUTAN: ${stop.description}`;
            }
            modalDesc.textContent = descText;
            modal.style.display = 'block';
        }
    };
    
    modalClose.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if(event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // ========== MOBILE MENU TOGGLE ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if(navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if(window.innerWidth <= 860) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // ========== FALLBACK LOGO ==========
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
    
    console.log('Halaman Rute Bus Sekolah - Kabupaten Konawe siap');
    
    // Gambar garis rute (polyline) menghubungkan semua titik berurutan
    const routeCoordinates = busStops.map(stop => [stop.lat, stop.lng]);
    const routeLine = L.polyline(routeCoordinates, {
        color: '#f59e0b',
        weight: 4,
        opacity: 0.7,
        dashArray: '8, 8'
    }).addTo(map);
});