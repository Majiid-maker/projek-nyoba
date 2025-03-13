const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('nextButton');
const questionTitle = document.getElementById('questionTitle');

const quizQuestions = [
    {
        question: "Manakah foto pacar dari orang di bawah ini?",
        image: "images/202401.jpeg",
        answers: {
            a: { text: "Majiid", image: "images/wolf.jpeg" },
            b: { text: "Jepri", image: "images/jefri.jpg" },
            c: { text: "Angga", image: "images/angga.jpg" },
            d: { text: "Iqbal", image: "images/iqbal.jpg" }
        },
        correctAnswer: "a"
    },
    {
        question: "Seberapa Cantik Dara?",
        answers: {
            a: "cantik",
            b: "cantik bgt",
            c: "cuantiik pol",
            d: "cuaaantiiikk bgttt pol pol"
        },
        correctAnswer: "d"
    },
    {
        question: "Berapa jarak tanggal lahir kita",
        answers: {
            a: "27",
            b: "28",
            c: "29",
            d: "24"
        },
        correctAnswer: "b"
    },
    {
        question: "Siapa 2 teman majiid yang aku ajak waktu kamu hss",
        answers: {
            a: "Jeki dan Satya",
            b: "Satya dan Jojo",
            c: "Ahmad dan Leo",
            d: "Raka dan Jeki"
        },
        correctAnswer: "d"
    },
    {
        question: "Siapa teman kelas majiid yang tidak ikut makan di ws waktu ultah dara yang ke 18",
        answers: {
            a: "Ahmad",
            b: "Catur",
            c: "Jojo",
            d: "Leo"
        },
        correctAnswer: "c"
    },
    {
        question: "Di negara manakah kamu saat usia 19 tahun?",
        answers: {
            a: "Meksiko",
            b: "Arab",
            c: "Indonesia",
            d: "Australia"
        },
        correctAnswer: "b"
    },
    {
        question: "Apa doorprize hss yang bikin peserta undangan pada heboh?",
        answers: {
            a: "Sepeda Listrik",
            b: "Motor",
            c: "Rumah",
            d: "HP"
        },
        correctAnswer: "d"
    },
    {
        question: "Siapakah yang dapet doorprize tersebut?",
        answers: {
            a: "Nasywa",
            b: "Naya",
            c: "Kiky",
            d: "Yiesha"
        },
        correctAnswer: "d"
    },
    {
        question: "Apa lagu yang kamu bawakan saat hss?",
        answers: {
            a: "Kala Cinta Menggoda",
            b: "OK",
            c: "Hampa",
            d: "Kangen"
        },
        correctAnswer: "a"
    },
    {
        question: "Apa hadiah yang aku kasih saat ultah 2020?",
        answers: {
            a: "Kopi",
            b: "Boneka",
            c: "Oreo Mini dan Susu",
            d: "Tas"
        },
        correctAnswer: "c"
    },
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
            score += 10; // Tambahkan skor jika jawaban benar
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
