// Initialize Flatpickr for date inputs
document.addEventListener('DOMContentLoaded', function() {
    // Date picker configuration
    flatpickr("#startDate", {
        locale: "id",
        minDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "j F Y",
        onChange: function(selectedDates, dateStr, instance) {
            // Set min date for end date
            if (dateStr) {
                endDatePicker.set('minDate', dateStr);
            }
        }
    });
    
    const endDatePicker = flatpickr("#endDate", {
        locale: "id",
        minDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "j F Y"
    });
    
    // File upload handling with clear button
    const fileInput = document.getElementById('ktpUpload');
    const clearBtn = document.getElementById('clearFileBtn');
    const fileInfo = document.getElementById('fileInfo');
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                showMessage('Ukuran file maksimal 2MB!', 'error');
                fileInput.value = '';
                clearBtn.style.display = 'none';
                fileInfo.innerHTML = '';
                return;
            }
            
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                showMessage('Format file harus JPG, JPEG, PNG, atau PDF!', 'error');
                fileInput.value = '';
                clearBtn.style.display = 'none';
                fileInfo.innerHTML = '';
                return;
            }
            
            fileInfo.innerHTML = `<i class="fas fa-check-circle" style="color: green;"></i> File terpilih: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
            clearBtn.style.display = 'inline-flex';
        } else {
            clearBtn.style.display = 'none';
            fileInfo.innerHTML = '';
        }
    });
    
    clearBtn.addEventListener('click', function() {
        fileInput.value = '';
        clearBtn.style.display = 'none';
        fileInfo.innerHTML = '';
        showMessage('File berhasil dihapus', 'success');
    });
    
    // Form submission
    const form = document.getElementById('rentalForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all required fields
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.disabled = true;
        
        try {
            // Prepare form data
            const formData = new FormData(form);
            
            // Get file as base64 for Google Apps Script
            const file = fileInput.files[0];
            let fileBase64 = '';
            let fileName = '';
            
            if (file) {
                fileBase64 = await fileToBase64(file);
                fileName = file.name;
            }
            
            // Prepare data object
            const requestData = {
                fullname: formData.get('fullname'),
                phone: formData.get('phone'),
                village: formData.get('village'),
                district: formData.get('district'),
                address: formData.get('address'),
                quantity: formData.get('quantity'),
                purpose: formData.get('purpose'),
                startDate: formData.get('startDate'),
                endDate: formData.get('endDate'),
                fileName: fileName,
                fileBase64: fileBase64,
                timestamp: new Date().toISOString()
            };
            
            // Send to Google Apps Script Web App URL
            // GANTI URL_INI_DENGAN_URL_DEPLOY_APPS_SCRIPT_ANDA
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxD7gKDDQy0NoBxDpgXeQRGgGH2Jgi4I_x5eWrvuiXOtPMOBdwT6kI8oQjPwRopHo/exec';
            
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Untuk testing, bisa diganti 'cors' jika sudah deploy
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
            
            // Simulate success (since no-cors doesn't return response)
            showMessage('Pengajuan peminjaman berhasil dikirim! Petugas akan menghubungi Anda dalam 1x24 jam.', 'success');
            form.reset();
            clearBtn.style.display = 'none';
            fileInfo.innerHTML = '';
            
            // Reset date pickers
            const startPicker = document.querySelector("#startDate")._flatpickr;
            const endPicker = document.querySelector("#endDate")._flatpickr;
            if (startPicker) startPicker.clear();
            if (endPicker) endPicker.clear();
            
        } catch (error) {
            console.error('Error:', error);
            showMessage('Terjadi kesalahan. Silakan coba lagi atau hubungi admin.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Reset button handler
    const resetBtn = document.querySelector('.btn-reset');
    resetBtn.addEventListener('click', function() {
        setTimeout(() => {
            clearBtn.style.display = 'none';
            fileInfo.innerHTML = '';
            const startPicker = document.querySelector("#startDate")._flatpickr;
            const endPicker = document.querySelector("#endDate")._flatpickr;
            if (startPicker) startPicker.clear();
            if (endPicker) endPicker.clear();
            showMessage('Form telah direset', 'success');
        }, 100);
    });
});

// Helper function to validate form
function validateForm() {
    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const village = document.getElementById('village').value.trim();
    const district = document.getElementById('district').value.trim();
    const address = document.getElementById('address').value.trim();
    const quantity = document.getElementById('quantity').value;
    const purpose = document.getElementById('purpose').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const file = document.getElementById('ktpUpload').files[0];
    
    if (!fullname || !phone || !village || !district || !address || !quantity || !purpose || !startDate || !endDate) {
        showMessage('Semua field wajib diisi!', 'error');
        return false;
    }
    
    // Validate phone number (min 10 digits)
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(phone)) {
        showMessage('Nomor telepon harus 10-13 digit angka!', 'error');
        return false;
    }
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
        showMessage('Tanggal selesai harus setelah tanggal mulai!', 'error');
        return false;
    }
    
    if (!file) {
        showMessage('Harap upload KTP/E-KTP!', 'error');
        return false;
    }
    
    return true;
}

// Helper function to show message
function showMessage(msg, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = msg;
    messageDiv.className = `form-message ${type}`;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'form-message';
    }, 5000);
}

// Helper function to convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


// ==================== INISIALISASI SCRIPT 2====================

// ==================== INISIALISASI ====================
let startDatePicker, endDatePicker;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Flatpickr
    initDatePickers();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize form handlers
    initFormHandlers();
    
    // Initialize button handlers
    initButtonHandlers();
});

// ==================== DATE PICKERS ====================
function initDatePickers() {
    startDatePicker = flatpickr("#startDate", {
        locale: "id",
        minDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "j F Y",
        onChange: function(selectedDates, dateStr) {
            if (dateStr && endDatePicker) {
                endDatePicker.set('minDate', dateStr);
            }
        }
    });
    
    endDatePicker = flatpickr("#endDate", {
        locale: "id",
        minDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "j F Y"
    });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    // Get navigation links
    const berandaLink = document.getElementById('berandaLink');
    const layananLink = document.getElementById('layananLink');
    const mobileBeranda = document.getElementById('mobileBeranda');
    const mobileLayanan = document.getElementById('mobileLayanan');
    const logo = document.querySelector('.logo-area');
    
    // // Beranda link handler
    // if (berandaLink) {
    //     berandaLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'https://dishub.kotax.gov.id'; // Ganti dengan URL website Dishub Anda
    //     });
    // }
    
    // // Layanan link handler
    // if (layananLink) {
    //     layananLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'https://dishub.kotax.gov.id/layanan'; // Ganti dengan URL layanan Dishub Anda
    //     });
    // }
    
    // // Mobile Beranda handler
    // if (mobileBeranda) {
    //     mobileBeranda.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'https://dishub.kotax.gov.id'; // Ganti dengan URL website Dishub Anda
    //         closeMobileMenu();
    //     });
    // }
    
    // // Mobile Layanan handler
    // if (mobileLayanan) {
    //     mobileLayanan.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'https://dishub.kotax.gov.id/layanan'; // Ganti dengan URL layanan Dishub Anda
    //         closeMobileMenu();
    //     });
    // }
    
    // // Logo click handler
    // if (logo) {
    //     logo.addEventListener('click', function() {
    //         window.location.href = 'https://dishub.kotax.gov.id'; // Ganti dengan URL website Dishub Anda
    //     });
    // }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        if (mobileBtn) mobileBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==================== FORM HANDLERS ====================
function initFormHandlers() {
    const form = document.getElementById('rentalForm');
    const fileInput = document.getElementById('ktpUpload');
    const clearBtn = document.getElementById('clearFileBtn');
    const fileInfo = document.getElementById('fileInfo');
    const resetBtn = document.querySelector('.btn-reset');
    
    if (!form) return;
    
    // File input handler
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    showNotification('Ukuran file maksimal 2MB!', 'error');
                    fileInput.value = '';
                    if (clearBtn) clearBtn.style.display = 'none';
                    if (fileInfo) fileInfo.innerHTML = '';
                    return;
                }
                
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    showNotification('Format file harus JPG, JPEG, PNG, atau PDF!', 'error');
                    fileInput.value = '';
                    if (clearBtn) clearBtn.style.display = 'none';
                    if (fileInfo) fileInfo.innerHTML = '';
                    return;
                }
                
                if (fileInfo) {
                    fileInfo.innerHTML = `<i class="fas fa-check-circle" style="color: green;"></i> File terpilih: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
                }
                if (clearBtn) clearBtn.style.display = 'inline-flex';
            }
        });
    }
    
    // Clear button handler
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (fileInput) fileInput.value = '';
            clearBtn.style.display = 'none';
            if (fileInfo) fileInfo.innerHTML = '';
            showNotification('File berhasil dihapus', 'success');
        });
    }
    
    // Form submit handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            const file = fileInput.files[0];
            let fileBase64 = '';
            let fileName = '';
            
            if (file) {
                fileBase64 = await fileToBase64(file);
                fileName = file.name;
            }
            
            const requestData = {
                fullname: formData.get('fullname'),
                phone: formData.get('phone'),
                village: formData.get('village'),
                district: formData.get('district'),
                address: formData.get('address'),
                quantity: formData.get('quantity'),
                purpose: formData.get('purpose'),
                startDate: formData.get('startDate'),
                endDate: formData.get('endDate'),
                fileName: fileName,
                fileBase64: fileBase64,
                timestamp: new Date().toISOString()
            };
            
            // ==================== INTEGRASI GOOGLE APPS SCRIPT ====================
            // Ganti URL_INI_DENGAN_URL_DEPLOY_APPS_SCRIPT_ANDA
            // const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
            
            // Untuk demo, simpan ke localStorage (hapus ini jika sudah pakai Apps Script)
            saveToLocalStorage(requestData);
            
            // TAMPILAN NOTIFIKASI SUKSES YANG LEBIH BAIK
            showSuccessNotification();
            
            // Reset form setelah sukses
            form.reset();
            if (clearBtn) clearBtn.style.display = 'none';
            if (fileInfo) fileInfo.innerHTML = '';
            if (startDatePicker) startDatePicker.clear();
            if (endDatePicker) endDatePicker.clear();
            
        } catch (error) {
            console.error('Error:', error);
            showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Reset handler
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            setTimeout(() => {
                if (clearBtn) clearBtn.style.display = 'none';
                if (fileInfo) fileInfo.innerHTML = '';
                if (startDatePicker) startDatePicker.clear();
                if (endDatePicker) endDatePicker.clear();
                showNotification('Form telah direset', 'success');
            }, 100);
        });
    }
}

// ==================== NOTIFIKASI SUKSES DENGAN TAMPILAN MENARIK ====================
function showSuccessNotification() {
    // Membuat elemen notifikasi khusus untuk sukses
    const notification = document.createElement('div');
    notification.className = 'custom-success-notification';
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="notification-content">
            <h4><i class="fas fa-road-barrier"></i> Pengajuan Peminjaman Berhasil!</h4>
            <p>Pengajuan peminjaman road barrier Anda telah berhasil dikirim.</p>
            <p><strong>Petugas akan menghubungi Anda dalam 1x24 jam melalui nomor WhatsApp/telepon yang terdaftar.</strong></p>
            <div class="notification-details">
                <small><i class="fas fa-clock"></i> Waktu pengajuan: ${new Date().toLocaleString('id-ID')}</small>
            </div>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Style untuk notifikasi
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 450px;
        width: 90%;
        display: flex;
        gap: 1rem;
        animation: slideInModal 0.3s ease;
        border-left: 5px solid #10b981;
    `;
    
    // Tambahkan style untuk elemen di dalam notifikasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInModal {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        .custom-success-notification .notification-icon i {
            font-size: 3rem;
            color: #10b981;
        }
        
        .custom-success-notification .notification-content h4 {
            color: #1e293b;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .custom-success-notification .notification-content p {
            color: #475569;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .custom-success-notification .notification-content strong {
            color: #0d6efd;
        }
        
        .custom-success-notification .notification-details {
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid #e2e8f0;
        }
        
        .custom-success-notification .notification-details small {
            color: #94a3b8;
            font-size: 0.75rem;
        }
        
        .custom-success-notification .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #94a3b8;
            align-self: flex-start;
            padding: 0;
            margin-left: auto;
        }
        
        .custom-success-notification .notification-close:hover {
            color: #ef4444;
        }
        
        /* Overlay */
        .notification-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Buat overlay
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
    document.body.style.overflow = 'hidden';
    
    // Fungsi untuk menutup notifikasi
    const closeNotification = () => {
        notification.remove();
        overlay.remove();
        document.body.style.overflow = '';
    };
    
    // Tutup dengan tombol close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', closeNotification);
    
    // Tutup dengan klik overlay
    overlay.addEventListener('click', closeNotification);
    
    // Auto close setelah 8 detik
    setTimeout(closeNotification, 8000);
}

// ==================== NOTIFIKASI REGULAR ====================
function showNotification(msg, type) {
    // Buat notifikasi temporary yang lebih halus
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${msg}</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0d6efd'};
        color: white;
        padding: 0.75rem 1.25rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// ==================== VALIDATION ====================
function validateForm() {
    const fullname = document.getElementById('fullname')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const village = document.getElementById('village')?.value.trim();
    const district = document.getElementById('district')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const quantity = document.getElementById('quantity')?.value;
    const purpose = document.getElementById('purpose')?.value;
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    const file = document.getElementById('ktpUpload')?.files[0];
    
    if (!fullname || !phone || !village || !district || !address || !quantity || !purpose || !startDate || !endDate) {
        showNotification('Semua field wajib diisi!', 'error');
        return false;
    }
    
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('Nomor telepon harus 10-13 digit angka!', 'error');
        return false;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
        showNotification('Tanggal selesai harus setelah tanggal mulai!', 'error');
        return false;
    }
    
    if (!file) {
        showNotification('Harap upload KTP/E-KTP!', 'error');
        return false;
    }
    
    return true;
}

// ==================== BUTTON HANDLERS ====================
function initButtonHandlers() {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
    }
    
    // Search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showNotification('Fitur pencarian akan segera hadir!', 'info');
        });
    }
    
    // Contact buttons
    const contactBtn = document.getElementById('contactBtn');
    const mobileContactBtn = document.querySelector('.mobile-contact-btn');
    
    const showContact = () => {
        showNotification('Hubungi Dinas Perhubungan: Telp/wa (085298604422)', 'info');
    };
    
    if (contactBtn) contactBtn.addEventListener('click', showContact);
    if (mobileContactBtn) mobileContactBtn.addEventListener('click', showContact);
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileBtn && mobileBtn.contains(event.target);
            if (!isClickInsideMenu && !isClickOnButton) {
                closeMobileMenu();
            }
        }
    });
}

// ==================== HELPER FUNCTIONS ====================
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function saveToLocalStorage(data) {
    let submissions = localStorage.getItem('peminjamanBarrier');
    submissions = submissions ? JSON.parse(submissions) : [];
    submissions.push(data);
    localStorage.setItem('peminjamanBarrier', JSON.stringify(submissions));
    console.log('Data saved:', data);
}