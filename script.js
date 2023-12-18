function addEntry() {
    const entryText = document.getElementById('entry-text').value;

    if (entryText.trim() === '') {
        alert('Please write a message before adding it to the diary.');
        return;
    }

    const entriesContainer = document.getElementById('entries-container');
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.textContent = entryText;

    entriesContainer.appendChild(entryDiv);

    // Clear the textarea after adding the entry
    document.getElementById('entry-text').value = '';
}
