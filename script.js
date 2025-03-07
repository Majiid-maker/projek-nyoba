const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('nextButton');
const questionTitle = document.getElementById('questionTitle');

const quizQuestions = [
    {
        question: "Mana club liga jerman?",
        image: "images/cat.png",
        answers: {
            a: { text: "Real Madrid", image: "images/rm.png" },
            b: { text: "Bayern Munchen", image: "images/bayern.png" },
            c: { text: "Real Betis", image: "images/rb.png" },
            d: { text: "Barcelona", image: "images/fbc.png" }
        },
        correctAnswer: "b"
    },
    {
        question: "Manakah foto Majiid papi smaga?",
        image: "images/cat.png",
        answers: {
            a: { text: "Kucing", image: "images/gambar1.jpg" },
            b: { text: "Anjing", image: "images/gambar2.jpg" }
        },
        correctAnswer: "a"
    },
    {
        question: "Ibu kota Indonesia adalah?",
        answers: {
            a: "Jakarta",
            b: "Bandung",
            c: "Surabaya",
            d: "Jogja"
        },
        correctAnswer: "a"
    },
    {
        question: "Berapakah hasil dari 5 + 7?",
        answers: {
            a: "10",
            b: "12",
            c: "14",
            d: "16"
        },
        correctAnswer: "b"
    },
    {
        question: "Apa warna langit pada siang hari yang cerah?",
        answers: {
            a: "Merah",
            b: "Biru",
            c: "Hijau",
            d: "Kelabu"
        },
        correctAnswer: "b"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Ambil indeks soal dari URL
const urlParams = new URLSearchParams(window.location.search);
currentQuestionIndex = parseInt(urlParams.get('question')) - 1;

// Inisialisasi skor dari localStorage jika ada
if (localStorage.getItem('score')) {
    score = parseInt(localStorage.getItem('score'));
}

function loadQuestion() {
    // Jika soal sudah habis, arahkan ke halaman skor
    if (currentQuestionIndex >= quizQuestions.length) {
        localStorage.setItem('score', score); // Simpan skor
        window.location.href = 'score.html'; // Arahkan ke halaman skor
        return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionTitle.innerHTML = `<span class="question-title">Soal ${currentQuestionIndex + 1}: ${currentQuestion.question}</span>`;

    // Tampilkan gambar soal di container terpisah
    const questionImageContainer = document.getElementById('questionImageContainer');
    questionImageContainer.innerHTML = '';
    if (currentQuestion.image) {
        questionImageContainer.innerHTML = `<img src="${currentQuestion.image}" alt="Gambar Soal" class="question-image">`;
    }

    // Tampilkan opsi jawaban di container quiz-grid
    let answersHTML = '';
    for (let letter in currentQuestion.answers) {
        if (currentQuestion.image) {
            // Jika soal memiliki gambar, tampilkan jawaban dengan gambar
            answersHTML += `
                <button data-answer="${letter}" class="answer-button">
                    <img src="${currentQuestion.answers[letter].image}" alt="Gambar Jawaban ${currentQuestion.answers[letter].text}" class="answer-image">
                    <span>${currentQuestion.answers[letter].text}</span>
                </button>
            `;
        } else {
            // Jika soal tidak memiliki gambar, tampilkan jawaban teks biasa
            answersHTML += `
                <button data-answer="${letter}" class="answer-button">
                    <span>${letter}: ${currentQuestion.answers[letter]}</span>
                </button>
            `;
        }
    }

    quizContainer.innerHTML = answersHTML;

    // Tambahkan event listener ke setiap tombol jawaban
    const answerButtons = document.querySelectorAll('#quiz .answer-button');
    answerButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Hapus class 'selected' dari semua tombol
            answerButtons.forEach(btn => btn.classList.remove('selected', 'wrong'));
            // Tambahkan class 'selected' ke tombol yang dipilih
            button.classList.add('selected');
            selectedAnswer = button.getAttribute('data-answer');
            nextButton.disabled = false; // Aktifkan tombol "Lanjut"
        });
    });
}

nextButton.addEventListener('click', function () {
    if (selectedAnswer) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const answerButtons = document.querySelectorAll('#quiz .answer-button');

        // Periksa jawaban
        if (selectedAnswer === currentQuestion.correctAnswer) {
            score += 20; // Tambahkan skor jika jawaban benar
        } else {
            // Tandai jawaban yang salah
            answerButtons.forEach(button => {
                if (button.getAttribute('data-answer') === selectedAnswer) {
                    button.classList.add('wrong');
                }
                if (button.getAttribute('data-answer') === currentQuestion.correctAnswer) {
                    button.classList.add('selected'); // Tandai jawaban yang benar
                }
            });
        }

        // Simpan skor sementara di localStorage
        localStorage.setItem('score', score);
        // Lanjut ke soal berikutnya
        currentQuestionIndex++;
        window.location.href = `quiz.html?question=${currentQuestionIndex + 1}`;
    } else {
        alert("Pilih jawaban terlebih dahulu!");
    }
});

// Muat soal saat halaman dimuat
loadQuestion();
