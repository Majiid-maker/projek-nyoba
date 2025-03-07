const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path ke file JSON
const leaderboardFilePath = path.join(__dirname, 'leaderboard.json');

// Fungsi untuk membaca leaderboard dari file
function readLeaderboard() {
    if (!fs.existsSync(leaderboardFilePath)) {
        return [];
    }
    const data = fs.readFileSync(leaderboardFilePath, 'utf8');
    return JSON.parse(data);
}

// Fungsi untuk menulis leaderboard ke file
function writeLeaderboard(leaderboard) {
    fs.writeFileSync(leaderboardFilePath, JSON.stringify(leaderboard, null, 2));
}

// Endpoint untuk menyimpan skor
app.post('/save-score', (req, res) => {
    const { username, score } = req.body;
    if (!username || !score) {
        return res.status(400).json({ error: 'Username dan score diperlukan' });
    }

    // Baca leaderboard dari file
    let leaderboard = readLeaderboard();

    // Tambahkan data ke leaderboard
    leaderboard.push({ username, score });
    leaderboard.sort((a, b) => b.score - a.score); // Urutkan dari skor tertinggi ke terendah
    leaderboard = leaderboard.slice(0, 10); // Batasi hanya 10 skor teratas

    // Simpan leaderboard ke file
    writeLeaderboard(leaderboard);

    res.json({ message: 'Skor berhasil disimpan', leaderboard });
});

// Endpoint untuk mengambil leaderboard
app.get('/leaderboard', (req, res) => {
    const leaderboard = readLeaderboard();
    res.json(leaderboard);
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
