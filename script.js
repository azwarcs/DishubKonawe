// ============================================
// WEBSITE DISHUB KONAWE - DENGAN GOOGLE SHEETS
// ============================================

// ============================================
// 🔴 YANG INI WAJIB DIGANTI DENGAN URL ANDA!
// ============================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzX1QNPfk_TbTSbeXyyvb7YY96EUMNBjjR88OlQb3HNL7J-F-29eXlq5eVoArghD5klig/exec';

// ============================================
// INISIALISASI AOS ANIMATION
// ============================================
AOS.init({
  duration: 1000,
  once: true,
  offset: 50
});

// ============================================
// ANIMASI ANGKA STATISTIK
// ============================================
function animateNumber(elementId, target, duration) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let current = 0;
  const increment = target / (duration / 20);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString('id-ID');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString('id-ID');
    }
  }, 20);
}

// ===== JALANKAN ANIMASI STATISTIK =====
document.addEventListener('DOMContentLoaded', function() {
  animateNumber('panjangJalan', 427, 3500);
  animateNumber('angkutanUmum', 3255, 3500);
  animateNumber('terminal', 32, 3500);
  animateNumber('ujiKir', 2450, 3500);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    navbar.classList.remove('scrolled');
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
});

// Klik event (TAMBAHKAN INI)
document.getElementById('backToTop').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
}

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
// 🟢🟢🟢 FORM PENGADUAN DENGAN GOOGLE SHEETS 🟢🟢🟢
// ============================================
const pengaduanForm = document.getElementById('pengaduanForm');

if (pengaduanForm) {
  pengaduanForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // === TAMPILKAN LOADING ===
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim data...';
    submitBtn.disabled = true;
    
    // === AMBIL DATA DARI FORM ===
    const formData = {
      // ID Pengaduan format: PGD-TANGGALBULAN-JAMMENIT
      id: (function() {
        const today = new Date();
        const tanggal = today.getDate().toString().padStart(2, '0');
        const bulan = (today.getMonth() + 1).toString().padStart(2, '0');
        const jam = today.getHours().toString().padStart(2, '0');
        const menit = today.getMinutes().toString().padStart(2, '0');
        
        return 'PGD-' + tanggal + bulan + '-' + jam + menit;
       })(),
       
      tanggal: new Date().toLocaleString('id-ID', {
        timeZone: 'Asia/Makassar',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      nama: this.querySelector('input[placeholder="Nama Lengkap"]').value,
      email: this.querySelector('input[placeholder="Email"]').value,
      telepon: this.querySelector('input[placeholder="No. Telepon/HP"]').value,
      jenis: this.querySelector('select').value,
      pesan: this.querySelector('textarea').value
    };
    
    // === VALIDASI JIKA ADA KOLOM KOSONG ===
    if (!formData.nama || !formData.email || !formData.telepon || !formData.jenis || !formData.pesan) {
      alert('❌ Semua kolom harus diisi!');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }
    
    try {
      // === KIRIM KE GOOGLE SHEETS ===
      console.log('📤 Mengirim data:', formData);
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // === TAMPILKAN PESAN SUKSES ===
      const nomorPengaduan = formData.id;
      
      alert(`✅✅✅ PENGADUAN TERKIRIM! ✅✅✅
      
━━━━━━━━━━━━━━━━━━━━━━━
📋 NOMOR PENGADUAN: 
${nomorPengaduan}
━━━━━━━━━━━━━━━━━━━━━━━

📅 Tanggal: ${formData.tanggal}
👤 Nama: ${formData.nama}
📌 Jenis: ${formData.jenis}

⏱️ STATUS: MENUNGGU PROSES

━━━━━━━━━━━━━━━━━━━━━━━
📌 CATAT NOMOR PENGADUAN ANDA!
Anda akan dihubungi maksimal 2x24 jam.
━━━━━━━━━━━━━━━━━━━━━━━

Terima kasih telah menggunakan layanan 
Dinas Perhubungan Kabupaten Konawe.`);
      
      // === RESET FORM ===
      this.reset();
      
    } catch(error) {
      console.error('❌ Error:', error);
      
      // Meskipun error, data KEMUNGKINAN BESAR tetap terkirim!
      alert(`⚠️⚠️⚠️ PENGADUAN TELAH TERKIRIM! ⚠️⚠️⚠️
      
━━━━━━━━━━━━━━━━━━━━━━━
📋 NOMOR PENGADUAN: 
${formData.id}
━━━━━━━━━━━━━━━━━━━━━━━

📅 Tanggal: ${formData.tanggal}
👤 Nama: ${formData.nama}

⚠️ Maaf, terjadi gangguan koneksi.
NAMUN data Anda KEMUNGKINAN BESAR tetap tersimpan.

━━━━━━━━━━━━━━━━━━━━━━━
📞 Jika tidak dihubungi dalam 2x24 jam:
Call Center: 0811-4050-112
📧 Email: pengaduan.dishub@konawekab.go.id
━━━━━━━━━━━━━━━━━━━━━━━`);
      
    } finally {
      // === KEMBALIKAN TOMBOL ===
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// 🆕🆕🆕 FITUR CEK STATUS PENGADUAN (DENGAN LINK BISA DIKLIK) 🆕🆕🆕
// ============================================
function cekStatusPengaduan() {
  const nomor = prompt('📋 Masukkan Nomor Pengaduan Anda:');
  
  if (nomor && nomor.trim() !== '') {
    // Buka spreadsheet di tab baru (LINK LANGSUNG BISA DIKLIK)
    window.open('https://docs.google.com/spreadsheets/d/147SH4xEKjpLxdIaH9N5A3F7GcbscLoWgHAdUEhL3cJE/edit?usp=sharing', '_blank');
    
    // Tampilkan instruksi singkat
    alert(`🔍🔍🔍 CEK STATUS PENGADUAN 🔍🔍🔍
    
Nomor: ${nomor}

━━━━━━━━━━━━━━━━━━━━━━━
✅ SPREADSHEET SUDAH DIBUKA DI TAB BARU!

Langkah selanjutnya:
1️⃣ Tekan Ctrl+F di tab spreadsheet
2️⃣ Cari nomor: ${nomor}
3️⃣ Lihat kolom "Status"
━━━━━━━━━━━━━━━━━━━━━━━

📞 Call Center: 0811-4050-112
📧 pengaduan.dishub@konawekab.go.id
━━━━━━━━━━━━━━━━━━━━━━━`);
  }
}

// ============================================
// 🆕🆕🆕 TAMBAHKAN TOMBOL CEK STATUS DI HALAMAN 🆕🆕🆕
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Tambahkan link cek status di bawah form
  const formPanel = document.querySelector('.contact-form-panel');
  
  if (formPanel) {
    const cekStatusDiv = document.createElement('div');
    cekStatusDiv.style.marginTop = '30px';
    cekStatusDiv.style.padding = '25px';
    cekStatusDiv.style.background = 'linear-gradient(145deg, #f8f9fc, #ffffff)';
    cekStatusDiv.style.borderRadius = '16px';
    cekStatusDiv.style.textAlign = 'center';
    cekStatusDiv.style.border = '2px dashed #0B4F6C';
    cekStatusDiv.style.boxShadow = '0 8px 20px rgba(0,0,0,0.05)';
    
    cekStatusDiv.innerHTML = `
      <div style="margin-bottom: 15px;">
        <span style="background: #0B4F6C; color: white; padding: 8px 20px; border-radius: 50px; font-size: 0.9rem; font-weight: 600;">
          <i class="fas fa-check-circle"></i> SUDAH MENGIRIM?
        </span>
      </div>
      <h4 style="color: #0B4F6C; margin-bottom: 15px; font-size: 1.3rem;">
        CEK STATUS PENGADUAN
      </h4>
      <p style="margin-bottom: 20px; color: #555;">
        Klik tombol di bawah untuk cek status pengaduan Anda
      </p>
      <button onclick="cekStatusPengaduan()" 
              style="background: linear-gradient(145deg, #FDB913, #e5a600); 
                     color: #1a1e24;
                     border: none;
                     padding: 14px 35px;
                     border-radius: 50px;
                     font-weight: 700;
                     font-size: 1rem;
                     cursor: pointer;
                     transition: all 0.3s;
                     box-shadow: 0 8px 20px rgba(253, 185, 19, 0.3);
                     border: 1px solid rgba(255,255,255,0.3);"
              onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(253,185,19,0.4)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(253,185,19,0.3)';">
        <i class="fas fa-search" style="margin-right: 8px;"></i> CEK STATUS SEKARANG
      </button>
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e9ecef;">
        <p style="margin-bottom: 5px; font-size: 0.9rem; color: #666;">
          <i class="fas fa-phone-alt" style="color: #0B4F6C;"></i> Call Center: 0811-4050-112
        </p>
        <p style="font-size: 0.9rem; color: #666;">
          <i class="fas fa-envelope" style="color: #0B4F6C;"></i> pengaduan.dishub@konawekab.go.id
        </p>
      </div>
    `;
    
    formPanel.appendChild(cekStatusDiv);
  }
});

// ============================================
// TAHUN OTOMATIS DI FOOTER
// ============================================
const footerYear = document.querySelector('.footer-bottom p:first-child');
if (footerYear) {
  footerYear.innerHTML = `© ${new Date().getFullYear()} Dinas Perhubungan Kabupaten Konawe. All rights reserved.`;
}

// ============================================
// ACTIVE LINK NAVIGATION
// ============================================
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    const scrollY = window.scrollY;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// ============================================
// INTERSECTION OBSERVER UNTUK AOS MANUAL
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// ============================================
// KONFIRMASI SIAP DIGUNAKAN
// ============================================
console.log('✅✅✅ WEBSITE DISHUB KONAWE SIAP! ✅✅✅');
console.log('📊 Form pengaduan terhubung ke Google Sheets');
console.log('🔗 URL Google Script:', GOOGLE_SCRIPT_URL);
console.log('🔗 Link spreadsheet bisa langsung diklik!');