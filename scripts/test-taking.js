// Lingofy - Test Taking Script

let currentQuestionIndex = 0;
let questions = [];
let answers = {};
let testData = null;

document.addEventListener('DOMContentLoaded', function() {
    // Load test data from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('test');
    
    if (testId) {
        loadTest(testId);
    } else {
        // Demo test data
        loadDemoTest();
    }
});

function loadTest(testId) {
    const forms = JSON.parse(localStorage.getItem('lingofy_forms') || '[]');
    const form = forms.find(f => f.id === testId);
    
    if (!form) {
        showToast('Test not found', 'danger');
        setTimeout(() => {
            window.location.href = 'student-tests.html';
        }, 2000);
        return;
    }
    
    testData = form;
    questions = form.questions || [];
    initializeTest();
}

function loadDemoTest() {
    // Demo test data
    testData = {
        id: 'demo-1',
        title: 'Demo Test',
        questions: [
            {
                id: '1',
                text: 'What is the word for "hello"?',
                type: 'radio',
                required: true,
                options: [
                    { text: 'Bonjour', isCorrect: true },
                    { text: 'Au revoir', isCorrect: false },
                    { text: 'Merci', isCorrect: false }
                ]
            },
            {
                id: '2',
                text: 'Translate "Thank you" to French',
                type: 'text',
                required: true,
                correctAnswer: 'Merci'
            }
        ]
    };
    
    questions = testData.questions;
    initializeTest();
}

function initializeTest() {
    if (questions.length === 0) {
        showToast('No questions available', 'warning');
        return;
    }
    
    updateProgress();
    displayQuestion(0);
}

function displayQuestion(index) {
    if (index < 0 || index >= questions.length) {
        return;
    }
    
    currentQuestionIndex = index;
    const question = questions[index];
    
    // Update question number and text
    document.getElementById('questionNumber').textContent = `Q${index + 1}`;
    document.getElementById('questionText').textContent = question.text;
    
    // Show/hide required badge
    const requiredBadge = document.getElementById('requiredBadge');
    if (question.required) {
        requiredBadge.style.display = 'inline-block';
    } else {
        requiredBadge.style.display = 'none';
    }
    
    // Hide all input containers
    document.getElementById('textInputContainer').classList.add('d-none');
    document.getElementById('radioOptionsContainer').classList.add('d-none');
    document.getElementById('selectContainer').classList.add('d-none');
    
    // Show appropriate input based on question type
    if (question.type === 'text') {
        const textContainer = document.getElementById('textInputContainer');
        const textInput = document.getElementById('textAnswer');
        textContainer.classList.remove('d-none');
        textInput.value = answers[question.id] || '';
    } else if (question.type === 'radio') {
        const radioContainer = document.getElementById('radioOptionsContainer');
        radioContainer.classList.remove('d-none');
        renderRadioOptions(question);
    } else if (question.type === 'select') {
        const selectContainer = document.getElementById('selectContainer');
        const selectInput = document.getElementById('selectAnswer');
        selectContainer.classList.remove('d-none');
        renderSelectOptions(question, selectInput);
        selectInput.value = answers[question.id] || '';
    }
    
    // Update navigation buttons
    updateNavigationButtons();
    updateProgress();
}

function renderRadioOptions(question) {
    const container = document.getElementById('radioOptionsContainer');
    container.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionId = `radio${currentQuestionIndex}_${index}`;
        const optionDiv = document.createElement('div');
        optionDiv.className = 'form-check mb-3';
        optionDiv.innerHTML = `
            <input class="form-check-input" type="radio" name="radioAnswer" id="${optionId}" value="${index}">
            <label class="form-check-label w-100 p-3 border rounded" for="${optionId}">
                ${option.text}
            </label>
        `;
        
        // Set checked if already answered
        const radioInput = optionDiv.querySelector('input[type="radio"]');
        if (answers[question.id] === index.toString()) {
            radioInput.checked = true;
        }
        
        // Add click handler
        radioInput.addEventListener('change', function() {
            answers[question.id] = this.value;
        });
        
        container.appendChild(optionDiv);
    });
}

function renderSelectOptions(question, selectElement) {
    selectElement.innerHTML = '<option value="">Choose an option</option>';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = option.text;
        selectElement.appendChild(optionElement);
    });
    
    selectElement.addEventListener('change', function() {
        answers[question.id] = this.value;
    });
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Next/Submit button
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.classList.add('d-none');
        submitBtn.classList.remove('d-none');
    } else {
        nextBtn.classList.remove('d-none');
        submitBtn.classList.add('d-none');
    }
}

function updateProgress() {
    const current = currentQuestionIndex + 1;
    const total = questions.length;
    const percent = Math.round((current / total) * 100);
    
    document.getElementById('currentQuestion').textContent = current;
    document.getElementById('totalQuestions').textContent = total;
    document.getElementById('progressPercent').textContent = percent;
    document.getElementById('progressBar').style.width = percent + '%';
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        saveCurrentAnswer();
        displayQuestion(currentQuestionIndex - 1);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        saveCurrentAnswer();
        displayQuestion(currentQuestionIndex + 1);
    }
}

function saveCurrentAnswer() {
    const question = questions[currentQuestionIndex];
    
    if (question.type === 'text') {
        const textInput = document.getElementById('textAnswer');
        answers[question.id] = textInput.value.trim();
    } else if (question.type === 'radio') {
        const selectedRadio = document.querySelector('input[name="radioAnswer"]:checked');
        if (selectedRadio) {
            answers[question.id] = selectedRadio.value;
        }
    } else if (question.type === 'select') {
        const selectInput = document.getElementById('selectAnswer');
        answers[question.id] = selectInput.value;
    }
}

function submitTest() {
    saveCurrentAnswer();
    
    // Calculate score
    let correctAnswers = 0;
    let totalQuestions = questions.length;
    
    questions.forEach(question => {
        const userAnswer = answers[question.id];
        
        if (question.type === 'text') {
            if (userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
                correctAnswers++;
            }
        } else if (question.type === 'radio' || question.type === 'select') {
            const selectedOption = question.options[parseInt(userAnswer)];
            if (selectedOption && selectedOption.isCorrect) {
                correctAnswers++;
            }
        }
    });
    
    // Save results
    const result = {
        testId: testData.id,
        testTitle: testData.title,
        score: correctAnswers,
        total: totalQuestions,
        percentage: Math.round((correctAnswers / totalQuestions) * 100),
        answers: answers,
        questions: questions,
        completedAt: new Date().toISOString()
    };
    
    const results = JSON.parse(localStorage.getItem('lingofy_results') || '[]');
    results.push(result);
    localStorage.setItem('lingofy_results', JSON.stringify(results));
    
    // Store current result in session for results page
    sessionStorage.setItem('lingofy_current_result', JSON.stringify(result));
    
    // Redirect to results page
    window.location.href = 'results.html';
}

// Make functions globally available
window.previousQuestion = previousQuestion;
window.nextQuestion = nextQuestion;
window.submitTest = submitTest;

