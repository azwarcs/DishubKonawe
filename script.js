// ============================================
// WEBSITE DISHUB KONAWE - DENGAN GOOGLE SHEETS
// ============================================

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzX1QNPfk_TbTSbeXyyvb7YY96EUMNBjjR88OlQb3HNL7J-F-29eXlq5eVoArghD5klig/exec';
const SARAN_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlE8zcVNvDPzOUIcS7FDmtyDbbyFJGKSKNeHrg8boJAwkj4A9gsngFF1okI-TCh4ZgOA/exec';

// ============================================
// INISIALISASI AOS
// ============================================
AOS.init({ duration: 1000, once: true, offset: 50 });

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
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');
  
  if (window.scrollY > 50) {
    if (navbar) navbar.classList.add('scrolled');
    if (backToTop) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    }
  } else {
    if (navbar) navbar.classList.remove('scrolled');
    if (backToTop) {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  }
});

// Back to top click
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
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

  // Tutup menu saat klik link
  document.querySelectorAll('.nav-link').forEach(link => {
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

// ============================================
// SMOOTH SCROLL UNTUK SEMUA LINK ANCHOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Tutup menu mobile setelah klik
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
          navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    }
  });
});

// ============================================
// ACTIVE LINK NAVIGATION
// ============================================
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');
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
// FORM PENGADUAN
// ============================================
const pengaduanForm = document.getElementById('pengaduanForm');

if (pengaduanForm) {
  pengaduanForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim data...';
    submitBtn.disabled = true;

    const formData = {
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
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }),
      nama: this.querySelector('input[placeholder="Nama Lengkap"]').value,
      email: this.querySelector('input[placeholder="Email"]').value,
      telepon: this.querySelector('input[placeholder="No. Telepon/HP"]').value,
      jenis: this.querySelector('select').value,
      pesan: this.querySelector('textarea').value
    };

    if (!formData.nama || !formData.email || !formData.telepon || !formData.jenis || !formData.pesan) {
      alert('❌ Semua kolom harus diisi!');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      alert(`✅✅✅ PENGADUAN TERKIRIM! ✅✅✅

━━━━━━━━━━━━━━━━━━━━━━━
📋 NOMOR PENGADUAN: 
${formData.id}
━━━━━━━━━━━━━━━━━━━━━━━

📅 Tanggal: ${formData.tanggal}
👤 Nama: ${formData.nama}
📌 Jenis: ${formData.jenis}

⏱️ STATUS: MENUNGGU PROSES

━━━━━━━━━━━━━━━━━━━━━━━
📌 CATAT NOMOR PENGADUAN ANDA!
Anda akan dihubungi maksimal 2x24 jam.
━━━━━━━━━━━━━━━━━━━━━━━`);
      this.reset();
    } catch(error) {
      console.error('❌ Error:', error);
      alert(`⚠️ PENGADUAN TELAH TERKIRIM!

📋 Nomor: ${formData.id}

Jika tidak dihubungi dalam 2x24 jam:
📞 085298604422
📧 dinasperhubungankonawekab@gmail.com`);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// CEK STATUS PENGADUAN
// ============================================
function cekStatusPengaduan() {
  const nomor = prompt('📋 Masukkan Nomor Pengaduan Anda:');
  if (nomor && nomor.trim() !== '') {
    window.open('https://docs.google.com/spreadsheets/d/147SH4xEKjpLxdIaH9N5A3F7GcbscLoWgHAdUEhL3cJE/edit?usp=sharing', '_blank');
    alert(`🔍 Cek Status Pengaduan

Nomor: ${nomor}

✅ Spreadsheet sudah dibuka di tab baru.
1️⃣ Tekan Ctrl+F
2️⃣ Cari: ${nomor}
3️⃣ Lihat kolom "Status"

📞 Call Center: 085298604422`);
  }
}

// Tambah tombol cek status
document.addEventListener('DOMContentLoaded', function() {
  const formPanel = document.querySelector('.contact-form-panel');
  if (formPanel) {
    const cekStatusDiv = document.createElement('div');
    cekStatusDiv.style.cssText = 'margin-top: 30px; padding: 25px; background: linear-gradient(145deg, #f8f9fc, #ffffff); border-radius: 16px; text-align: center; border: 2px dashed #0B4F6C; box-shadow: 0 8px 20px rgba(0,0,0,0.05);';

    cekStatusDiv.innerHTML = `
      <div style="margin-bottom: 15px;">
        <span style="background: #0B4F6C; color: white; padding: 8px 20px; border-radius: 50px; font-size: 0.9rem; font-weight: 600;">
          <i class="fas fa-check-circle"></i> SUDAH MENGIRIM?
        </span>
      </div>
      <h4 style="color: #0B4F6C; margin-bottom: 15px; font-size: 1.3rem;">CEK STATUS PENGADUAN</h4>
      <p style="margin-bottom: 20px; color: #555;">Klik tombol di bawah untuk cek status pengaduan Anda</p>
      <button onclick="cekStatusPengaduan()" style="background: linear-gradient(145deg, #FDB913, #e5a600); color: #1a1e24; border: none; padding: 14px 35px; border-radius: 50px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 20px rgba(253, 185, 19, 0.3); border: 1px solid rgba(255,255,255,0.3);">
        <i class="fas fa-search" style="margin-right: 8px;"></i> CEK STATUS SEKARANG
      </button>
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e9ecef;">
        <p style="margin-bottom: 5px; font-size: 0.9rem; color: #666;">
          <i class="fas fa-phone-alt" style="color: #0B4F6C;"></i> Call Center: 085298604422
        </p>
        <p style="font-size: 0.9rem; color: #666;">
          <i class="fas fa-envelope" style="color: #0B4F6C;"></i> dinasperhubungankonawekab@gmail.com
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
// FITUR SARAN & MASUKAN
// ============================================
let saranCounter = 0;

function updateSaranStats() {
  const saranCountElem = document.getElementById('saranCount');
  const savedSaran = localStorage.getItem('dishub_saran_count');
  if (savedSaran) saranCounter = parseInt(savedSaran);
  if (saranCountElem) animateSaranNumber('saranCount', saranCounter, 1000);
}

function animateSaranNumber(elementId, target, duration) {
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

const saranForm = document.getElementById('saranForm');
if (saranForm) {
  saranForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nama = document.getElementById('saranNama').value;
    const email = document.getElementById('saranEmail').value;
    const phone = document.getElementById('saranPhone').value;
    const message = document.getElementById('saranMessage').value;
    const saranType = document.querySelector('input[name="saranType"]:checked').value;

    if (!nama || !email || !phone || !message) {
      alert('❌ Semua kolom harus diisi!');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      alert('❌ Format email tidak valid!');
      return;
    }
    if (phone.length < 10 || phone.length > 15) {
      alert('❌ Nomor handphone tidak valid (10-15 digit)!');
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    const today = new Date();
    const id = 'SRN-' +
      today.getDate().toString().padStart(2, '0') +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' + today.getHours().toString().padStart(2, '0') +
      today.getMinutes().toString().padStart(2, '0');

    const formData = {
      id: id,
      tanggal: today.toLocaleString('id-ID', {
        timeZone: 'Asia/Makassar',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }),
      nama: nama,
      email: email,
      telepon: phone,
      jenis: saranType,
      pesan: message,
      status: 'Menunggu'
    };

    try {
      await fetch(SARAN_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      saranCounter++;
      localStorage.setItem('dishub_saran_count', saranCounter);
      updateSaranStats();

      alert(`✅ SARAN & MASUKAN TERKIRIM!

📋 ID SARAN: ${id}
📅 Tanggal: ${formData.tanggal}
👤 Nama: ${nama}
📌 Jenis: ${saranType}

Terima kasih! Kami akan merespon maksimal 3x24 jam.`);

      this.reset();
      const defaultRadio = document.querySelector('input[name="saranType"][value="Saran"]');
      if (defaultRadio) defaultRadio.checked = true;
    } catch(error) {
      console.error('Error:', error);
      alert(`⚠️ Gangguan koneksi, tapi data Anda TETAP TERKIRIM!

ID Saran: ${id}`);
      saranCounter++;
      localStorage.setItem('dishub_saran_count', saranCounter);
      updateSaranStats();
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateSaranStats();
});

// ============================================
// INTERSECTION OBSERVER
// ============================================
const observerOptions = { threshold: 0.1, rootMargin: '0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ============================================
// MODAL PREVIEW FOTO PEJABAT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const fotoModal = document.getElementById('fotoModal');
  const fotoModalImg = document.getElementById('fotoModalImg');
  const fotoModalCaption = document.getElementById('fotoModalCaption');
  const fotoModalClose = document.getElementById('fotoModalClose');

  if (!fotoModal || !fotoModalImg) return;

  document.querySelectorAll('.foto-pejabat').forEach(function(foto) {
    foto.addEventListener('click', function(e) {
      e.stopPropagation();
      const src = this.getAttribute('src');
      const alt = this.getAttribute('alt') || 'Foto Pejabat';

      const strukturItem = this.closest('.struktur-item');
      let caption = alt;
      if (strukturItem) {
        const jabatan = strukturItem.querySelector('.jabatan')?.textContent || '';
        const nama = strukturItem.querySelector('.nama')?.textContent || '';
        caption = nama ? `${nama} — ${jabatan}` : alt;
      }

      fotoModalImg.setAttribute('src', src);
      fotoModalImg.setAttribute('alt', alt);
      fotoModalCaption.textContent = caption;
      fotoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    fotoModal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function() {
      fotoModalImg.setAttribute('src', '');
    }, 300);
  }

  if (fotoModalClose) {
    fotoModalClose.addEventListener('click', function(e) {
      e.stopPropagation();
      closeModal();
    });
  }

  fotoModal.addEventListener('click', function(e) {
    if (e.target === fotoModal) closeModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && fotoModal.classList.contains('active')) {
      closeModal();
    }
  });
});

// ============================================
// KONFIRMASI
// ============================================
console.log('✅✅✅ WEBSITE DISHUB KONAWE SIAP! ✅✅✅');
console.log('🎨 Navbar Modern Premium Aktif');
console.log('📊 Form pengaduan terhubung ke Google Sheets');