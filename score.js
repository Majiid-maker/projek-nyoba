// Ambil elemen input file, tombol upload, preview foto, dan tombol Klaim Hadiah
const uploadPhoto = document.getElementById('uploadPhoto');
const uploadButton = document.getElementById('uploadButton');
const photo = document.getElementById('photo');
const claimButton = document.getElementById('claimButton');

// Inisialisasi skor ke 0 jika tidak ada skor yang tersimpan
let score = parseInt(localStorage.getItem('score')) || 0;
const username = localStorage.getItem('username') || "Pengguna";

// Tampilkan skor dan nama pengguna
document.getElementById('scoreResult').innerText = `Anda mendapatkan ${score} poin!`;
document.getElementById('usernameDisplay').innerText = `Nama: ${username}`;

// Menentukan keterangan berdasarkan skor
let keterangan = "";
if (score >= 0 && score <= 40) {
    keterangan = "Kurang";
} else if (score === 60) {
    keterangan = "Cukup";
} else if (score === 80) {
    keterangan = "Bagus";
} else if (score === 100) {
    keterangan = "Sempurna";
}

// Menambahkan keterangan di bawah nama pengguna
const keteranganElement = document.createElement('p');
keteranganElement.innerText = `Keterangan: ${keterangan}`;
document.getElementById('usernameDisplay').after(keteranganElement);

// Periksa apakah ada foto yang sudah tersimpan
const savedPhoto = localStorage.getItem('userPhoto');
if (savedPhoto) {
    photo.src = savedPhoto;
    photo.style.display = 'block';
}

// Fungsi untuk mengecek apakah tombol klaim hadiah bisa muncul
function checkClaimButton() {
    if (score === 100 && photo.src) {
        claimButton.style.display = 'block';
    } else {
        claimButton.style.display = 'none';
    }
}

// Event listener untuk tombol upload
uploadButton.addEventListener('click', function () {
    uploadPhoto.click(); // Memicu klik pada input file
});

// Event listener untuk input file
uploadPhoto.addEventListener('change', function (event) {
    const file = event.target.files[0]; // Ambil file yang diupload
    if (file) {
        const reader = new FileReader(); // Buat FileReader untuk membaca file

        // Saat file selesai dibaca
        reader.onload = function (e) {
            photo.src = e.target.result; // Tampilkan foto di elemen <img>
            photo.style.display = 'block'; // Tampilkan foto
            localStorage.setItem('userPhoto', e.target.result); // Simpan foto ke localStorage

            checkClaimButton(); // Cek apakah tombol klaim hadiah bisa muncul
        };

        reader.readAsDataURL(file); // Baca file sebagai data URL
    }
});

// Cek saat halaman dimuat
checkClaimButton();

// Event listener untuk tombol Klaim Hadiah
claimButton.addEventListener('click', function () {
    window.open('https://www.example.com', '_blank'); // Buka link di tab baru
});

// Tombol Main Lagi
document.getElementById('playAgain').addEventListener('click', function () {
    // Reset skor ke 0
    localStorage.setItem('score', 0);

    // Hapus data lainnya
    localStorage.removeItem('username');
    localStorage.removeItem('userPhoto');

    // Redirect ke halaman login
    window.location.href = 'index.html';
});
