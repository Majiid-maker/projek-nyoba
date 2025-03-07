// Ambil elemen input file, tombol upload, preview foto, dan tombol Klaim Hadiah
const uploadPhoto = document.getElementById('uploadPhoto');
const uploadButton = document.getElementById('uploadButton');
const photo = document.getElementById('photo');
const claimButton = document.getElementById('claimButton');

// Ambil skor dan nama pengguna dari localStorage
const score = localStorage.getItem('score') || 0;
const username = localStorage.getItem('username') || "Pengguna";

// Tampilkan skor dan nama pengguna
document.getElementById('scoreResult').innerText = `Anda mendapatkan ${score} poin!`;
document.getElementById('usernameDisplay').innerText = `Nama: ${username}`;

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
            claimButton.style.display = 'block'; // Tampilkan tombol Klaim Hadiah
            localStorage.setItem('userPhoto', e.target.result); // Simpan foto ke localStorage
        };

        reader.readAsDataURL(file); // Baca file sebagai data URL
    }
});

// Event listener untuk tombol Klaim Hadiah
claimButton.addEventListener('click', function () {
    window.open('https://www.example.com', '_blank'); // Buka link di tab baru
});

// Tombol Main Lagi
document.getElementById('playAgain').addEventListener('click', function () {
    localStorage.removeItem('score'); // Reset skor
    localStorage.removeItem('username'); // Hapus nama pengguna
    localStorage.removeItem('userPhoto'); // Hapus foto pengguna
    window.location.href = 'index.html'; // Kembali ke halaman login
});
