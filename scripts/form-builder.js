// Lingofy - Form Builder Script

let questions = [];
let currentForm = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check admin access
    if (!isAdmin()) {
        window.location.href = 'index.html';
        return;
    }
    
    const questionType = document.getElementById('questionType');
    const mcqOptions = document.getElementById('mcqOptions');
    const saveFormBtn = document.getElementById('saveFormBtn');
    
    // Show/hide MCQ options based on question type
    if (questionType) {
        questionType.addEventListener('change', function() {
            const type = this.value;
            if (type === 'radio' || type === 'select') {
                mcqOptions.classList.remove('d-none');
            } else {
                mcqOptions.classList.add('d-none');
            }
        });
    }
    
    // Save form
    if (saveFormBtn) {
        saveFormBtn.addEventListener('click', function() {
            saveForm();
        });
    }
    
    // Load form if editing (from URL params)
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('id');
    if (formId) {
        loadForm(formId);
    }
});

function addOption() {
    const container = document.getElementById('optionsContainer');
    const optionCount = container.children.length;
    
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-item mb-2 d-flex align-items-center gap-2';
    optionDiv.innerHTML = `
        <input type="text" class="form-control" placeholder="Option text">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="correctOption" value="${optionCount}">
            <label class="form-check-label small">Correct</label>
        </div>
        <button class="btn btn-sm btn-outline-danger" type="button" onclick="removeOption(this)">
            <i class="bi bi-trash"></i>
        </button>
    `;
    
    container.appendChild(optionDiv);
}

function removeOption(btn) {
    btn.closest('.option-item').remove();
    // Update radio values
    const container = document.getElementById('optionsContainer');
    const options = container.querySelectorAll('input[type="radio"]');
    options.forEach((radio, index) => {
        radio.value = index;
    });
}

function addQuestion() {
    const questionText = document.getElementById('questionText').value.trim();
    const questionType = document.getElementById('questionType').value;
    const required = document.getElementById('requiredToggle').checked;
    const language = document.getElementById('formLanguage')?.value;
    
    if (!questionText) {
        showToast('Please enter question text', 'warning');
        return;
    }
    
    if (!language) {
        showToast('Please select a language for the form first', 'warning');
        return;
    }
    
    let question = {
        id: Date.now().toString(),
        text: questionText,
        type: questionType,
        required: required,
        language: language
    };
    
    if (questionType === 'radio' || questionType === 'select') {
        const options = [];
        const optionInputs = document.querySelectorAll('#optionsContainer input[type="text"]');
        const correctOption = document.querySelector('input[name="correctOption"]:checked');
        
        if (optionInputs.length < 2) {
            showToast('Please add at least 2 options', 'warning');
            return;
        }
        
        if (!correctOption) {
            showToast('Please select the correct answer', 'warning');
            return;
        }
        
        optionInputs.forEach((input, index) => {
            options.push({
                text: input.value.trim(),
                isCorrect: index === parseInt(correctOption.value)
            });
        });
        
        question.options = options;
    }
    
    questions.push(question);
    updateQuestionsPreview();
    
    // Clear form
    document.getElementById('questionText').value = '';
    document.getElementById('questionType').value = 'text';
    document.getElementById('requiredToggle').checked = true;
    document.getElementById('mcqOptions').classList.add('d-none');
    document.getElementById('optionsContainer').innerHTML = `
        <div class="option-item mb-2 d-flex align-items-center gap-2">
            <input type="text" class="form-control" placeholder="Option text">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="correctOption" value="0">
                <label class="form-check-label small">Correct</label>
            </div>
            <button class="btn btn-sm btn-outline-danger" type="button" onclick="removeOption(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
    
    showToast('Question added successfully', 'success');
}

function updateQuestionsPreview() {
    const container = document.getElementById('questionsList');
    
    if (questions.length === 0) {
        container.innerHTML = `
            <div class="empty-questions-state text-center py-5">
                <div class="empty-questions-illustration mb-3">
                    <svg width="200" height="150" viewBox="0 0 200 150" class="empty-svg">
                        <circle cx="100" cy="75" r="50" fill="rgba(13, 110, 253, 0.1)" stroke="rgba(13, 110, 253, 0.3)" stroke-width="2" stroke-dasharray="5,5"/>
                        <line x1="80" y1="75" x2="120" y2="75" stroke="rgba(13, 110, 253, 0.5)" stroke-width="2"/>
                        <line x1="100" y1="55" x2="100" y2="95" stroke="rgba(13, 110, 253, 0.5)" stroke-width="2"/>
                        <circle cx="100" cy="75" r="8" fill="rgba(13, 110, 253, 0.3)"/>
                    </svg>
                </div>
                <p class="text-muted mb-2 fw-semibold">No questions added yet</p>
                <p class="text-muted small">Start building your test by adding questions above</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    questions.forEach((q, index) => {
        const langInfo = getLanguageInfo(q.language);
        html += `
            <div class="card mb-3 border">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <span class="badge bg-primary me-2">Q${index + 1}</span>
                            <span class="badge bg-info">
                                <i class="bi bi-translate me-1"></i>${langInfo.name}
                            </span>
                            ${q.required ? '<span class="badge bg-warning ms-2"><i class="bi bi-asterisk me-1"></i>Required</span>' : ''}
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeQuestion('${q.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                    <p class="mb-2 fw-semibold">${q.text}</p>
                    <small class="text-muted">Type: ${q.type}</small>
                    ${q.options ? `<div class="mt-2"><small class="text-muted">Options: ${q.options.length}</small></div>` : ''}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function removeQuestion(questionId) {
    questions = questions.filter(q => q.id !== questionId);
    updateQuestionsPreview();
    showToast('Question removed', 'info');
}

function saveForm() {
    const title = document.getElementById('formTitle').value.trim();
    const description = document.getElementById('formDescription').value.trim();
    const language = document.getElementById('formLanguage')?.value;
    
    if (!title) {
        showToast('Please enter form title', 'warning');
        return;
    }
    
    if (!language) {
        showToast('Please select a language', 'warning');
        return;
    }
    
    if (questions.length === 0) {
        showToast('Please add at least one question', 'warning');
        return;
    }
    
    const forms = JSON.parse(localStorage.getItem('lingofy_forms') || '[]');
    const user = getCurrentUser();
    
    const formData = {
        id: currentForm?.id || Date.now().toString(),
        title: title,
        description: description,
        language: language,
        questions: questions,
        createdBy: user.id,
        createdAt: currentForm?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: currentForm?.status || 'active',
        attempts: currentForm?.attempts || 0
    };
    
    if (currentForm) {
        const index = forms.findIndex(f => f.id === currentForm.id);
        if (index !== -1) {
            forms[index] = formData;
        }
    } else {
        forms.push(formData);
    }
    
    localStorage.setItem('lingofy_forms', JSON.stringify(forms));
    
    showToast('Form saved successfully!', 'success');
    
    setTimeout(() => {
        window.location.href = 'admin-dashboard.html';
    }, 1500);
}

function loadForm(formId) {
    const forms = JSON.parse(localStorage.getItem('lingofy_forms') || '[]');
    const form = forms.find(f => f.id === formId);
    
    if (!form) {
        showToast('Form not found', 'danger');
        return;
    }
    
    currentForm = form;
    document.getElementById('formTitle').value = form.title;
    document.getElementById('formDescription').value = form.description || '';
    document.getElementById('formLanguage').value = form.language;
    questions = form.questions || [];
    
    updateQuestionsPreview();
}

