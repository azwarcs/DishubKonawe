// ============================================
// SCRIPT FORM PENGADUAN PELAYANAN UJI KIR
// TERHUBUNG DENGAN GOOGLE SHEETS BARU
// ============================================

// ============================================
// 🔴 GANTI URL INI DENGAN URL GOOGLE SCRIPT ANDA YANG BARU!
// ============================================
const GOOGLE_SCRIPT_URL_KIR = 'https://script.google.com/macros/s/AKfycby7xzjlmtuV4ePYJYM0_Ajm-PRTMu7bbR9KvMLbK6U_4OWmKUIX03N-u1ykCZyluX8h/exec';

// ============================================
// INISIALISASI AOS ANIMATION
// ============================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 50
});

// ============================================
// FORM PENGADUAN KHUSUS PELAYANAN UJI KIR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const pengaduanForm = document.getElementById('pengaduanForm');
    
    if (pengaduanForm) {
        pengaduanForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // ===== TAMPILKAN LOADING =====
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim data...';
            submitBtn.disabled = true;
            
            // ===== AMBIL DATA DARI FORM =====
            const formData = {
            // ID Pengaduan format: KIR-TANGGAL-BULAN-JAMMENIT
            id: (function() {
                const today = new Date();
                const tanggal = today.getDate().toString().padStart(2, '0');
                const bulan = (today.getMonth() + 1).toString().padStart(2, '0');
                const jam = today.getHours().toString().padStart(2, '0');
                const menit = today.getMinutes().toString().padStart(2, '0');
                
                return 'KIR-' + tanggal + bulan + '-' + jam + menit;
            })(),
                
                // Informasi halaman
                halaman: 'Pelayanan Uji Kir',
                
                // Waktu pengiriman
                tanggal: new Date().toLocaleString('id-ID', {
                    timeZone: 'Asia/Makassar',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                
                // Data dari form
                nama: this.querySelector('input[placeholder="Nama Lengkap"]').value,
                email: this.querySelector('input[placeholder="Email"]').value,
                telepon: this.querySelector('input[placeholder="No. Telepon/HP"]').value,
                jenis: this.querySelector('select').value,
                pesan: this.querySelector('textarea').value,
                
                // Status awal
                status: 'Menunggu Proses',
                
                // Timestamp untuk sorting
                timestamp: Date.now()
            };
            
            // ===== VALIDASI =====
            if (!formData.nama || !formData.email || !formData.telepon || !formData.jenis || !formData.pesan) {
                alert('❌ Semua kolom harus diisi!');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // ===== VALIDASI EMAIL =====
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('❌ Format email tidak valid!');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // ===== VALIDASI TELEPON (minimal 10 digit) =====
            const phoneRegex = /^[0-9+\-\s]{10,}$/;
            if (!phoneRegex.test(formData.telepon.replace(/\s/g, ''))) {
                alert('❌ Nomor telepon minimal 10 digit!');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            try {
                // ===== KIRIM KE GOOGLE SHEETS BARU =====
                console.log('📤 Mengirim data pengaduan KIR:', formData);
                
                const response = await fetch(GOOGLE_SCRIPT_URL_KIR, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                // ===== TAMPILKAN PESAN SUKSES KHUSUS KIR =====
                const nomorPengaduan = formData.id;
                
                alert(`✅✅✅ PENGADUAN LAYANAN KIR TERKIRIM! ✅✅✅
                
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 NOMOR PENGADUAN KIR: 
${nomorPengaduan}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Tanggal: ${formData.tanggal}
👤 Nama: ${formData.nama}
📌 Jenis: ${formData.jenis}
🚗 Layanan: Uji KIR Kendaraan

⏱️ STATUS: MENUNGGU PROSES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 CATAT NOMOR PENGADUAN ANDA!
Tim teknis KIR akan menghubungi Anda 
maksimal 2x24 jam.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Terima kasih telah menggunakan layanan 
Uji KIR Dinas Perhubungan Kabupaten Konawe.`);
                
                // ===== RESET FORM =====
                this.reset();
                
                // ===== SCROLL KE ATAS HALAMAN =====
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
            } catch(error) {
                console.error('❌ Error pengaduan KIR:', error);
                
                // Tetap tampilkan pesan sukses karena data kemungkinan besar terkirim
                alert(`⚠️⚠️⚠️ PENGADUAN KIR TELAH TERKIRIM! ⚠️⚠️⚠️
                
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 NOMOR PENGADUAN KIR: 
${formData.id}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Tanggal: ${formData.tanggal}
👤 Nama: ${formData.nama}

⚠️ Maaf, terjadi gangguan koneksi.
NAMUN data Anda KEMUNGKINAN BESAR tetap tersimpan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 Jika tidak dihubungi dalam 2x24 jam:
Call Center KIR: 12345678
📧 Email: kir.dishub@konawekab.go.id
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
                
            } finally {
                // ===== KEMBALIKAN TOMBOL =====
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ============================================
    // 🆕🆕🆕 FUNGSI CEK STATUS PENGADUAN KIR (DENGAN LINK BISA DIKLIK) 🆕🆕🆕
    // ============================================
    window.cekStatusPengaduanKir = function() {
        const nomor = prompt('📋 Masukkan Nomor Pengaduan KIR Anda:');
        
        if (nomor && nomor.trim() !== '') {
            if (nomor.startsWith('KIR-')) {
                // Buka spreadsheet di tab baru (GANTI DENGAN URL SPREADSHEET KIR ANDA)
                window.open('https://docs.google.com/spreadsheets/d/1BcMifB_v5sCR2cleCC8AAERB8NdpCQe1HKmpKAs8jEA/edit?usp=sharing', '_blank');
                
                // Tampilkan instruksi singkat
                alert(`🔍🔍🔍 CEK STATUS PENGADUAN KIR 🔍🔍🔍
                
Nomor: ${nomor}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SPREADSHEET SUDAH DIBUKA DI TAB BARU!

Langkah selanjutnya:
1️⃣ Tekan Ctrl+F di tab spreadsheet
2️⃣ Cari nomor: ${nomor}
3️⃣ Lihat kolom "Status"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 Call Center KIR: 0811-4050-112
📧 kir.dishub@konawekab.go.id
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            } else {
                alert(`❌ Nomor pengaduan tidak valid!
                
Nomor pengaduan KIR harus diawali dengan "KIR-"
Contoh: KIR-1234567890-123

Silakan cek kembali nomor pengaduan Anda.`);
            }
        }
    };
    
    // ============================================
    // FUNGSI CEK STATUS (ALIAS untuk tombol di widget)
    // ============================================
    window.cekStatusPengaduan = function() {
        window.cekStatusPengaduanKir();
    };
    
    // ============================================
    // TAMBAHKAN TOMBOL CEK STATUS DI BAWAH FORM
    // ============================================
    const formPanel = document.querySelector('.contact-form-panel');
    
    if (formPanel) {
        // Cek apakah sudah ada tombol cek status
        if (!document.querySelector('.cek-status-wrapper')) {
            const cekStatusDiv = document.createElement('div');
            cekStatusDiv.className = 'cek-status-wrapper';
            cekStatusDiv.style.marginTop = '30px';
            cekStatusDiv.style.padding = '20px';
            cekStatusDiv.style.background = 'linear-gradient(145deg, #e8f0fe, #d9e6f5)';
            cekStatusDiv.style.borderRadius = '16px';
            cekStatusDiv.style.textAlign = 'center';
            cekStatusDiv.style.border = '2px dashed #0B4F6C';
            
            cekStatusDiv.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <span style="background: #0B4F6C; color: white; padding: 5px 15px; border-radius: 50px; font-size: 0.8rem; font-weight: 600;">
                        <i class="fas fa-check-circle"></i> KHUSUS LAYANAN KIR
                    </span>
                </div>
                <h4 style="color: #0B4F6C; margin-bottom: 10px; font-size: 1.2rem;">
                    SUDAH MENGIRIM PENGADUAN KIR?
                </h4>
                <p style="margin-bottom: 15px; color: #555; font-size: 0.9rem;">
                    Klik tombol di bawah untuk cek status pengaduan KIR Anda
                </p>
                <button onclick="cekStatusPengaduanKir()" 
                        style="background: linear-gradient(145deg, #FDB913, #e5a600); 
                               color: #1a1e24;
                               border: none;
                               padding: 12px 25px;
                               border-radius: 50px;
                               font-weight: 600;
                               font-size: 0.95rem;
                               cursor: pointer;
                               transition: all 0.3s;
                               box-shadow: 0 5px 15px rgba(253, 185, 19, 0.3);
                               border: 1px solid rgba(255,255,255,0.3);
                               width: 100%;"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(253,185,19,0.4)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(253,185,19,0.3)';">
                    <i class="fas fa-search" style="margin-right: 8px;"></i> CEK STATUS PENGADUAN KIR
                </button>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e9ecef;">
                    <p style="margin-bottom: 5px; font-size: 0.85rem; color: #666;">
                        <i class="fas fa-phone-alt" style="color: #0B4F6C;"></i> Call Center KIR: 0811-4050-112
                    </p>
                    <p style="font-size: 0.85rem; color: #666;">
                        <i class="fas fa-envelope" style="color: #0B4F6C;"></i> kir.dishub@konawekab.go.id
                    </p>
                </div>
            `;
            
            formPanel.appendChild(cekStatusDiv);
        }
    }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// TAHUN OTOMATIS DI FOOTER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('.footer-bottom p:first-child');
    if (footerYear) {
        footerYear.innerHTML = `© ${new Date().getFullYear()} Dinas Perhubungan Kabupaten Konawe - Layanan Uji KIR. All rights reserved.`;
    }
});

// ============================================
// SMOOTH SCROLL UNTUK LINK ANCHOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SMOOTH SCROLL UNTUK SEMUA LINK ANCHOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Tutup menu mobile setelah klik
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});


// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// ============================================
// KONFIRMASI SIAP DIGUNAKAN
// ============================================
// JAVASCRIPT UNTUK FORM PENDAFTARAN UJI KIR
// ============================================

// KONFIGURASI - GANTI DENGAN URL APPS SCRIPT ANDA
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyF1bSChNCCZ_SV__s3CxbjACoeHlt6WngHyq9vFsWHRxoy1OV-4mIS7WcpENVrxYdJPA/exec';

// ==================== INISIALISASI ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Form pendaftaran KIR siap!');
    console.log('📊 Terhubung ke:', APPS_SCRIPT_URL);
    
    // Inisialisasi opsi tahun
    initTahunOptions();
    
    // Inisialisasi form
    const form = document.getElementById('pendaftaranKIRForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('❌ Form dengan id "pendaftaranKIRForm" tidak ditemukan!');
    }
    
    // Inisialisasi input formatting
    initInputFormatting();
    
    // Inisialisasi tombol cek status
    initCekStatus();
    
    // Test koneksi setelah halaman load
    setTimeout(testConnection, 2000);
});

// ==================== INIT TAHUN OPTIONS ====================
function initTahunOptions() {
    const tahunSelect = document.getElementById('tahunPembuatan');
    if (!tahunSelect) return;
    
    const tahunSekarang = new Date().getFullYear();
    
    for (let tahun = tahunSekarang; tahun >= 2005; tahun--) {
        const option = document.createElement('option');
        option.value = tahun;
        option.textContent = tahun;
        tahunSelect.appendChild(option);
    }
}

// ==================== INIT INPUT FORMATTING ====================
function initInputFormatting() {
    // Format nomor telepon (hanya angka)
    const noTelp = document.getElementById('noTelp');
    if (noTelp) {
        noTelp.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 13) {
                this.value = this.value.slice(0, 13);
            }
        });
    }
    
    // Format nomor plat (huruf besar)
    const noPlat = document.getElementById('noPlat');
    if (noPlat) {
        noPlat.addEventListener('input', function(e) {
            this.value = this.value.toUpperCase();
        });
    }
    
    // Format no rangka (huruf besar)
    const noRangka = document.getElementById('noRangka');
    if (noRangka) {
        noRangka.addEventListener('input', function(e) {
            this.value = this.value.toUpperCase();
        });
    }
    
    // Format no mesin (huruf besar)
    const noMesin = document.getElementById('noMesin');
    if (noMesin) {
        noMesin.addEventListener('input', function(e) {
            this.value = this.value.toUpperCase();
        });
    }
}

// ==================== INIT CEK STATUS ====================
function initCekStatus() {
    const btnCek = document.getElementById('btnCekStatus');
    const searchInput = document.getElementById('searchInput');
    
    if (btnCek) {
        btnCek.addEventListener('click', cekStatusPendaftaran);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                cekStatusPendaftaran();
            }
        });
    }
}

// ==================== HANDLE SUBMIT ====================
async function handleSubmit(e) {
    e.preventDefault();
    
    // Validasi form
    if (!validateForm()) {
        return;
    }
    
    // Tampilkan loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftarkan...';
    submitBtn.disabled = true;
    
    try {
        // Ambil data form
        const formData = {
            noRangka: document.getElementById('noRangka')?.value?.trim() || '',
            noMesin: document.getElementById('noMesin')?.value?.trim() || '',
            noPlat: document.getElementById('noPlat')?.value?.trim() || '',
            merk: document.getElementById('merk')?.value || '',
            tipe: document.getElementById('tipe')?.value?.trim() || '',
            isiSilinder: document.getElementById('isiSilinder')?.value || '',
            tahunPembuatan: document.getElementById('tahunPembuatan')?.value || '',
            srut: document.getElementById('srut')?.value?.trim() || '-',
            noTelp: document.getElementById('noTelp')?.value?.trim() || '',
            alamat: document.getElementById('alamat')?.value?.trim() || '',
            catatan: document.getElementById('catatan')?.value?.trim() || '-'
        };
        
        console.log('📤 Mengirim data:', formData);
        
        // Kirim ke Apps Script
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'daftarKIR',
                data: JSON.stringify(formData)
            })
        });
        
        // Reset form
        e.target.reset();
        
        // Tampilkan notifikasi sukses
        showNotification(
            '✅ Pendaftaran berhasil! Nomor registrasi akan dikirim melalui WhatsApp.',
            'success'
        );
        
    } catch (error) {
        console.error('❌ Error:', error);
        showNotification(
            '❌ Gagal mengirim data. Silakan coba lagi.',
            'error'
        );
    } finally {
        // Kembalikan tombol ke semula
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// ==================== VALIDASI FORM ====================
function validateForm() {
    let isValid = true;
    const errors = [];
    
    // Validasi field wajib
    const requiredFields = [
        { id: 'noRangka', name: 'No Rangka' },
        { id: 'noMesin', name: 'No Mesin' },
        { id: 'noPlat', name: 'No Plat' },
        { id: 'merk', name: 'Merk' },
        { id: 'tipe', name: 'Tipe' },
        { id: 'isiSilinder', name: 'Isi Silinder' },
        { id: 'tahunPembuatan', name: 'Tahun Pembuatan' },
        { id: 'noTelp', name: 'No Telepon' },
        { id: 'alamat', name: 'Alamat' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value || element.value.trim() === '') {
            errors.push(field.name);
            if (element) {
                element.classList.add('error');
            }
            isValid = false;
        } else {
            if (element) {
                element.classList.remove('error');
            }
        }
    });
    
    // Validasi No Telepon
    const noTelp = document.getElementById('noTelp')?.value;
    if (noTelp) {
        const phoneRegex = /^[0-9]{10,13}$/;
        if (!phoneRegex.test(noTelp)) {
            errors.push('Nomor telepon harus 10-13 angka');
            isValid = false;
        }
    }
    
    // Validasi Isi Silinder
    const isiSilinder = document.getElementById('isiSilinder')?.value;
    if (isiSilinder) {
        const cc = parseInt(isiSilinder);
        if (cc < 50 || cc > 20000) {
            errors.push('Isi silinder harus antara 50-20000 cc');
            isValid = false;
        }
    }
    
    // Validasi Tahun
    const tahun = document.getElementById('tahunPembuatan')?.value;
    if (tahun) {
        const tahunNow = new Date().getFullYear();
        if (tahun < 2005 || tahun > tahunNow) {
            errors.push('Tahun pembuatan tidak valid (2005 - ' + tahunNow + ')');
            isValid = false;
        }
    }
    
    // Tampilkan error jika ada
    if (errors.length > 0) {
        showNotification(
            '⚠️ Perbaiki data berikut:\n• ' + errors.join('\n• '),
            'warning'
        );
    }
    
    return isValid;
}

// ==================== TEST KONEKSI ====================
async function testConnection() {
    console.log('🔍 Testing connection to Apps Script...');
    
    try {
        // Gunakan JSONP untuk test koneksi
        const timestamp = new Date().getTime();
        const callbackName = 'testCallback_' + timestamp;
        
        const result = await new Promise((resolve, reject) => {
            window[callbackName] = function(response) {
                resolve(response);
                delete window[callbackName];
                document.head.removeChild(script);
            };
            
            const script = document.createElement('script');
            script.src = `${APPS_SCRIPT_URL}?action=test&callback=${callbackName}&t=${timestamp}`;
            
            script.onerror = function() {
                reject(new Error('Gagal terhubung'));
                delete window[callbackName];
                document.head.removeChild(script);
            };
            
            document.head.appendChild(script);
            
            // Timeout
            setTimeout(() => {
                if (window[callbackName]) {
                    reject(new Error('Timeout'));
                    delete window[callbackName];
                    document.head.removeChild(script);
                }
            }, 5000);
        });
        
        console.log('✅✅✅ KONEKSI BERHASIL! ✅✅✅', result);
        showNotification('✅ Koneksi ke server berhasil!', 'success');
        
    } catch (error) {
        console.error('❌❌❌ KONEKSI GAGAL! ❌❌❌', error);
        showNotification(
            '⚠️ Koneksi ke server gagal. Pastikan URL Apps Script benar.',
            'warning'
        );
    }
}

// ==================== CEK STATUS PENDAFTARAN (VERSI REAL) ====================
async function cekStatusPendaftaran() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        showNotification('Masukkan nomor registrasi atau nomor plat', 'warning');
        return;
    }
    
    // Tampilkan loading
    const hasilDiv = document.getElementById('hasilStatus');
    if (!hasilDiv) {
        console.error('Element hasilStatus tidak ditemukan');
        return;
    }
    
    hasilDiv.style.display = 'block';
    hasilDiv.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #667eea;"></i>
            <p style="margin-top: 15px; color: #666;">Mencari data...</p>
        </div>
    `;
    
    try {
        // Gunakan JSONP untuk mengatasi CORS
        const timestamp = new Date().getTime();
        const callbackName = 'statusCallback_' + timestamp;
        
        const result = await new Promise((resolve, reject) => {
            window[callbackName] = function(response) {
                resolve(response);
                delete window[callbackName];
                document.head.removeChild(script);
            };
            
            const script = document.createElement('script');
            script.src = `${APPS_SCRIPT_URL}?action=cekStatus&keyword=${encodeURIComponent(keyword)}&callback=${callbackName}&t=${timestamp}`;
            
            script.onerror = function() {
                reject(new Error('Gagal terhubung ke server'));
                delete window[callbackName];
                document.head.removeChild(script);
            };
            
            document.head.appendChild(script);
            
            // Timeout setelah 10 detik
            setTimeout(() => {
                if (window[callbackName]) {
                    reject(new Error('Waktu pencarian habis'));
                    delete window[callbackName];
                    document.head.removeChild(script);
                }
            }, 10000);
        });
        
        console.log('Response dari server:', result);
        
        if (result && result.found === true) {
            tampilkanHasilStatus(result);
        } else {
            hasilDiv.innerHTML = `
                <div style="text-align: center; padding: 30px; background: #F8D7DA; border-radius: 10px;">
                    <i class="fas fa-exclamation-circle" style="font-size: 50px; color: #dc3545;"></i>
                    <h4 style="color: #721C24; margin-top: 15px;">Data Tidak Ditemukan</h4>
                    <p style="color: #721C24;">${result.message || 'Tidak ada pendaftaran dengan nomor "' + keyword + '"'}</p>
                    <button onclick="document.getElementById('hasilStatus').style.display='none'; document.getElementById('searchInput').value='';" 
                            style="margin-top: 15px; padding: 8px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-times"></i> Tutup
                    </button>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error:', error);
        hasilDiv.innerHTML = `
            <div style="text-align: center; padding: 30px; background: #F8D7DA; border-radius: 10px;">
                <i class="fas fa-exclamation-circle" style="font-size: 50px; color: #dc3545;"></i>
                <h4 style="color: #721C24; margin-top: 15px;">Koneksi Gagal</h4>
                <p style="color: #721C24;">${error.message || 'Tidak dapat terhubung ke server'}</p>
                <button onclick="document.getElementById('hasilStatus').style.display='none'; document.getElementById('searchInput').value='';" 
                        style="margin-top: 15px; padding: 8px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-times"></i> Tutup
                </button>
            </div>
        `;
    }
}


// ==================== TAMPILKAN HASIL STATUS ====================
// ==================== FUNGSI FORMAT TANGGAL ====================
// Tambahkan fungsi ini SEBELUM tampilkanHasilStatus
function formatTanggal(tanggalString) {
    if (!tanggalString) return '-';
    
    try {
        // Buat objek Date dari string
        const date = new Date(tanggalString);
        
        // Cek apakah valid
        if (isNaN(date.getTime())) {
            // Jika tidak valid, coba hapus teks dalam kurung
            const cleanString = tanggalString.replace(/\s*\([^)]*\)/g, '');
            const newDate = new Date(cleanString);
            
            if (!isNaN(newDate.getTime())) {
                const year = newDate.getFullYear();
                const month = String(newDate.getMonth() + 1).padStart(2, '0');
                const day = String(newDate.getDate()).padStart(2, '0');
                const hours = String(newDate.getHours()).padStart(2, '0');
                const minutes = String(newDate.getMinutes()).padStart(2, '0');
                const seconds = String(newDate.getSeconds()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            }
            
            // Jika masih gagal, gunakan regex untuk mengambil bagian tanggal saja
            const match = tanggalString.match(/(\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2})/);
            if (match) {
                return match[1];
            }
            
            return tanggalString; // Kembalikan asli jika tidak bisa diparse
        }
        
        // Format: YYYY-MM-DD HH:MM:SS
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch (e) {
        console.error('Error formatting date:', e);
        return tanggalString;
    }
}

// ==================== TAMPILKAN HASIL STATUS (YANG SUDAH DIPERBAIKI) ====================
function tampilkanHasilStatus(data) {
    const hasilDiv = document.getElementById('hasilStatus');
    if (!hasilDiv) return;
    
    // Tentukan class badge berdasarkan status
    let statusClass = 'status-menunggu';
    let statusText = 'MENUNGGU';
    
    if (data.status === 'SELESAI') {
        statusClass = 'status-selesai';
        statusText = 'SELESAI';
    } else if (data.status === 'DITOLAK') {
        statusClass = 'status-ditolak';
        statusText = 'DITOLAK';
    } else if (data.status === 'DALAM PROSES') {
        statusClass = 'status-proses';
        statusText = 'DALAM PROSES';
    }
    
    // Format tanggal dengan fungsi baru
    const tanggalFormatted = formatTanggal(data.tanggalDaftar);
    
    hasilDiv.innerHTML = `
        <div style="border-bottom: 1px solid #dee2e6; padding-bottom: 15px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <h4 style="margin: 0; color: #333;">
                <i class="fas fa-clipboard-check" style="color: #667eea;"></i> 
                Hasil Pencarian
            </h4>
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        
        <div class="status-detail">
            <div class="status-item">
                <div class="status-label">No. Registrasi</div>
                <div class="status-value">${data.noRegistrasi || '-'}</div>
            </div>
            <div class="status-item">
                <div class="status-label">Tanggal Daftar</div>
                <div class="status-value">${tanggalFormatted}</div>
            </div>
            <div class="status-item">
                <div class="status-label">No. Plat</div>
                <div class="status-value">${data.noPlat || '-'}</div>
            </div>
            <div class="status-item">
                <div class="status-label">Kendaraan</div>
                <div class="status-value">${data.merk || ''} ${data.tipe || ''}</div>
            </div>
            <div class="status-item">
                <div class="status-label">No. Rangka</div>
                <div class="status-value">${data.noRangka || '-'}</div>
            </div>
            <div class="status-item">
                <div class="status-label">No. Mesin</div>
                <div class="status-value">${data.noMesin || '-'}</div>
            </div>
            <div class="status-item">
                <div class="status-label">Isi Silinder</div>
                <div class="status-value">${data.isiSilinder || '-'} cc</div>
            </div>
            <div class="status-item">
                <div class="status-label">Tahun</div>
                <div class="status-value">${data.tahun || '-'}</div>
            </div>
            <div class="status-item">
                <div class="status-label">Estimasi</div>
                <div class="status-value">${data.estimasi || '-'}</div>
            </div>
            <div class="status-item">
                <div class="status-label">Lokasi Uji</div>
                <div class="status-value">${data.lokasi || 'Kantor PKB Dishub Konawe'}</div>
            </div>
        </div>
        
        ${data.keterangan && data.keterangan !== '-' ? `
        <div style="margin-top: 15px; padding: 10px; background: #e9ecef; border-radius: 5px;">
            <i class="fas fa-info-circle" style="color: #667eea;"></i> 
            <strong>Keterangan:</strong> ${data.keterangan}
        </div>
        ` : ''}
        
        <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
            ${data.noTelp ? `
            <button onclick="requestNotifikasiWA('${data.noRegistrasi}', '${data.noTelp}')" 
                    style="padding: 8px 20px; background: #25D366; color: white; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fab fa-whatsapp"></i> Minta Notifikasi WA
            </button>
            ` : ''}
            <button onclick="document.getElementById('hasilStatus').style.display='none'; document.getElementById('searchInput').value='';" 
                    style="padding: 8px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-times"></i> Tutup
            </button>
        </div>
    `;
}

// ==================== REQUEST NOTIFIKASI WA ====================
async function requestNotifikasiWA(noRegistrasi, noTelp) {
    try {
        showNotification('Mengirim permintaan notifikasi...', 'info');
        
        // Gunakan JSONP untuk request notifikasi
        const timestamp = new Date().getTime();
        const callbackName = 'waCallback_' + timestamp;
        
        await new Promise((resolve, reject) => {
            window[callbackName] = function(response) {
                if (response && response.status === 'success') {
                    resolve(response);
                } else {
                    reject(new Error(response?.message || 'Gagal mengirim notifikasi'));
                }
                delete window[callbackName];
                document.head.removeChild(script);
            };
            
            const script = document.createElement('script');
            script.src = `${APPS_SCRIPT_URL}?action=requestNotifikasi&noRegistrasi=${encodeURIComponent(noRegistrasi)}&noTelp=${encodeURIComponent(noTelp)}&callback=${callbackName}&t=${timestamp}`;
            
            script.onerror = function() {
                reject(new Error('Gagal terhubung ke server'));
                delete window[callbackName];
                document.head.removeChild(script);
            };
            
            document.head.appendChild(script);
            
            setTimeout(() => {
                if (window[callbackName]) {
                    reject(new Error('Timeout'));
                    delete window[callbackName];
                    document.head.removeChild(script);
                }
            }, 10000);
        });
        
        showNotification('✅ Permintaan notifikasi berhasil dikirim!', 'success');
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('❌ Gagal mengirim permintaan: ' + error.message, 'error');
    }
}

// ==================== SHOW NOTIFICATION ====================
function showNotification(message, type = 'info') {
    // Hapus notifikasi yang sudah ada
    const existingNotification = document.getElementById('formNotification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Buat notifikasi baru
    const notification = document.createElement('div');
    notification.id = 'formNotification';
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
        max-width: 350px;
        white-space: pre-line;
    `;
    
    // Warna berdasarkan type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Tambahkan icon
    const icon = type === 'success' ? '✅' : 
                 type === 'error' ? '❌' : 
                 type === 'warning' ? '⚠️' : 'ℹ️';
    notification.innerHTML = `<span style="margin-right: 8px;">${icon}</span>${message}`;
    
    document.body.appendChild(notification);
    
    // Tambahkan style animasi jika belum ada
    if (!document.getElementById('notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Hapus notifikasi setelah 5 detik
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ==================== RESET FORM ====================
function resetForm() {
    const form = document.getElementById('pendaftaranKIRForm');
    if (form) {
        form.reset();
        
        // Hapus class error
        document.querySelectorAll('.form-control').forEach(field => {
            field.classList.remove('error');
        });
        
        showNotification('Form telah direset', 'info');
    }
}

// ==================== EXPORT FUNCTIONS ====================
window.resetForm = resetForm;
window.testConnection = testConnection;
window.cekStatusPendaftaran = cekStatusPendaftaran;
window.requestNotifikasiWA = requestNotifikasiWA;








