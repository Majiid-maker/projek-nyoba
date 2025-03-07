// Ambil elemen video, canvas, dan foto
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('captureButton');
const startCameraButton = document.getElementById('startCameraButton');

// Ambil skor dan nama pengguna dari localStorage
const score = localStorage.getItem('score') || 0;
const username = localStorage.getItem('username') || "Pengguna";

// Tampilkan skor dan nama pengguna
document.getElementById('scoreResult').innerText = `Anda mendapatkan ${score} poin!`;
document.getElementById('usernameDisplay').innerText = `Nama: ${username}`;

// Fungsi untuk mengakses kamera
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        // Mulai video secara manual (untuk iOS)
        video.play().catch(error => {
            console.error("Error memulai video:", error);
            alert("Tidak dapat memulai kamera. Pastikan Anda mengizinkan akses kamera.");
        });

        // Tampilkan tombol "Ambil Foto" setelah kamera berhasil diakses
        captureButton.style.display = 'block';
        startCameraButton.style.display = 'none'; // Sembunyikan tombol "Akses Kamera"
    } catch (error) {
        console.error("Error mengakses kamera:", error);
        alert("Tidak dapat mengakses kamera. Pastikan Anda mengizinkan akses kamera.");
    }
}

// Fungsi untuk mengambil foto
function capturePhoto() {
    // Ambil ukuran video
    const width = video.videoWidth;
    const height = video.videoHeight;

    // Set ukuran canvas sesuai dengan video
    canvas.width = width;
    canvas.height = height;

    // Gambar frame video ke canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    // Konversi canvas ke gambar (data URL)
    const photoData = canvas.toDataURL('image/png');
    photo.src = photoData;

    // Sembunyikan video dan tampilkan foto
    video.style.display = 'none';
    photo.style.display = 'block';

    // Simpan foto ke localStorage (opsional)
    localStorage.setItem('userPhoto', photoData);
}

// Fungsi untuk berbagi hasil skor dan foto
async function shareScore() {
    const score = localStorage.getItem('score') || 0;
    const username = localStorage.getItem('username') || "Pengguna";
    const photoData = localStorage.getItem('userPhoto'); // Data URL foto

    // Buat teks yang akan dibagikan
    const shareText = `Hai, saya ${username} mendapatkan skor ${score} poin di kuis ini!`;

    try {
        if (navigator.share) {
            // Jika Web Share API didukung
            await navigator.share({
                title: 'Hasil Kuis Saya',
                text: shareText,
                url: photoData, // Jika foto disimpan sebagai URL
            });
        } else {
            // Jika Web Share API tidak didukung, tampilkan pesan
            alert("Fitur berbagi tidak didukung di browser ini. Silakan salin teks secara manual.");
        }
    } catch (error) {
        console.error("Error berbagi:", error);
        alert("Gagal berbagi. Silakan coba lagi.");
    }
}

// Event listener untuk tombol "Akses Kamera"
startCameraButton.addEventListener('click', startCamera);

// Event listener untuk tombol "Ambil Foto"
captureButton.addEventListener('click', capturePhoto);

// Tambahkan tombol share
const shareButton = document.createElement('button');
shareButton.innerText = 'Bagikan Hasil';
shareButton.id = 'shareButton';
shareButton.addEventListener('click', shareScore);
document.querySelector('.container').appendChild(shareButton);

// Tombol Main Lagi
document.getElementById('playAgain').addEventListener('click', function () {
    localStorage.removeItem('score'); // Reset skor
    localStorage.removeItem('username'); // Hapus nama pengguna
    localStorage.removeItem('userPhoto'); // Hapus foto pengguna
    window.location.href = 'index.html'; // Kembali ke halaman login
});
