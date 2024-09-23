const questions = [
    {
        text: "____ skills are you looking for in a candidate?",
        options: ["Who", "When", "What", "How"],
        correct: ["What"]
    },
    {
        text: "____ is your ideal candidate for this position?",
        options: ["What", "Where", "Which", "Who"],
        correct: ["Who"]
    },
    {
        text: "____ can you start working?",
        options: ["Where", "What", "When", "How"],
        correct: ["When"]
    },
    {
        text: "____ did you gain your experience in software development?",
        options: ["Why", "How", "Where", "Which"],
        correct: ["Where", "How"]
    },
    {
        text: "____ programming languages are you most comfortable with?",
        options: ["What", "Which", "Who", "How"],
        correct: ["Which"]
    },
    {
        text: "____ are you interested in this position?",
        options: ["When", "Why", "What", "How"],
        correct: ["Why"]
    },
    {
        text: "____ recommendation helped you get this interview?",
        options: ["What", "How", "Why", "Whose"],
        correct: ["Whose"]
    },
    {
        text: "____ do you stay updated with the latest technology trends?",
        options: ["How", "Where", "Why", "When"],
        correct: ["How"]
    },
    {
        text: "____ often do you participate in coding bootcamps or workshops?",
        options: ["What", "How", "Which", "Why"],
        correct: ["How"]
    },
    {
        text: "____ many years of experience do you have in software development?",
        options: ["What", "When", "Why", "How"],
        correct: ["How"]
    }
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.getElementById('result-container');
const resultsDiv = document.getElementById('results');
const retryButton = document.getElementById('retry-button');

function loadQuiz() {
    let quizHtml = '';
    questions.forEach((q, index) => {
        quizHtml += `
        <div class="question">
            <p>${index + 1}. ${q.text}</p>
            <ul class="options">
                ${q.options.map((option, i) => `
                    <li>
                        <input type="radio" name="q${index}" value="${option}" id="q${index}o${i}">
                        <label for="q${index}o${i}">${option}</label>
                    </li>
                `).join('')}
            </ul>
        </div>
        `;
    });
    quizContainer.innerHTML = quizHtml;
}

function calculateResults() {
    let score = 0;
    let resultsHtml = '';
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const selectedValue = selectedOption ? selectedOption.value : null;
        const correct = q.correct;
        const incorrectOptions = q.options.filter(option => !correct.includes(option));

        if (correct.includes(selectedValue) && !incorrectOptions.includes(selectedValue)) {
            score++;
            resultsHtml += `<p>Pregunta ${index + 1}: Correcta (${correct.join(', ')})</p>`;
        } else {
            resultsHtml += `<p>Pregunta ${index + 1}: Incorrecta. La(s) respuesta(s) correcta(s) es/son ${correct.join(', ')}</p>`;
        }
    });
    resultsHtml += `<p><strong>Puntuación: ${score} / ${questions.length}</strong></p>`;
    resultsDiv.innerHTML = resultsHtml;
}

submitButton.addEventListener('click', () => {
    calculateResults();
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
});

retryButton.addEventListener('click', () => {
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    loadQuiz();
});

loadQuiz();