const choices = document.querySelectorAll('.choice');
const freeResponseInput = document.getElementById('freeResponse');
const freeResponseButton = document.getElementById('submitFreeResponse');

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        choices.forEach(c => c.classList.remove('selected'));
        choice.classList.add('selected');
        const feedback = choice.parentElement.nextElementSibling;
        if (choice.textContent === 'Paris') {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = 'Incorrect';
            feedback.style.color = 'red';
        }
    });
});

freeResponseButton.addEventListener('click', () => {
    const response = freeResponseInput.value.trim().toLowerCase();
    const feedback = freeResponseButton.parentElement.nextElementSibling;
    if (response === 'blue whale') {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        freeResponseInput.style.border = '1px solid green';
    } else {
        feedback.textContent = 'Incorrect';
        feedback.style.color = 'red';
        freeResponseInput.style.border = '1px solid red';
    }
});
