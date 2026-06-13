// ===== LPJU SCRIPT =====
// Global variables
let selectedFile = null;
let currentLocation = {
    lat: null,
    lng: null
};

// Google Apps Script Web App URL (GANTI DENGAN URL DEPLOY ANDA)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynlx3VcxaoM0a0eykk00mPUZq9dSig6kAF40-EHNyK3v7hpsXh8QnRWLMdWFt0SfzQeg/exec';

// DOM Elements
const form = document.getElementById('laporanLPJUForm');
const jenisKerusakan = document.getElementById('jenisKerusakan');
const kerusakanLainGroup = document.getElementById('kerusakanLainGroup');
const fotoInput = document.getElementById('fotoKerusakan');
const fileUploadArea = document.getElementById('fileUploadArea');
const previewContainer = document.getElementById('previewContainer');
const getLocationBtn = document.getElementById('getLocationBtn');
const locationDisplay = document.getElementById('locationDisplay');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const resetBtn = document.getElementById('resetBtn');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Show/hide other kerusakan field
if (jenisKerusakan) {
    jenisKerusakan.addEventListener('change', function() {
        if (this.value === 'Kerusakan lainnya') {
            kerusakanLainGroup.style.display = 'block';
            document.getElementById('kerusakanLain').required = true;
        } else {
            kerusakanLainGroup.style.display = 'none';
            document.getElementById('kerusakanLain').required = false;
        }
    });
}

// File upload handling
if (fileUploadArea && fotoInput) {
    fileUploadArea.addEventListener('click', () => fotoInput.click());
    
    fotoInput.addEventListener('change', handleFileSelect);
    
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.classList.add('dragover');
    });
    
    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.classList.remove('dragover');
    });
    
    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fotoInput.files = files;
            handleFileSelect({ target: fotoInput });
        }
    });
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('Ukuran file terlalu besar! Maksimal 5MB', 'error');
            fotoInput.value = '';
            return;
        }
        
        // Validate file type
        if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
            showToast('Hanya file JPG/PNG yang diperbolehkan!', 'error');
            fotoInput.value = '';
            return;
        }
        
        selectedFile = file;
        
        // Preview image
        const reader = new FileReader();
        reader.onload = function(e) {
            previewContainer.innerHTML = `
                <div class="preview-image">
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="remove-btn" onclick="removeImage()">×</button>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    selectedFile = null;
    fotoInput.value = '';
    previewContainer.innerHTML = '';
}

// Make removeImage available globally
window.removeImage = removeImage;

// Google Maps location
if (getLocationBtn) {
    getLocationBtn.addEventListener('click', openGoogleMaps);
}

function openGoogleMaps() {
    // Get current location first
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            currentLocation.lat = position.coords.latitude;
            currentLocation.lng = position.coords.longitude;
            
            // Open Google Maps at current location
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}`;
            window.open(mapsUrl, '_blank');
            
            showToast('Silakan pilih lokasi lampu yang rusak di Google Maps', 'info');
            
            // Ask user to input coordinates manually after they select
            setTimeout(() => {
                const lat = prompt('Masukkan Latitude dari Google Maps (contoh: -3.8520056):', currentLocation.lat.toFixed(7));
                const lng = prompt('Masukkan Longitude dari Google Maps (contoh: 122.0531679):', currentLocation.lng.toFixed(7));
                if (lat && lng) {
                    // Format koordinat dengan benar
                    let formattedLat = formatCoordinate(lat);
                    let formattedLng = formatCoordinate(lng);
                    setLocation(formattedLat, formattedLng);
                }
            }, 1500);
        }, function(error) {
            // If cannot get location, open default
            const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=-3.851718,122.070339';
            window.open(mapsUrl, '_blank');
            showToast('Gagal mendapat lokasi, silakan cari lokasi manual', 'error');
            
            // Ask user to input coordinates manually
            setTimeout(() => {
                const lat = prompt('Masukkan Latitude dari Google Maps (contoh: -3.8520056):');
                const lng = prompt('Masukkan Longitude dari Google Maps (contoh: 122.0531679):');
                if (lat && lng) {
                    let formattedLat = formatCoordinate(lat);
                    let formattedLng = formatCoordinate(lng);
                    setLocation(formattedLat, formattedLng);
                }
            }, 1000);
        });
    } else {
        const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=-3.851718,122.070339';
        window.open(mapsUrl, '_blank');
        
        // Ask user to input coordinates manually
        setTimeout(() => {
            const lat = prompt('Masukkan Latitude dari Google Maps (contoh: -3.8520056):');
            const lng = prompt('Masukkan Longitude dari Google Maps (contoh: 122.0531679):');
            if (lat && lng) {
                let formattedLat = formatCoordinate(lat);
                let formattedLng = formatCoordinate(lng);
                setLocation(formattedLat, formattedLng);
            }
        }, 1000);
    }
}

// Function to format coordinate correctly
function formatCoordinate(coord) {
    if (!coord) return '';
    
    // Convert to string and trim
    let value = String(coord).trim();
    
    // Replace comma with dot
    value = value.replace(',', '.');
    
    // Remove any spaces
    value = value.replace(/\s/g, '');
    
    // Fix format like -38.520.056 to -38.520056
    // Hapus titik pemisah ribuan yang tidak perlu
    const parts = value.split('.');
    if (parts.length > 2) {
        // Ada lebih dari satu titik, gabungkan
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Convert to number and back to ensure proper format
    const num = parseFloat(value);
    if (!isNaN(num)) {
        value = num.toFixed(7);
    }
    
    return value;
}

function setLocation(lat, lng) {
    // Format koordinat sebelum disimpan
    currentLocation.lat = formatCoordinate(lat);
    currentLocation.lng = formatCoordinate(lng);
    updateLocationDisplay();
}

function updateLocationDisplay() {
    if (currentLocation.lat && currentLocation.lng) {
        latitudeInput.value = currentLocation.lat;
        longitudeInput.value = currentLocation.lng;
        locationDisplay.innerHTML = `📍 Lokasi terpilih: ${currentLocation.lat}, ${currentLocation.lng}<br>
            <a href="https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}" target="_blank">Lihat di Google Maps →</a>
            <br><small>Koordinat ini sudah dalam format yang benar untuk Google Maps</small>`;
        locationDisplay.style.display = 'block';
    }
}

// Form submission
if (form) {
    form.addEventListener('submit', handleSubmit);
}

// Reset button
if (resetBtn) {
    resetBtn.addEventListener('click', resetForm);
}

async function handleSubmit(event) {
    event.preventDefault();
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    if (!selectedFile) {
        showToast('Silakan unggah foto kerusakan!', 'error');
        return;
    }
    
    if (!document.getElementById('pernyataan').checked) {
        showToast('Silakan centang pernyataan!', 'error');
        return;
    }
    
    // Show loading overlay
    showLoading(true);
    
    try {
        // Generate nomor registrasi
        const nomorRegistrasi = generateRegistrasiNumber();
        
        // Format latitude dan longitude dengan benar sebelum dikirim
        let latitude = latitudeInput.value || '';
        let longitude = longitudeInput.value || '';
        
        // Clean up and format coordinates
        if (latitude) {
            latitude = formatCoordinate(latitude);
        }
        if (longitude) {
            longitude = formatCoordinate(longitude);
        }
        
        // Get form data
        const formData = {
            action: 'submit',
            nomorRegistrasi: nomorRegistrasi,
            timestamp: new Date().toISOString(),
            namaPelapor: document.getElementById('namaPelapor').value,
            noHP: document.getElementById('noHP').value,
            alamatPelapor: document.getElementById('alamatPelapor').value,
            namaJalan: document.getElementById('namaJalan').value,
            desa: document.getElementById('desa').value,
            kecamatan: document.getElementById('kecamatan').value,
            latitude: latitude,
            longitude: longitude,
            jenisKerusakan: jenisKerusakan.value,
            kerusakanLain: jenisKerusakan.value === 'Kerusakan lainnya' ? 
                document.getElementById('kerusakanLain').value : '',
            status: 'Menunggu Verifikasi'
        };
        
        // Validate coordinates format
        if (latitude && !isValidCoordinate(latitude, 'lat')) {
            showToast('Format Latitude tidak valid! Gunakan format seperti: -3.8520056', 'error');
            showLoading(false);
            return;
        }
        
        if (longitude && !isValidCoordinate(longitude, 'lng')) {
            showToast('Format Longitude tidak valid! Gunakan format seperti: 122.0531679', 'error');
            showLoading(false);
            return;
        }
        
        // Convert image to base64
        const base64Image = await fileToBase64(selectedFile);
        formData.fotoBase64 = base64Image.split(',')[1];
        
        // Submit to Google Apps Script
        const response = await submitToGoogleSheets(formData);
        
        if (response && response.success) {
            showToast(`Laporan berhasil dikirim! Nomor Registrasi: ${nomorRegistrasi}`, 'success');
            resetForm();
            clearDraft();
            // Send WhatsApp notification
            sendWhatsAppNotification(formData);
        } else {
            throw new Error(response?.message || 'Gagal mengirim laporan');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Gagal mengirim laporan: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Function to validate coordinate format
function isValidCoordinate(coord, type) {
    const num = parseFloat(coord);
    if (isNaN(num)) return false;
    
    if (type === 'lat') {
        return num >= -90 && num <= 90;
    } else if (type === 'lng') {
        return num >= -180 && num <= 180;
    }
    return true;
}

function generateRegistrasiNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `LPJU/${year}${month}${day}/${hours}${minutes}${seconds}`;
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function submitToGoogleSheets(data) {
    try {
        // Using fetch with mode 'cors' untuk bisa membaca response
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            // If CORS issue, store in localStorage as backup
            saveToLocalStorage(data);
            return { success: true, message: 'Laporan disimpan secara lokal', nomorRegistrasi: data.nomorRegistrasi };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        // Save to localStorage as fallback
        saveToLocalStorage(data);
        return { success: true, message: 'Laporan disimpan secara lokal', nomorRegistrasi: data.nomorRegistrasi };
    }
}

// Save to localStorage as backup
function saveToLocalStorage(data) {
    let reports = JSON.parse(localStorage.getItem('lpju_reports') || '[]');
    reports.unshift(data);
    // Keep only last 100 reports
    if (reports.length > 100) reports.pop();
    localStorage.setItem('lpju_reports', JSON.stringify(reports));
}

function sendWhatsAppNotification(data) {
    const phoneNumber = data.noHP;
    const message = `Halo ${data.namaPelapor},

Laporan kerusakan LPJU Anda telah kami terima.

📋 *Detail Laporan:*
• Nomor Registrasi: ${data.nomorRegistrasi}
• Jenis Kerusakan: ${data.jenisKerusakan}
• Lokasi: ${data.namaJalan}, ${data.desa}, ${data.kecamatan}
• Koordinat: ${data.latitude || '-'}, ${data.longitude || '-'}
• Status: Menunggu Verifikasi

Terima kasih atas laporannya. Tim Dishub Konawe akan segera memproses.

*Simpan nomor registrasi ini untuk cek status laporan Anda.*`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Uncomment to open WhatsApp automatically
    // window.open(whatsappUrl, '_blank');
}

function resetForm() {
    form.reset();
    selectedFile = null;
    previewContainer.innerHTML = '';
    kerusakanLainGroup.style.display = 'none';
    locationDisplay.style.display = 'none';
    currentLocation = { lat: null, lng: null };
    latitudeInput.value = '';
    longitudeInput.value = '';
    showToast('Form telah direset', 'info');
}

function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showLoading(show) {
    let overlay = document.querySelector('.loading-overlay');
    if (show) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Mengirim laporan...</p>
            `;
            document.body.appendChild(overlay);
        }
        overlay.style.display = 'flex';
    } else if (overlay) {
        overlay.style.display = 'none';
    }
}

// Auto-save draft functionality
let autoSaveTimeout;
const formInputs = document.querySelectorAll('#laporanLPJUForm input, #laporanLPJUForm select, #laporanLPJUForm textarea');
if (formInputs.length > 0) {
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                saveDraft();
            }, 3000);
        });
    });
}

function saveDraft() {
    const draftData = {
        namaPelapor: document.getElementById('namaPelapor')?.value || '',
        noHP: document.getElementById('noHP')?.value || '',
        alamatPelapor: document.getElementById('alamatPelapor')?.value || '',
        namaJalan: document.getElementById('namaJalan')?.value || '',
        desa: document.getElementById('desa')?.value || '',
        kecamatan: document.getElementById('kecamatan')?.value || '',
        jenisKerusakan: document.getElementById('jenisKerusakan')?.value || '',
        latitude: latitudeInput?.value || '',
        longitude: longitudeInput?.value || '',
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('lpju_draft', JSON.stringify(draftData));
}

function loadDraft() {
    const draft = localStorage.getItem('lpju_draft');
    if (draft) {
        const data = JSON.parse(draft);
        if (data.namaPelapor) document.getElementById('namaPelapor').value = data.namaPelapor;
        if (data.noHP) document.getElementById('noHP').value = data.noHP;
        if (data.alamatPelapor) document.getElementById('alamatPelapor').value = data.alamatPelapor;
        if (data.namaJalan) document.getElementById('namaJalan').value = data.namaJalan;
        if (data.desa) document.getElementById('desa').value = data.desa;
        if (data.kecamatan) document.getElementById('kecamatan').value = data.kecamatan;
        if (data.jenisKerusakan) {
            document.getElementById('jenisKerusakan').value = data.jenisKerusakan;
            if (data.jenisKerusakan === 'Kerusakan lainnya') {
                kerusakanLainGroup.style.display = 'block';
            }
        }
        if (data.latitude && data.longitude) {
            setLocation(data.latitude, data.longitude);
        }
        showToast('Draft form telah dimuat', 'info');
    }
}

// Load draft on page load
loadDraft();

// Clear draft on successful submit
function clearDraft() {
    localStorage.removeItem('lpju_draft');
}

// Fungsi untuk cek status (jika diperlukan)
async function checkStatus(nomorRegistrasi) {
    try {
        const response = await fetch(`${SCRIPT_URL}?action=get&search=${encodeURIComponent(nomorRegistrasi)}`, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            const result = await response.json();
            return result;
        }
        return null;
    } catch (error) {
        console.error('Error checking status:', error);
        return null;
    }
}