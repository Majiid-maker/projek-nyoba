// Ambil elemen video, canvas, dan foto
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('captureButton');

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

// Event listener untuk tombol ambil foto
captureButton.addEventListener('click', capturePhoto);

// Mulai kamera saat tombol "Akses Kamera" diklik
document.getElementById('startCameraButton').addEventListener('click', startCamera);